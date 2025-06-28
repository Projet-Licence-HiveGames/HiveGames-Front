import { FC } from "react";
import classNames from "classnames";

import logo from "@assets/images/logo.svg";

import "./Loader.css";

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={classNames("loader", className)}>
      <img alt="Logo" className="logo" src={logo} />
    </div>
  );
};
