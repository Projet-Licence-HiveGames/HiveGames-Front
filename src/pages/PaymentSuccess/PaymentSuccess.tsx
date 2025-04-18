import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { privateApi } from "../../api/privateApi.ts";
import { useAuth } from "../../context/AuthProvider.tsx";

import "./PaymentSuccess.css";

export const PaymentSuccess: React.FC = ({}) => {
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const [paymentData, setPaymentData] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);

  const fetchData = async () => {
    await privateApi<any>(`/stripe/order/${sessionId}`, "GET")
      .then((response) => {
        const { data } = response;
        setPaymentData(data);
      })
      .catch((_error) => {
        setError({ ...error, _error });
      });
  };
  console.log(paymentData);

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
