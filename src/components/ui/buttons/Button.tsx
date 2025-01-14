import { FC, ReactNode, useCallback, useId } from 'react';

import './Button.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { noop } from '../../../utils/noop';

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
        id={id}
        to={disabled ? '#' : to}
        className={classNames(`hivegames-button`, className)}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        id={id}
        className={classNames(`hivegames-button`, className)}
        disabled={disabled}
        onClick={_onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
