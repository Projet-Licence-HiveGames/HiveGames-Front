import React, {useCallback} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import './Checkout.css';
import {privateApi} from "../../api/privateApi.ts";

const stripePromise = loadStripe(import.meta.env.HIVEGAMES_STRIPE_PUBLISHABLE_KEY);

interface CheckoutData {
    client_secret: string;
}

export const Checkout: React.FC = () => {
    const fetchClientSecret = useCallback(async () => {
        // Create a Checkout Session
        const data:CheckoutData = await privateApi("/stripe/payment", 'POST', {
            products: [
                { name: 'Souris', amount: 120, currency: 'eur' },
                { name: 'Clavier', amount: 200, currency: 'eur' },
            ],
        })
        return data?.client_secret;
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