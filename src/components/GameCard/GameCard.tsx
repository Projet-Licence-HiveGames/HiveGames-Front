import React from "react";
import { useNavigate } from "react-router-dom";

import { Game } from "../../types/Game";
import { getGameThumbnail } from "../../utils/gameUtils";
import { Category } from "../CustomBloc/CategoryBloc/Category";
import { PromoBloc } from "../CustomBloc/PromoBloc/PromoBloc";
import { WishButton } from "../CustomBloc/WishButton/WishButton";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { calculateDiscount } from "../../utils/calculateDiscount";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

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
        <img src={getGameThumbnail(game).file_url} alt={game.name} />
        <div className={"game-card-content-progress-bar"}>
          <ProgressBar leftPercentValue={50} />
        </div>
      </div>
      <div className={"game-card-content"}>
        {isAuthenticated && <WishButton game={game} />}
        <div className={"game-card-content-title"}>
          <h3>{capitalizeFirstLetter(game.name)}</h3>
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
