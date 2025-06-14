import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleRounded } from "@mui/icons-material";

import { useCartGameApi } from "../../api/services/cartApi";
import { useCart } from "../../context/CartContext.tsx";

import "./PaymentSuccess.css";

export const PaymentSuccess: React.FC = ({}) => {
  const [paymentData, setPaymentData] = React.useState<any>({});
  const [error, setError] = React.useState<any>(null);
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
      .then(setPaymentData)
      .catch((_error) => {
        setError({ ...error, error: _error });
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
      const gameIds = paymentData.items.map((item: any) => item.id);
      gameIds.forEach((id: number) => removeFromCart(id));
      localStorage.removeItem("cart");
    }
  }, [paymentData, removeFromCart]);

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <CheckCircleRounded className="confirmation-icon" />
        <h1 className="confirmation-title">Paiement Confirmé !</h1>
        <p className="confirmation-message">
          Merci pour votre achat sur <strong>HiveGames</strong>.
        </p>

        <div className="confirmation-details">
          <p>
            🎮 <strong>{paymentData.name}</strong>
          </p>
          <p className="confirmation-price">
            Total payé : {paymentData.amount}
          </p>
        </div>

        <div className="confirmation-details-buttons">
          <button
            className="confirmation-button"
            onClick={() => navigate("/home")}
          >
            Retour à l'accueil
          </button>
          {paymentData.invoice && (
            <a
              className="confirmation-invoice-button"
              href={paymentData.invoice}
              rel="noopener noreferrer"
              target="_blank"
            >
              Voir la facture
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
