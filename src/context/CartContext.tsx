import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useCartGameApi } from "../api/services/cartApi.ts";

import { useAuth } from "./AuthProvider";

interface CartContextType {
  cartItems: number[];
  addToCart: (item: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const { addGamesToCart, clearCartOnServer } = useCartGameApi();
  const [cartItems, setCartItems] = useState<number[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!isAuthenticated)
      localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isAuthenticated]);

  const addToCart = async (id: number) => {
    setCartItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
    if (isAuthenticated) {
      await addGamesToCart(id)
        .then(() => {
          toast.success("Article ajouté au panier !");
        })
        .catch(() => {
          toast.error("Erreur lors de l'ajout au panier.");
        });
    } else {
      const updatedCart = [...cartItems, id];
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = async (id: number) => {
    if (!isAuthenticated) {
      const updatedCart = cartItems.filter((cartId) => cartId !== id);
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }

    try {
      await clearCartOnServer([id]);
      setCartItems((prev) => prev.filter((cartId) => cartId !== id));
    } catch (e) {
      toast.error("Le produit n'a pas pu être supprimé");
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (isAuthenticated) {
      await clearCartOnServer();
    } else {
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
