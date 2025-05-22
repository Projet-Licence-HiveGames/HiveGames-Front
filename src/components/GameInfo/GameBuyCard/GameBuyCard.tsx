import React from "react";
import classNames from "classnames";

import { Promotion } from "../../../types/Game.ts";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import PriceBox from "../../GameCard/PriceBox/PriceBox.tsx";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./GameBuyCard.css";

interface GameBuyCardProps {
  name: string;
  price: number;
  promotion?: Promotion | null;
  isOwned?: boolean;
  isDlc?: boolean;
  gameBaseName?: string;
}

export const GameBuyCard: React.FC<GameBuyCardProps> = ({
  name,
  price,
  promotion = null,
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
        {!!promotion && (
          <div className="game-buy-card__description">
            <TLabel label="weekend_deal" />
          </div>
        )}
      </div>
      <div className="game-buy-card-content__price">
        <PriceBox price={price} promotion={promotion} isOwned={isOwned} />
      </div>
    </div>
  );
};
