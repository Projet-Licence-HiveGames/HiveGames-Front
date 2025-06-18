import React from "react";
import { Link } from "react-router-dom";

import TLabel from "@components/ui/TranslationLabel/TLabel.tsx";

interface CartAmountTotalProps {
  price: number;
}

export const CartAmountTotal: React.FC<CartAmountTotalProps> = ({ price }) => {
  return (
    <div className={"cart-container__total"}>
      <div className={"cart-container__total-button"}>
        <Link to={"/catalog"}>
          <TLabel
            baliseType={"button"}
            className={"cart-container__shopping-button"}
            label="continue_shopping"
          />
        </Link>
        <Link to={"/cart/checkout"}>
          <TLabel
            baliseType={"button"}
            className={"cart-container__shopping-button"}
            label={"purchase"}
          />
        </Link>
      </div>
    </div>
  );
};
