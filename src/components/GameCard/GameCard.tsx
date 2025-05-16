import React from "react";
import { useNavigate } from "react-router-dom";

import { Game } from "../../types/Game";
import { calculateDiscount } from "../../utils/calculateDiscount";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { getGameThumbnail } from "../../utils/gameUtils";
import { Category } from "../ui/CategoryBloc/Category";
import ImageWithLoader from "../ui/Image/ImageWithLoader";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { WishButton } from "../ui/WishButton/WishButton";

import { PromoBloc } from "./PromoBloc/PromoBloc";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

import "./GameCard.css";

interface GameCardProps {
  game: Game;
  isAuthenticated: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div className={"game-card"} onClick={() => navigate(`/game/${game.id}`)}>
      <div className={"game-card-image"}>
        <ImageWithLoader
          src={getGameThumbnail(game).file_url || defaultGameThumbnailImage}
          alt={game.name}
          loaderSrc={defaultGameThumbnailImage}
        />
        <div className={"game-card-content-progress-bar"}>
          <ProgressBar leftPercentValue={50} />
        </div>
      </div>
      <div className={"game-card-content"}>
        <WishButton game={game} isAuthenticated={isAuthenticated} />
        <div className={"game-card-content-title"}>
          <h3>{capitalizeFirstLetter(game.name)}</h3>
        </div>
        {game.categories && (
          <div className={"game-card-content-category"}>
            <Category categories={game.categories} />
          </div>
        )}
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
