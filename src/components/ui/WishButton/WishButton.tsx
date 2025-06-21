import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkRemoveRoundedIcon from "@mui/icons-material/BookmarkRemoveRounded";

import { useFetch } from "../../../api/privateApi.ts";
import { useAuth } from "../../../context/AuthProvider.tsx";
import { useWindowSize } from "../../../hooks/useWindowSize.ts";
import { GameBaseType, GameDlcType } from "../../../types/Game.ts";
import { TLabel } from "../TranslationLabel/TLabel.tsx";

import "./WishButton.css";

interface WishButtonProps {
  game: GameBaseType | GameDlcType;
  isAuthenticated: boolean;
  large?: boolean;
  homeP?: boolean;
}

export const WishButton: React.FC<WishButtonProps> = ({
  game,
  isAuthenticated,
  large = false,
  homeP = false,
}) => {
  const fetchAPI = useFetch();
  const auth = useAuth();
  const { user } = auth;
  const [isFavorite, setIsFavorite] = useState<boolean>(!!game?.is_wished);
  const isFavoriteRef = useRef(!!game?.is_wished || false);
  const cooldownRef = useRef(false);
  const pendingChange = useRef<boolean | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isMobileS, isMobileM } = useWindowSize();

  useEffect(() => {
    setIsFavorite(
      user?.game_collections?.find(
        (collection) => collection.game_id === game?.id,
      )?.is_wished ?? false,
    );
  }, [user?.game_collections]);

  useEffect(() => {
    isFavoriteRef.current = isFavorite;
  }, [isFavorite]);

  const sendToAPI = async (value: boolean) => {
    await fetchAPI
      .patch(`/games/${game.id}`, { is_wished: value })
      .catch(() => {
        setIsFavorite(!value);
      });
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error(
        "Vous devez être connecté pour ajouter un jeu à votre liste de souhaits.",
      );
      return;
    }

    const newState = !isFavorite;
    setIsFavorite(newState);
    isFavoriteRef.current = newState;

    if (!cooldownRef.current) {
      // 🔥first click or out of cooldown
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
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (large && homeP) {
    return (
      <div className="wish-button-container large">
        <button
          className="wish-button"
          aria-label={
            isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
          }
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteToggle();
          }}
        >
          {isFavorite ? (
            <BookmarkRemoveRoundedIcon />
          ) : isMobileS || isMobileM ? (
            <BookmarkAddRoundedIcon />
          ) : (
            <TLabel label="add_to_favorite" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="wish-button-container">
      <button
        className={`wish-button ${!isAuthenticated ? "disabled" : ""}`}
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        onClick={(e) => {
          e.stopPropagation();
          handleFavoriteToggle();
        }}
      >
        {isFavorite ? (
          <BookmarkRemoveRoundedIcon />
        ) : (
          <BookmarkAddRoundedIcon />
        )}
      </button>
    </div>
  );
};
