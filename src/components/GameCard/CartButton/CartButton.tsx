import React from "react";

import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./CartButton.css";

interface CartButtonProps {
  onClick?: () => void;
  isOwned?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, isOwned }) => {
  return (
    <button
      className={`cart-button ${isOwned ? "owned" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      {isOwned ? (
        <TLabel baliseType={"span"} label={"owned"} translationType={"app"} />
      ) : (
        <TLabel baliseType={"span"} label={"buy"} translationType={"app"} />
      )}
    </button>
  );
};

export default CartButton;
