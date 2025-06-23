import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { GameType } from "@customTypes/Game";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import { getGameImage } from "@utils/gameUtils";

import { Category } from "../ui/CategoryBloc/Category";
import ImageWithLoader from "../ui/Image/ImageWithLoader";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { WishButton } from "../ui/WishButton/WishButton";

import { PriceBox } from "./PriceBox/PriceBox";

import defaultGameThumbnailImage from "@assets/images/defaultGameThumbnail.png";

import "./GameCard.css";

interface GameCardProps {
  className?: string;
  game: GameType;
}

const GameCard: React.FC<GameCardProps> = ({ className, game }) => {
  return (
    <Link
      to={`/game/${game.id}`}
      className={classNames("game-card", className)}
    >
      <div className={"game-card-image"}>
        <ImageWithLoader
          alt={game.name}
          loaderSrc={defaultGameThumbnailImage}
          src={getGameImage(game.images).file_url || defaultGameThumbnailImage}
        />
        <div className={"game-card-content-progress-bar"}>
          <ProgressBar leftPercentValue={50} />
        </div>
      </div>
      <div className={"game-card-content"}>
        <WishButton game={game} />
        <div className={"game-card-content-title"}>
          <h3>{capitalizeFirstLetter(game.name)}</h3>
        </div>
        {game.categories && (
          <div className={"game-card-content-category"}>
            <Category categories={game.categories} />
          </div>
        )}
        <div className={"game-card-content-price"}>
          <PriceBox isOwned={game.is_owned} game={game} />
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
