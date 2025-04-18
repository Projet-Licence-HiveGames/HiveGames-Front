import React, { useEffect, useRef, useState } from "react";

import { privateApi } from "../../api/privateApi";
import { useAuth } from "../../context/AuthProvider";
import { Game } from "../../types/Game";
import Category from "../CustomBloc/CategoryBloc/Category";
import { HeartButton } from "../CustomBloc/HeartButton/HeartButton";
import PromoBloc from "../CustomBloc/PromoBloc/PromoBloc";
import ProgressBar from "../ui/ProgressBar/ProgressBar";

import image from "@assets/images/image_49.png";

import "./GameCard.css";

interface GameCardProps {
  game: Game;
  isAuthenticated: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isAuthenticated }) => {
  const auth = useAuth();
  const { user } = auth;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const isFavoriteRef = useRef(isFavorite);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (
      isAuthenticated &&
      user?.game_collections?.find(
        (collection) => collection.game_id === game.id,
      )
    ) {
      setIsFavorite(
        user?.game_collections?.find(
          (collection) => collection.game_id === game.id,
        )?.is_wished || false,
      );
    }
  }, [user, game.id]);

  useEffect(() => {
    isFavoriteRef.current = isFavorite;
  }, [isFavorite]);

  const handleFavoriteToggle = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsFavorite((prev) => !prev);
    timeoutRef.current = setTimeout(async () => {
      const response: { ok: boolean } = await privateApi(
        `/games/${game.id}`,
        "PATCH",
        { is_wished: isFavoriteRef.current },
      );
      if (!response.ok) {
        setIsFavorite(isFavoriteRef.current);
      }
    }, 5000);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const calculateDiscount = (
    originalPrice: number,
    discountedPrice: number,
  ) => {
    return Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100,
    );
  };

  return (
    <div className={"game-card"}>
      <div className={"game-card-image"}>
        <img
          src={
            game.images?.find((i) => i.file_name.startsWith("thumbnail"))
              ?.file_url ?? image
          }
          alt={game.name}
        />
        <div className={"game-card-content-progress-bar"}>
          <ProgressBar leftPercentValue={50} />
        </div>
      </div>
      <div className={"game-card-content"}>
        {isAuthenticated && (
          <HeartButton isFavorite={isFavorite} onClick={handleFavoriteToggle} />
        )}
        <div className={"game-card-content-title"}>
          <a href={`/game/${game.id}`}>
            <h3>{capitalizeFirstLetter(game.name)}</h3>
          </a>
        </div>
        <div className={"game-card-content-category"}>
          <Category
            category={game.categories?.map((category) => category.label) || []}
          />
        </div>
        <div className={"game-card-content-price"}>
          <PromoBloc
            discount={calculateDiscount(game.oldPrice || 0, game.price)}
            originalPrice={game.oldPrice || 0}
            discountedPrice={game.price}
          />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
