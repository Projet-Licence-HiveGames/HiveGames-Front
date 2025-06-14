import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useCartGameApi } from "../api/services/cartApi.ts";
import TLabel from "../components/ui/TranslationLabel/TLabel.tsx";

import { useAuth } from "./AuthProvider";

interface CartContextType {
  cartItems: number[];
  addToCart: (item: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

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
  const { fetchCartGames, addGamesToCart, clearCartOnServer } =
    useCartGameApi();
  const [cartItems, setCartItems] = useState<number[]>([]);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    const localCartIds: number[] = localCart ? JSON.parse(localCart) : [];

    if (isAuthenticated) {
      fetchCartGames()
        .then((data) => {
          const serverCartIds = data.map((game) => game.id);
          const mergedCartIds = Array.from(
            new Set([...localCartIds, ...serverCartIds]),
          );
          setCartItems(mergedCartIds);
          localStorage.setItem("cart", JSON.stringify(mergedCartIds));
        })
        .catch(() => {
          toast.error("Erreur lors de la récupération du panier.");
        });
    } else {
      setCartItems(localCartIds);
    }
  }, [isAuthenticated]);

  const addToCart = async (id: number) => {
    setCartItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
    if (isAuthenticated) {
      await addGamesToCart(id)
        .then(() => {
          toast.success(<TLabel baliseType={"span"} label={"article_added"} />);
        })
        .catch(() => {
          toast.error("Erreur lors de l'ajout au panier.");
        });
    } else {
      const updatedCart = [...cartItems, id];
      setCartItems(updatedCart);
      toast.success(<TLabel baliseType={"span"} label={"article_added"} />);
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
      toast.error("The product could not be removed from the cart.");
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
