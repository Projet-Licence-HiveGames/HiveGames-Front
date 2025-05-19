import React, { useCallback, useEffect, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { useFetch } from "../../api/privateApi.ts";
import { useAuth } from "../../context/AuthProvider.tsx";

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
  const [options, setOptions] = useState<CheckoutData | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const data: CheckoutData = await fetchApi.post("/stripe/payment", {
      products: [
        { name: "Souris", amount: 120, currency: "eur" },
        { name: "Clavier", amount: 200, currency: "eur" },
      ],
    });
    return data.client_secret;
  }, []);

  useEffect(() => {
    const fetchSecret = async () => {
      const clientSecret = await fetchClientSecret();
      if (clientSecret) {
        setOptions({ client_secret: clientSecret });
      }
    };

    if (isAuthenticated) {
      fetchSecret();
    }
  }, [isAuthenticated, fetchClientSecret]);

  if (!options) {
    return <div>Loading...</div>;
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};
