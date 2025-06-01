import React from "react";
import { toast } from "react-toastify";

import { TLabel } from "../../ui/TranslationLabel/TLabel.tsx";

import "./CartButton.css";

interface CartButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOwned?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, isOwned }) => {
  return (
    <button
      className={`cart-button ${isOwned ? "owned" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (isOwned) return;
        onClick?.(e);
        toast.success("Added to cart");
      }}
    >
      <TLabel
        baliseType={"span"}
        label={isOwned ? "owned" : "buy"}
        translationType={"app"}
      />
    </button>
  );
};

export default CartButton;
