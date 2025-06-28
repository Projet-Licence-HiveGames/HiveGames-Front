import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CancelRounded } from "@mui/icons-material";

import { useAuth } from "@contexts/AuthProvider";

import { TLabel } from "@components/ui/TranslationLabel/TLabel.tsx";

import "./PaymentFailed.css";

export const PaymentFailed: FC = () => {
  const { checkUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <div className="failed-container">
      <div className="failed-card">
        <CancelRounded className="failed-icon" />
        <TLabel
          baliseType={"h1"}
          className={"failed-title"}
          label={"cart.payment_failed"}
        />
        <p className="failed-message">
          <TLabel label={"cart.payment_error_message"} />
        </p>
        <div className="failed-details-buttons">
          <button className="failed-button" onClick={() => navigate("/cart")}>
            <TLabel label={"cart.return_to_cart"} />
          </button>
          <button className="failed-home-button" onClick={() => navigate("/")}>
            <TLabel label={"return_to_home"} />
          </button>
        </div>
      </div>
    </div>
  );
};
