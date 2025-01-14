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
  isCollapsed?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  children,
  to,
  className,
  disabled,
  isCollapsed,
}) => {
  return (
    <NavLink
      to={disabled ? "#" : to}
      className={classNames(className, "hivegames-menuItem", {
        collapsed: isCollapsed,
      })}
    >
      {children}
    </NavLink>
  );
};

export default MenuItem;
