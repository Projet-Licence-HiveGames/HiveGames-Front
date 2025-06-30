import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import "./MenuItem.css";

interface MenuItemProps {
  children: ReactNode;
  to: string;
  className?: string;
  style?: string;
  disabled?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ children, to, className, disabled }) => {
  return (
    <NavLink
      className={classNames(className, "hivegames-menuItem")}
      to={disabled ? "#" : to}
    >
      <label>{children}</label>
    </NavLink>
  );
};

export default MenuItem;
