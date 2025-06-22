import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCartGameApi } from "@api/services/cartApi.ts";

import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import { useAuth } from "./AuthProvider";

interface CartContextType {
  cartItems: number[];
  addToCart: (item: number) => void;
  removeFromCart: (id: number[]) => void;
  clearCart: () => void;
  clearLocalCart: () => void;
  fetchOrderDetails: (sessionId: string) => Promise<any>;
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
  const {
    fetchCartGames,
    addGamesToCart,
    clearCartOnServer,
    fetchOrderDetails,
  } = useCartGameApi();
  const [cartItems, setCartItems] = useState<number[]>([]);

  useEffect(() => {
    const syncCart = () => {
      const localCart = localStorage.getItem("cart");
      const localCartIds: number[] = localCart ? JSON.parse(localCart) : [];
      if (isAuthenticated) {
        fetchCartGames()
          .then((data) => {
            const serverCartIds = data ?? [];
            const mergedCartIds = Array.from(
              new Set([...localCartIds, ...serverCartIds]),
            );
            setCartItems(mergedCartIds);
            const test = localCartIds.filter(
              (id) => !serverCartIds.includes(id),
            );
            test.length && addGamesToCart(test);
          })
          .catch(() => {
            toast.dismiss();
            toast.error("Erreur lors de la récupération du panier.");
          });
      } else {
        setCartItems(localCartIds);
      }
    };

    syncCart();

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, [isAuthenticated]);

  const addToCart = async (id: number) => {
    if (isAuthenticated) {
      try {
        await addGamesToCart([id]);
      } catch {
        toast.dismiss();
        toast.error("Erreur lors de l'ajout au panier.");
        return;
      }
    }
    const updatedCart = [...cartItems, id];
    setCartItems(updatedCart);
    toast.dismiss();
    toast.success(<TLabel label={"cart.article_added"} />);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = async (id: number[]) => {
    if (isAuthenticated) {
      try {
        await clearCartOnServer(id);
      } catch (e) {
        toast.dismiss();
        toast.error("The product could not be removed from the cart.");
        return;
      }
    }

    const updatedCart = cartItems.filter((item) => !id.includes(item));
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = async () => {
    setCartItems([]);
    if (isAuthenticated) {
      await clearCartOnServer();
    }

    localStorage.removeItem("cart");
  };

  const clearLocalCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        clearLocalCart,
        fetchOrderDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
