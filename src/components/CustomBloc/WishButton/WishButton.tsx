import React, { useEffect, useRef, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useFetch } from "../../../api/privateApi";
import { useAuth } from "../../../context/AuthProvider";
import { Game } from "../../../types/Game";

import "./WishButton.css";

interface WishButtonProps {
  game: Game;
}

export const WishButton: React.FC<WishButtonProps> = ({ game }) => {
  const fetchAPI = useFetch();
  const auth = useAuth();
  const { user } = auth;
  const [isFavorite, setIsFavorite] = useState<boolean>(
    game.is_wished || false,
  );
  const isFavoriteRef = useRef(game.is_wished || false);
  const cooldownRef = useRef(false);
  const pendingChange = useRef<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsFavorite(
      user?.game_collections?.find(
        (collection) => collection.game_id === game.id,
      )?.is_wished ?? false,
    );
  }, [user?.game_collections]);

  useEffect(() => {
    isFavoriteRef.current = isFavorite;
  }, [isFavorite]);

  const sendToAPI = async (value: boolean) => {
    console.log("Changement d'état, envoi à l'API");
    await fetchAPI
      .patch(`/games/${game.id}`, { is_wished: value })
      .catch(() => {
        setIsFavorite(!value);
      });
  };

  const handleFavoriteToggle = async () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    isFavoriteRef.current = newState;

    if (!cooldownRef.current) {
      // 🔥 premier clic ou hors cooldown
      sendToAPI(newState);
      cooldownRef.current = true;

      timeoutRef.current = setTimeout(() => {
        cooldownRef.current = false;
        if (pendingChange.current !== null) {
          sendToAPI(pendingChange.current);
        }
        pendingChange.current = null;
      }, 1000);
    } else {
      pendingChange.current = newState;
      console.log("Cooldown actif, changement en attente");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="wish-button-container">
      <button
        className="wish-button"
        onClick={(e) => {
          e.stopPropagation();
          handleFavoriteToggle();
        }}
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </button>
    </div>
  );
};
