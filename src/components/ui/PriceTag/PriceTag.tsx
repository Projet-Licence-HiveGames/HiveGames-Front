import React from "react";

import { TLabel } from "../TranslationLabel/TLabel.tsx";

import "./PriceTag.css";

interface PriceTagProps {
  price: number;
}

export const PriceTag: React.FC<PriceTagProps> = ({ price }) => {
  return (
    <div className="price-tag">
      <span className="price-tag__original-price">
        {price != 0 ? `${price.toFixed(2)} €` : <TLabel label={"free"} />}
      </span>
    </div>
  );
};
