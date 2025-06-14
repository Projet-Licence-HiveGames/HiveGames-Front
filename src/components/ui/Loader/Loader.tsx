import logo from "@assets/images/logo.svg";

import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};
