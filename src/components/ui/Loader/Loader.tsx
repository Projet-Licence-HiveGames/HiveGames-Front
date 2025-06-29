import { FC } from "react";
import classNames from "classnames";

import logo from "@assets/images/logo.svg";

import "./Loader.css";

interface LoaderProps {
  className?: string;
  large?: boolean;
}

export const Loader: FC<LoaderProps> = ({ className, large }) => {
  return (
    <div className={classNames("loader", className)}>
      <img
        alt="Logo"
        className={classNames("logo", {
          large: large,
        })}
        src={logo}
      />
    </div>
  );
};
