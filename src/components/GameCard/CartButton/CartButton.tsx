import React from "react";

import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./CartButton.css";

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
      <TLabel baliseType={"span"} label={"buy"} />
    </button>
  );
};

export default CartButton;
