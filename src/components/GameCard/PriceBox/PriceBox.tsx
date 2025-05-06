import React from "react";

import "./PriceBox.css";

interface PriceBoxProps {
  price: number;
  oldPrice?: number;
}

const PriceBox: React.FC<PriceBoxProps> = ({ price, oldPrice }) => {
  return (
    <div className={"price-box"}>
      {(oldPrice || oldPrice !== 0) && (
        <div className={"price-box-old-price"}>
          <h3>{`${oldPrice}€`}</h3>
        </div>
      )}
      <div
        className={`price-box-price ${oldPrice && oldPrice !== 0 ? "green" : ""}`}
      >
        <h3>{price}€</h3>
      </div>
    </div>
  );
};

export default PriceBox;
