import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import './MenuItem.css';

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
      to={disabled ? '#' : to}
      className={classNames(className, 'hivegames-menuItem')}
    >
      <span />
      <label>{children}</label>
    </NavLink>
  );
};

export default MenuItem;
