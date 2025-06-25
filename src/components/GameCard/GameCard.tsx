import React from "react";
import { useNavigate } from "react-router-dom";

import { GameBaseType } from "../../types/Game";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { getGameImage } from "../../utils/gameUtils";
import { Category } from "../ui/CategoryBloc/Category";
import ImageWithLoader from "../ui/Image/ImageWithLoader";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { WishButton } from "../ui/WishButton/WishButton";

import { PriceBox } from "./PriceBox/PriceBox";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

import "./GameCard.css";

interface GameCardProps {
  game: GameBaseType;
  isAuthenticated: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div className={"game-card"} onClick={() => navigate(`/game/${game.id}`)}>
      <div className={"game-card-image"}>
        <ImageWithLoader
          src={getGameImage(game.images).file_url || defaultGameThumbnailImage}
          alt={game.name}
          loaderSrc={defaultGameThumbnailImage}
        />
        {game.votes &&
          !(game.votes?.likes == 0 && game.votes?.dislikes == 0) && (
            <div className={"game-card-content-progress-bar"}>
              <ProgressBar
                leftPercentValue={
                  (game.votes.likes * 100) /
                  (game.votes.dislikes + game.votes.likes)
                }
              />
            </div>
          )}
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
          <PriceBox price={game.price} promotion={game.promotion} />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
