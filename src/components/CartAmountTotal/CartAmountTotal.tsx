import React from "react";
import { Link } from "react-router-dom";

import { calculateDiscount } from "@utils/calculateDiscount.ts";

import TLabel from "@components/ui/TranslationLabel/TLabel.tsx";

import "./CartAmountTotal.css";

import { Game } from "@/types/Game.ts";

interface CartAmountTotalProps {
  games: Game[];
}

export const CartAmountTotal: React.FC<CartAmountTotalProps> = ({ games }) => {
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

  const formattedPrice = totals.finalPrice.toLocaleString("fr-FR", {
    style: "currency",
    currency: "eur",
  });

  return (
    <div className="cart-amount-total">
      <div className="cart-amount-total-row">
        <h2 className="cart-amount-total__title">Montant total</h2>
        <p className="cart-amount-total__price">{formattedPrice}</p>
      </div>
      <div className="cart-amount-total__buttons">
        <Link to="/catalog" className="cart-amount-total__link">
          <TLabel
            baliseType="button"
            className="cart-amount-total__button"
            label="continue_shopping"
          />
        </Link>

        <Link to="/cart/checkout" className="cart-amount-total__link">
          <TLabel
            baliseType="button"
            className="cart-amount-total__button cart-amount-total__button--purchase"
            label="purchase"
          />
        </Link>
      </div>
    </div>
  );
};
