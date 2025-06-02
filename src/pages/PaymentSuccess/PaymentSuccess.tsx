import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCartGameApi } from "../../api/services/cartApi";

import "./PaymentSuccess.css";

export const PaymentSuccess: React.FC = ({}) => {
  const { fetchOrderDetails } = useCartGameApi();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const [paymentData, setPaymentData] = React.useState<any>({});
  const [error, setError] = React.useState<any>(null);

  const fetchData = async () => {
    if (!sessionId) {
      setError({ error: "Session ID is missing" });
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
      paymentData.status !== "succeeded"
    ) {
      navigate("/payment-failed");
    }
  }, [paymentData, navigate]);

  return <div>{JSON.stringify(paymentData)}</div>;
};
