import React from "react";
import { DeleteForeverRounded } from "@mui/icons-material";

import { useWindowSize } from "@hooks/useWindowSize.ts";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter.ts";
import { getGameImage } from "@utils/gameUtils.ts";

import { WishButton } from "@components/ui/WishButton/WishButton.tsx";

import { PriceBox } from "../../GameCard/PriceBox/PriceBox.tsx";

import "./CartArticleCard.css";

import { GameBaseType, GameDlcType, GameImage } from "@/types/Game.ts";

interface CartArticleCardProps {
  imageUrl?: GameImage[];
  onRemove: () => void;
  isDlc?: boolean;
  game: GameBaseType | GameDlcType;
}

export const CartArticleCard: React.FC<CartArticleCardProps> = ({
  imageUrl,
  onRemove,
  isDlc = false,
  game,
}) => {
  const { isMobileM, isMobileS } = useWindowSize();

  return (
    <div className={`cart-article-card ${isDlc ? "little" : ""}`}>
      <div className={`cart-article-card__content ${isDlc ? "little" : ""}`}>
        {((!isMobileM && !isMobileS) || isDlc) && (
          <div className={`cart-article-card__image ${isDlc ? "little" : ""}`}>
            <img
              alt={game.name}
              src={
                getGameImage(imageUrl).file_url ??
                "https://via.placeholder.com/150"
              }
            />
          </div>
        )}
        <div className={`cart-article-card__details ${isDlc ? "little" : ""}`}>
          <div className="cart-article-card__title">
            <h3>{capitalizeFirstLetter(game.name)}</h3>
            <div className={"cart-article-card__wish-button"}>
              <WishButton game={game} />
            </div>
          </div>
          <div className="cart-article-card__price">
            <PriceBox buyButton={false} game={game} />
            {!isDlc && (
              <div className="cart-article-card__actions">
                <DeleteForeverRounded
                  aria-label={`Supprimer ${game.name}`}
                  color="error"
                  onClick={onRemove}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onRemove();
                  }}
                  role="button"
                  tabIndex={0}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
