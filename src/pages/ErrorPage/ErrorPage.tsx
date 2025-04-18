import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./ErrorPage.css";

export const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error_status } = location.state || {};

  useEffect(() => {
    if (!error_status) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      {error_status == 404 ? (
        <span>L'élément recherché est introuvable</span>
      ) : null}
    </div>
  );
};
