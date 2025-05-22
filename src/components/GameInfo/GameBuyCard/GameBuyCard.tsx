import React from "react";
import classNames from "classnames";

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
  gameBaseName?: string;
}

export const GameBuyCard: React.FC<GameBuyCardProps> = ({
  name,
  oldPrice = 0,
  price,
  isOwned = false,
  isDlc = false,
  gameBaseName,
}) => {
  return (
    <div className={classNames("game-buy-card-container", { dlc: isDlc })}>
      {isDlc && gameBaseName && (
        <span className="game-buy-card-container__banner-text">
          ⚠️
          <TLabel
            label={"dlc.requirements.base_game"}
            baliseType="span"
            translationType="app"
            replaceValues={{ game_name: gameBaseName }}
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
