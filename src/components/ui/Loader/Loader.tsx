import logo from "@assets/images/logo.svg";

import "./Loader.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      <img alt="Logo" className="logo" src={logo} />
    </div>
  );
};
