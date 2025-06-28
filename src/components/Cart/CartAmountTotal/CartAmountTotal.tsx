import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "@contexts/CartContext";
import { GameBaseType } from "@customTypes/Game";
import { calculateDiscount } from "@utils/calculateDiscount";

import { TLabel } from "@components/ui/TranslationLabel/TLabel";

import "./CartAmountTotal.css";

interface CartAmountTotalProps {
  games: GameBaseType[];
}

export const CartAmountTotal: React.FC<CartAmountTotalProps> = ({ games }) => {
  const { clearCart } = useCart();
  const totals = games.reduce(
    (acc, game) => {
      acc.total += game.price;
      acc.finalPrice += game.promotion
        ? calculateDiscount(game.price, game.promotion.promotion_rate)
        : game.price;
      return acc;
    },
    { total: 0, finalPrice: 0 },
  );
  const discount = totals.total - totals.finalPrice;
  const formatPrice = (price: number) => {
    return price.toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
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
            {discount > 0 && (
              <span className="cart-amount-total__old-price">
                {formatPrice(totals.total)}
              </span>
            )}
            <span
              className={`cart-amount-total__current-price ${discount > 0 ? "on-promotion" : ""}`}
            >
              {formatPrice(totals.finalPrice)}
            </span>

            {discount > 0 && (
              <TLabel
                className="cart-amount-total__discount"
                label={"cart.savings"}
                replaceValues={{ savings: formatPrice(discount) }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cart-amount-total__buttons">
        <button className="cart-amount-total__link" onClick={clearCart}>
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
