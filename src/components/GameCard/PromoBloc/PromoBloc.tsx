import React from "react";

import CartButton from "../CartButton/CartButton.tsx";
import PriceBox from "../PriceBox/PriceBox.tsx";

import "./PromoBloc.css";

interface PromoBlocProps {
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  onAddToCart?: () => void;
}

export const PromoBloc: React.FC<PromoBlocProps> = ({
  discount,
  originalPrice,
  discountedPrice,
  onAddToCart,
}) => {
  return (
    <div className="promotion-card">
      <div className="promo-header">
        <div className="promo-price">
          {(originalPrice || originalPrice !== 0) && (
            <div className={"promo-show-box"}>
              <h3>{discount}%</h3>
            </div>
          )}
          <PriceBox oldPrice={originalPrice} price={discountedPrice} />
          <CartButton onClick={onAddToCart} />
        </div>
      </div>
    </div>
  );
};
