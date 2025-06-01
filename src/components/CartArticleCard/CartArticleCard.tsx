import React from "react";
import { DeleteForeverRounded } from "@mui/icons-material";

import { useCart } from "../../context/CartContext.tsx";
import { Game, GameImage } from "../../types/Game.ts";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter.ts";
import { getGameImage } from "../../utils/gameUtils.ts";
import { PriceBox } from "../GameCard/PriceBox/PriceBox";
import { WishButton } from "../ui/WishButton/WishButton.tsx";

import "./CartArticleCard.css";

interface CartArticleCardProps {
  title: string;
  price: number;
  imageUrl?: GameImage[];
  onRemove: () => void;
  isDlc?: boolean;
  isTotal?: boolean;
  game?: Game;
}

export const CartArticleCard: React.FC<CartArticleCardProps> = ({
  title,
  price,
  imageUrl,
  onRemove,
  isDlc = false,
  isTotal = false,
  game,
}) => {
  const gameForWishlist =
    game ||
    ({
      id: 0,
      name: title,
      price: price,
      images: imageUrl || [],
      is_wished: false,
    } as Game);

  const showWishButton = !isTotal && game !== undefined;
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item === game?.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart(game?.id ?? gameForWishlist.id);
    }
  };

  return (
    <div className={`cart-article-card ${isDlc ? "little" : ""}`}>
      <div className={`cart-article-card__content ${isDlc ? "little" : ""}`}>
        {!isTotal && (
          <div className={`cart-article-card__image ${isDlc ? "little" : ""}`}>
            <img
              src={
                getGameImage(imageUrl).file_url ??
                "https://via.placeholder.com/150"
              }
              alt={title}
            />
          </div>
        )}
        <div className={`cart-article-card__details ${isDlc ? "little" : ""}`}>
          <div className="cart-article-card__title">
            <h3>{capitalizeFirstLetter(title)}</h3>
            {showWishButton && (
              <WishButton game={gameForWishlist} isAuthenticated={true} />
            )}
          </div>
          <PriceBox
            price={price}
            buyButton={isDlc ?? false}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      {!isDlc && (
        <div className="cart-article-card__actions">
          <DeleteForeverRounded
            color="error"
            onClick={onRemove}
            role="button"
            tabIndex={0}
            aria-label={`Supprimer ${title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onRemove();
            }}
          />
        </div>
      )}
    </div>
  );
};
