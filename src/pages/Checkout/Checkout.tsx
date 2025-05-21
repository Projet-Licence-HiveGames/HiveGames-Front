import React, { useCallback, useEffect, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useFetch } from "../../api/privateApi.ts";

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
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      const data: CheckoutData = await fetchApi.post("/stripe/payment", {
        products: [
          { name: "Souris", amount: 120, currency: "eur" },
          { name: "Clavier", amount: 200, currency: "eur" },
        ],
      });
      return data.client_secret;
    } catch (error) {
      console.error("Error fetching client secret:", error);
      return null;
    }
  }, []);

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
