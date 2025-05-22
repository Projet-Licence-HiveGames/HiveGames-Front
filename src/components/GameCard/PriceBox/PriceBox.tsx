import React from "react";
import classNames from "classnames";

import { Promotion } from "../../../types/Game.ts";
import { calculateDiscount } from "../../../utils/calculateDiscount.ts";
import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";
import CartButton from "../CartButton/CartButton.tsx";

import "./PriceBox.css";

interface PriceBoxProps {
  price: number;
  promotion?: Promotion | null;
  isOwned?: boolean;
  onAddToCart?: () => void;
}

const PriceBox: React.FC<PriceBoxProps> = ({
  price,
  promotion,
  isOwned,
  onAddToCart,
}) => {
  const discountedPrice = calculateDiscount(
    price,
    promotion?.promotion_rate || 0,
  );
  return (
    <div className="price-box">
      <div
        className={classNames("price-box-container", {
          "on-promotion": !!promotion && discountedPrice > 0,
        })}
      >
        {promotion && price > 0 && (
          <div className={"price-box-discount-rate"}>
            <h3>{promotion?.promotion_rate}%</h3>
          </div>
        )}

        <div className="price-box-prices">
          {promotion && price > 0 && (
            <span className={"price-box-old-price"}>{price} €</span>
          )}
          {discountedPrice <= 0 ? (
            <TLabel
              label={"free"}
              baliseType={"span"}
              translationType={"app"}
              className="current-price"
            />
          ) : (
            <span className="current-price">{discountedPrice} €</span>
          )}
        </div>
      </div>
      <CartButton onClick={onAddToCart} isOwned={isOwned} />
    </div>
  );
};

export default PriceBox;
