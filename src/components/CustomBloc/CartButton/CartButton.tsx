import React from "react";

import "./CartButton.css";
import {TLabel} from "../../ui/TranslationLabel/TLabel.tsx";

interface CartButtonProps {
  onClick?: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  return (
    <button
      className={"cart-button"}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <TLabel
        baliseType={"span"}
        label={"buy"} />
    </button>
  );
};

export default CartButton;
