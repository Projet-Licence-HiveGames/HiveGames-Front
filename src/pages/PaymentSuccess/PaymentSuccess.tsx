import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartGameApi } from "@api/services/cartApi.ts";
import { CheckCircleRounded } from "@mui/icons-material";
import { SportsEsportsRounded } from "@mui/icons-material";

import { useCart } from "@context/CartContext.tsx";

import { Loader } from "@components/ui/Loader/Loader.tsx";
import TLabel from "@components/ui/TranslationLabel/TLabel.tsx";

import "./PaymentSuccess.css";

export const PaymentSuccess: React.FC = ({}) => {
  const [paymentData, setPaymentData] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchOrderDetails } = useCartGameApi();
  const { removeFromCart } = useCart();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const fetchData = async () => {
    if (!sessionId) {
      setError({ error: "Session ID is missing" });
      navigate("/home");
      return;
    }

    await fetchOrderDetails(sessionId)
      .then((data) => {
        setPaymentData(data);
        setIsLoading(false);
      })
      .catch((_error) => {
        setError({ ...error, error: _error });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionId]);

  useEffect(() => {
    if (paymentData.status && paymentData.status !== "complete") {
      navigate("/payment-failed");
    }
  }, [paymentData, navigate]);

  useEffect(() => {
    if (paymentData && paymentData.status === "complete") {
      const gameIds = paymentData?.items?.map((item: any) => item.id);
      gameIds?.forEach((id: number) => removeFromCart(id));
      localStorage.removeItem("cart");
    }
  }, [paymentData, removeFromCart]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <CheckCircleRounded className="confirmation-icon" />
        <TLabel
          baliseType={"h1"}
          className={"confirmation-title"}
          label={"payment_confirmed"}
        />
        <p className="confirmation-message">
          <TLabel
            label={"thank_you_for_your_purchase"}
            replaceValues={{ site_name: <strong>HiveGames</strong> }}
          />
        </p>

        <div className="confirmation-details">
          <p>
            <SportsEsportsRounded />
            <strong>{paymentData.name}</strong>
          </p>
          <TLabel
            baliseType={"p"}
            className={"confirmation-price"}
            label={"total_paid"}
            replaceValues={{ amount: paymentData.amount }}
          />
        </div>

        <div className="confirmation-details-buttons">
          <button className="confirmation-button" onClick={() => navigate("/")}>
            <TLabel label={"return_to_home"} />
          </button>
          {paymentData.invoice && (
            <a
              className="confirmation-invoice-button"
              href={paymentData.invoice}
              rel="noopener noreferrer"
              target="_blank"
            >
              <TLabel label={"see_invoice"} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
