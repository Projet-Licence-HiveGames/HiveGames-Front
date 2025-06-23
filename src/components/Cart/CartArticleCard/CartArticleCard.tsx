import { FC } from "react";
import { DeleteForeverRounded } from "@mui/icons-material";

import { GameBaseType, GameDlcType, GameImage } from "@customTypes/Game.ts";
import { useWindowSize } from "@hooks/useWindowSize.ts";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter.ts";
import { getGameImage } from "@utils/gameUtils.ts";

import { WishButton } from "@components/ui/WishButton/WishButton.tsx";

import { PriceBox } from "../../GameCard/PriceBox/PriceBox.tsx";

import "./CartArticleCard.css";

interface CartArticleCardProps {
  imageUrl?: GameImage[];
  onRemove: () => void;
  game: GameBaseType | GameDlcType;
}

export const CartArticleCard: FC<CartArticleCardProps> = ({
  imageUrl,
  onRemove,
  game,
}) => {
  const { isMobileM, isMobileS } = useWindowSize();

  return (
    <div className={`cart-article-card`}>
      <div className={`cart-article-card__content`}>
        {!isMobileM && !isMobileS && (
          <div className={`cart-article-card__image`}>
            <img alt={game.name} src={getGameImage(imageUrl).file_url} />
          </div>
        )}
        <div className={`cart-article-card__details`}>
          <div className="cart-article-card__title">
            <h3>{capitalizeFirstLetter(game.name)}</h3>
            <div className={"cart-article-card__wish-button"}>
              <WishButton game={game} />
            </div>
          </div>
          <div className="cart-article-card__price">
            <PriceBox buyButton={false} game={game} />
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
          </div>
        </div>
      </div>
    </div>
  );
};
