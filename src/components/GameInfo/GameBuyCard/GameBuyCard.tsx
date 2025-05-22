import React from "react";

import { calculateDiscount } from "../../../utils/calculateDiscount";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { PromoBloc } from "../../GameCard/PromoBloc/PromoBloc";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameBuyCard.css";

interface GameBuyCardProps {
  name: string;
  oldPrice?: number;
  price: number;
  isOwned?: boolean;
  isDlc?: boolean;
  gameBase?: string;
}

export const GameBuyCard: React.FC<GameBuyCardProps> = ({
  name,
  oldPrice = 0,
  price,
  isOwned = false,
  isDlc = false,
  gameBase,
}) => {
  return (
    <div className={`game-buy-card-container ${isDlc ? "dlc" : ""}`}>
      {isDlc && gameBase && (
        <span className="game-buy-card-container__banner-text">
          ⚠️
          <TLabel
            label={"dlc.requirements"}
            baliseType="span"
            translationType="app"
            params={{ value: gameBase }}
          />
        </span>
      )}
      <div className="game-buy-card-content">
        <div className="game-buy-card__title">
          <h3>{capitalizeFirstLetter(name)}</h3>
        </div>
        {oldPrice > 0 && (
          <div className="game-buy-card__description">
            <TLabel label="weekend_deal" />
          </div>
        )}
      </div>
      <div className="game-buy-card-content__price">
        <PromoBloc
          discount={calculateDiscount(oldPrice || 0, price)}
          originalPrice={oldPrice || 0}
          discountedPrice={price}
          isOwned={isOwned}
        />
      </div>
    </div>
  );
};
