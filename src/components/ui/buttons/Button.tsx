import { FC, ReactNode, useCallback, useId } from "react";

import "./Button.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { noop } from "../../../utils/noop";

interface ButtonProps {
    children: ReactNode;
    to?: string;
    className?: string;
    style?: string;
    buttonType?: "button" | "menuItem";
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({ children, to, className, style, buttonType = "button", disabled, onClick = noop }) => {
    const location = useLocation();
    const isActive =
        to === '/' ? to === location.pathname : location.pathname.startsWith(to || '');

    const id = useId().slice(1, -1);
    const classes = classNames(
        `hivegames-${buttonType}`,
        `hivegames-${buttonType}-${style || 'default'}`,
        className,
    );

    const _onClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick(e);
        },
        [onClick],
    );
    
    if (to) {
        return (
            <Link id={id} to={disabled ? '#' : to} className={classNames(classes, { 'active': isActive })}>{children}</Link>
        );
    } else {
        return (
            <button id={id} className={classes} disabled={disabled} onClick={_onClick}>{children}</button>
        );
    }
};

export default Button;