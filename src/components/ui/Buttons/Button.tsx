import { FC, ReactNode, useCallback, useId } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { noop } from "@utils/noop";

import "./Button.css";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  className?: string;
  style?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  children,
  to,
  className,
  disabled,
  onClick = noop,
}) => {
  const id = useId().slice(1, -1);

  const _onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onClick(e);
    },
    [onClick],
  );

  if (to) {
    return (
      <Link
        className={classNames(`hivegames-button`, className)}
        id={id}
        to={disabled ? "#" : to}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        className={classNames(`hivegames-button`, className)}
        disabled={disabled}
        id={id}
        onClick={_onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
