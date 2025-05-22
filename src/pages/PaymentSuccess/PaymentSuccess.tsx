import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useFetch } from "../../api/privateApi.ts";
import { useAuth } from "../../context/AuthProvider.tsx";

import "./PaymentSuccess.css";

export const PaymentSuccess: React.FC = ({}) => {
  const fetchAPI = useFetch();
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const [paymentData, setPaymentData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);

  const fetchData = async () => {
    await fetchAPI
      .get<any>(`/stripe/order/${sessionId}`)
      .then(setPaymentData)
      .catch((_error) => {
        setError({ ...error, _error });
      });
  };
  console.log(paymentData); // eslint-disable-line

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // useEffect(() => {
  //   if (paymentData.status !== 'succeeded') {
  //       navigate('/home');
  //   }
  // }, []);

  return <div>{paymentData}</div>;
};
