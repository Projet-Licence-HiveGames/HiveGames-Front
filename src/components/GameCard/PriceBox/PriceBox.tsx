import React from "react";
import classNames from "classnames";

import { Game, GameDlc } from "@customTypes/Game.ts";
import { calculateDiscount } from "@utils/calculateDiscount.ts";

import { PlayButton } from "@components/ui/Buttons/PlayButton/PlayButton.tsx";

import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";
import CartButton from "../CartButton/CartButton.tsx";

import "./PriceBox.css";

interface PriceBoxProps {
  game: Game | GameDlc;
  isOwned?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
  buyButton?: boolean;
}

export const PriceBox: React.FC<PriceBoxProps> = ({
  isOwned,
  game,
  onAddToCart,
  buyButton = true,
}) => {
  const discountedPrice = calculateDiscount(
    game.price,
    game.promotion?.promotion_rate || 0,
  );

  return (
    <div className="price-box">
      <div
        className={classNames("price-box-container", {
          "on-promotion": !!game.promotion && discountedPrice > 0,
        })}
      >
        {game.promotion && game.price > 0 && (
          <div className={"price-box-discount-rate"}>
            <h3>{game.promotion?.promotion_rate}%</h3>
          </div>
        )}

        <div className="price-box-prices">
          {game.promotion && game.price > 0 && (
            <span className={"price-box-old-price"}>{game.price} €</span>
          )}
          {discountedPrice <= 0 ? (
            <TLabel label={"free"} className="current-price" />
          ) : (
            <span className="current-price">
              {discountedPrice.toFixed(2)} €
            </span>
          )}
        </div>
      </div>
      {buyButton && !isOwned ? (
        <CartButton onClick={onAddToCart} isOwned={isOwned} />
      ) : isOwned ? (
        <PlayButton id={game.id} name={game.name} />
      ) : null}
    </div>
  );
};
