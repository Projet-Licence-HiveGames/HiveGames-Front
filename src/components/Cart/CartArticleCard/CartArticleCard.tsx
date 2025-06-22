import React from "react";
import { DeleteForeverRounded } from "@mui/icons-material";

import { useCart } from "@context/CartContext.tsx";
import { useWindowSize } from "@hooks/useWindowSize.ts";
import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter.ts";
import { getGameImage } from "@utils/gameUtils.ts";

import { WishButton } from "@components/ui/WishButton/WishButton.tsx";

import { PriceBox } from "../../GameCard/PriceBox/PriceBox.tsx";

import "./CartArticleCard.css";

import { GameBaseType, GameDlcType, GameImage } from "@/types/Game.ts";

interface CartArticleCardProps {
  imageUrl?: GameImage[];
  buyButton?: boolean;
  onRemove: () => void;
  isDlc?: boolean;
  isItemCart?: boolean;
  game: GameBaseType | GameDlcType;
}

export const CartArticleCard: React.FC<CartArticleCardProps> = ({
  imageUrl,
  buyButton = true,
  onRemove,
  isDlc = false,
  isItemCart = false,
  game,
}) => {
  const showWishButton = !isItemCart && game !== undefined;
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item === game?.id);
  const { isMobileM } = useWindowSize();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart(game.id);
    }
  };

  return (
    <div className={`cart-article-card ${isDlc ? "little" : ""}`}>
      <div className={`cart-article-card__content ${isDlc ? "little" : ""}`}>
        {((!isItemCart && !isMobileM) || isDlc) && (
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
            {!showWishButton && (
              <div className={"cart-article-card__wish-button"}>
                <WishButton game={game} isAuthenticated={true} />
              </div>
            )}
          </div>
          <PriceBox
            buyButton={buyButton}
            onAddToCart={handleAddToCart}
            game={game}
          />
        </div>
      </div>
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
  );
};
