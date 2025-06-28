import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@api/privateApi.ts";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useCart } from "@contexts/CartContext.tsx";

import { Loader } from "@components/ui/Loader/Loader.tsx";

import "./Checkout.css";

const stripePromise = loadStripe(
  import.meta.env.HIVEGAMES_STRIPE_PUBLISHABLE_KEY,
);

interface CheckoutData {
  client_secret: string;
  fetchClientSecret?: (() => Promise<string>) | null;
}

export const Checkout: FC = () => {
  const fetchApi = useFetch();
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchClientSecret = useCallback(async () => {
    try {
      if (cartItems.length === 0) return null;
      const gameIds = cartItems.map(Number);
      const data: CheckoutData = await fetchApi.post("/stripe/payment", {
        gameIds,
      });

      return data.client_secret;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    const fetchSecret = async () => {
      const secret = await fetchClientSecret();
      if (secret) {
        setClientSecret(secret);
      }
    };

    fetchSecret();
  }, [fetchClientSecret]);

  if (!clientSecret) {
    return <Loader />;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        options={{ clientSecret }}
        stripe={stripePromise}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
