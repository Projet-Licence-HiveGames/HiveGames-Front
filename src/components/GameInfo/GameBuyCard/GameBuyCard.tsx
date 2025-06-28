import React from "react";
import { toast } from "react-toastify";
import classNames from "classnames";

import { useCart } from "@contexts/CartContext.tsx";
import { GameBaseType, GameDlcType } from "@customTypes/Game.ts";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter.ts";

import { PriceBox } from "../../GameCard/PriceBox/PriceBox.tsx";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameBuyCard.css";

interface GameBuyCardProps {
  game: GameBaseType | GameDlcType;
  name: string;
  isOwned?: boolean;
  isDlc?: boolean;
  gameBaseName?: string;
}

export const GameBuyCard: React.FC<GameBuyCardProps> = ({
  game,
  name,
  isOwned = false,
  isDlc = false,
  gameBaseName,
}) => {
  const { addToCart, cartItems } = useCart();
  const isInCart =
    isDlc && game ? cartItems.some((item) => item === game.id) : false;
  const toastId = "cart-error";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart && isDlc && game) {
      addToCart(game.id);
    } else {
      toast.dismiss(toastId);
      toast.error(<TLabel label={"cart.already_in_cart"} />, {
        toastId,
      });
    }
  };

  return (
    <div className={classNames("game-buy-card-container", { dlc: isDlc })}>
      {isDlc && gameBaseName && (
        <span className="game-buy-card-container__banner-text">
          ⚠️
          <TLabel
            baliseType="span"
            label={"dlc.requirements.base_game"}
            replaceValues={{ game_name: gameBaseName }}
          />
        </span>
      )}
      <div className="game-buy-card-content">
        <div className="game-buy-card__title">
          <h3>{capitalizeFirstLetter(name)}</h3>
        </div>
        {!!game.promotion && (
          <div className="game-buy-card__description">
            <TLabel label="weekend_deal" />
          </div>
        )}
      </div>
      <div className="game-buy-card-content__price">
        <PriceBox game={game} isOwned={isOwned} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};
