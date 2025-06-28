import React from "react";
import { toast } from "react-toastify";

import { useCart } from "@contexts/CartContext";

import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./CartButton.css";

interface CartButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  gameId: number;
  isOwned?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({
  onClick,
  isOwned,
  gameId,
}) => {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some((item) => item === gameId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOwned) return;
    if (!isInCart) {
      addToCart(gameId);
    } else {
      toast.error(<TLabel label={"cart.already_in_cart"} />);
    }
  };

  return (
    <button className={`cart-button`} onClick={handleAddToCart}>
      <TLabel label={"buy"} />
    </button>
  );
};

export default CartButton;
