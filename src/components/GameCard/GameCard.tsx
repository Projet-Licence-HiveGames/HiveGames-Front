import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { GameBaseType } from "@customTypes/Game";
import { useCart } from "@context/CartContext";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import { getGameImage } from "@utils/gameUtils";
import { Category } from "../ui/CategoryBloc/Category";
import ImageWithLoader from "../ui/Image/ImageWithLoader";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { TLabel } from "../ui/TranslationLabel/TLabel.tsx";
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
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item === game.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart(game.id);
    } else {
      toast.error(<TLabel label={"already_in_cart"} />);
    }
  };

  return (
    <div className={"game-card"} onClick={() => navigate(`/game/${game.id}`)}>
      <div className={"game-card-image"}>
        <ImageWithLoader
          alt={game.name}
          loaderSrc={defaultGameThumbnailImage}
          src={getGameImage(game.images).file_url || defaultGameThumbnailImage}
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
          <PriceBox
            isOwned={game.is_owned}
            game={game}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
