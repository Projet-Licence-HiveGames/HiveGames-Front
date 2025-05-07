import React from "react";

import "./PriceTag.css";

interface PriceTagProps {
  price: number;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price }) => {
  return (
    <div className="price-tag">
      <span className="price-tag__original-price">{price} €</span>
    </div>
  );
};
