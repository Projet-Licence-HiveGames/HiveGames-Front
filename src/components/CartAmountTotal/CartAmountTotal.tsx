import React from "react";
import { Link } from "react-router-dom";
import { DeleteForeverRounded } from "@mui/icons-material";

import { calculateDiscount } from "@utils/calculateDiscount.ts";

import TLabel from "@components/ui/TranslationLabel/TLabel.tsx";

import "./CartAmountTotal.css";

import { Game } from "@/types/Game.ts";

interface CartAmountTotalProps {
  games: Game[];
  onRemove: () => void;
}

export const CartAmountTotal: React.FC<CartAmountTotalProps> = ({
  games,
  onRemove,
}) => {
  const totals = games.reduce(
    (acc, game) => {
      acc.total += game.price;
      acc.finalPrice += game.promotion
        ? calculateDiscount(game.price, game.promotion.promotion_rate)
        : game.price;
      acc.discount = acc.total - acc.finalPrice;
      return acc;
    },
    { total: 0, discount: 0, finalPrice: 0 },
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-FR", {
      style: "currency",
      currency: "eur",
    });
  };

  return (
    <div className="cart-amount-total">
      <div className="cart-amount-total__summary">
        <TLabel
          baliseType={"h2"}
          className={"cart-amount-total__title"}
          label={"cart.total_price"}
        />
        <div className="cart-amount-total__price-container">
          <div className="cart-amount-total__prices">
            {totals.discount > 0 && (
              <span className="cart-amount-total__old-price">
                {formatPrice(totals.total)}
              </span>
            )}
            <span
              className={`cart-amount-total__current-price ${totals.discount > 0 ? "on-promotion" : ""}`}
            >
              {formatPrice(totals.finalPrice)}
            </span>

            {totals.discount > 0 && (
              <TLabel
                className="cart-amount-total__discount"
                label={"cart.savings"}
                replaceValues={{ savings: formatPrice(totals.discount) }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cart-amount-total__buttons">
        <button className="cart-amount-total__link" onClick={onRemove}>
          <TLabel
            baliseType="span"
            className="cart-amount-total__button delete"
            label="cart.delete"
          />
        </button>
        <Link to="/catalog" className="cart-amount-total__link">
          <TLabel
            baliseType="button"
            className="cart-amount-total__button"
            label="cart.continue_shopping"
          />
        </Link>
        <Link to="/cart/checkout" className="cart-amount-total__link">
          <TLabel
            baliseType="button"
            className="cart-amount-total__button purchase"
            label="purchase"
          />
        </Link>
      </div>
    </div>
  );
};
