import React from "react";

import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./CartButton.css";

interface CartButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOwned?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, isOwned }) => {
  return (
    <button
      className={`cart-button`}
      onClick={(e) => {
        e.stopPropagation();
        if (isOwned) return;
        onClick?.(e);
      }}
    >
      <TLabel label={"buy"} />
    </button>
  );
};

export default CartButton;
