import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCartGameApi } from "../../api/services/cartApi";

import "./PaymentSuccess.css";

export const PaymentSuccess: React.FC = ({}) => {
  const [paymentData, setPaymentData] = React.useState<any>({});
  const [error, setError] = React.useState<any>(null);
  const { fetchOrderDetails } = useCartGameApi();
  const { removeFromCart } = useCartGameApi();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const fetchData = async () => {
    if (!sessionId) {
      setError({ error: "Session ID is missing" });
      navigate("/");
      return;
    }

    await fetchOrderDetails(sessionId)
      .then(setPaymentData)
      .catch((_error) => {
        setError({ ...error, error: _error });
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionId]);

  useEffect(() => {
    if (
      paymentData &&
      paymentData.status &&
      paymentData.status !== "complete"
    ) {
      navigate("/payment-failed");
    }
  }, [paymentData, navigate]);

  useEffect(() => {
    if (paymentData && paymentData.status === "complete") {
      const gameIds = paymentData.items.map((item: any) => item.id);
      gameIds.forEach((id: number) => removeFromCart(id));
      localStorage.removeItem("cart");
    }
  }, [paymentData, removeFromCart]);

  return <div>{JSON.stringify(paymentData)}</div>;
};
