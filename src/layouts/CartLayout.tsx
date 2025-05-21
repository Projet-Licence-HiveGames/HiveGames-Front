import { Outlet } from "react-router-dom";

export const CartLayout = () => {
  return (
    <div className="cart-wrapper">
      <Outlet />
    </div>
  );
};
