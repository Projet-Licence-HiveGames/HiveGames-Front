import { Outlet } from "react-router-dom";

import "./CartLayout.css";

export const CartLayout = () => {
  return (
    <div className="cart-wrapper">
      <Outlet />
    </div>
  );
};
