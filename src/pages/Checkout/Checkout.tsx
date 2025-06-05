import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useFetch } from "../../api/privateApi.ts";
import { useCart } from "../../context/CartContext.tsx";

import "./Checkout.css";

const stripePromise = loadStripe(
  import.meta.env.HIVEGAMES_STRIPE_PUBLISHABLE_KEY,
);

interface CheckoutData {
  client_secret: string;
  fetchClientSecret?: (() => Promise<string>) | null;
}

export const Checkout: React.FC = () => {
  const fetchApi = useFetch();
  const { cartItems } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchClientSecret = useCallback(async () => {
    try {
      const gameIds = cartItems.map(Number);

      const data: CheckoutData = await fetchApi.post("/stripe/payment", {
        gameIds: gameIds,
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
    return <div>Chargement du paiement...</div>;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
