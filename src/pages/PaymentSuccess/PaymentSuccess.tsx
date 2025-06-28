import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleRounded, SportsEsportsRounded } from "@mui/icons-material";

import { useAuth } from "@contexts/AuthProvider";
import { useCart } from "@contexts/CartContext.tsx";

import { Loader } from "@components/ui/Loader/Loader.tsx";
import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./PaymentSuccess.css";

interface PaymentData {
  id: number;
  status: string;
  amount: number;
  name: string[];
  invoice_url: string;
  game_ids: string[];
}

export const PaymentSuccess: FC = ({}) => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [error, setError] = useState<any>(null);
  const { clearLocalCart, fetchOrderDetails } = useCart();
  const { checkUser } = useAuth();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const fetchData = async () => {
    checkUser();
    if (!sessionId) {
      setError({ error: "Session ID is missing" });
      navigate("/home");
      return;
    }

    await fetchOrderDetails(sessionId)
      .then((data) => {
        setPaymentData(data);
      })
      .catch((_error) => {
        setError({ ...error, error: _error });
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionId]);

  useEffect(() => {
    if (paymentData?.status && paymentData.status !== "complete") {
      navigate("/payment-failed");
    } else {
      clearLocalCart();
    }
  }, [paymentData, navigate]);

  if (!paymentData) {
    return (
      <div className="confirmation-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <CheckCircleRounded className="confirmation-icon" />
        <TLabel
          baliseType={"h1"}
          className={"confirmation-title"}
          label={"cart.payment_confirmed"}
        />
        <p className="confirmation-message">
          <TLabel
            label={"cart.thank_you_for_your_purchase"}
            replaceValues={{ site_name: "HiveGames" }}
          />
        </p>
        <div className="confirmation-details">
          <div className={"confirmation-details-list"}>
            <ul>
              {paymentData?.name.map((name, index) => (
                <ol className={"item"} key={index}>
                  <SportsEsportsRounded />
                  {name}
                </ol>
              ))}
            </ul>
          </div>
          <TLabel
            baliseType={"p"}
            className={"confirmation-price"}
            label={"cart.total_paid"}
            replaceValues={{ amount: paymentData?.amount }}
          />
        </div>
        <div className="confirmation-details-buttons">
          <button className="confirmation-button" onClick={() => navigate("/")}>
            <TLabel label={"return_to_home"} />
          </button>
          {paymentData?.invoice_url && (
            <a
              className="confirmation-invoice-button"
              href={paymentData?.invoice_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <TLabel label={"cart.see_invoice"} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
