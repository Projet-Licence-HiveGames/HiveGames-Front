import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import './Checkout.css';
import {privateApi} from "../../api/privateApi.ts";

const stripePromise = loadStripe(import.meta.env.HIVEGAMES_STRIPE_PUBLISHABLE_KEY);

export const Checkout:React.FC = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:8000/api/stripe/payment", {
      method: "POST",
      body : JSON.stringify({
        amount: 120,
        name: "souris",
      }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data.clientSecret));
  }, []);

  const options = {fetchClientSecret};

  return (
      <div id="checkout">
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
        >
          <EmbeddedCheckout/>
        </EmbeddedCheckoutProvider>
      </div>
  );
};