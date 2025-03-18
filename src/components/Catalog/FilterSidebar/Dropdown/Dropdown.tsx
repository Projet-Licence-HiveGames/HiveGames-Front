import { FC } from 'react';
import classNames from 'classnames';

import './Dropdown.css';
import { MaterialSymbol } from 'react-material-symbols';

interface DropdownProps {
  className?: string;
  title: string;
}

const Dropdown: FC<DropdownProps> = ({ className, title }) => {
  return (
    <div className={classNames('dropdown-container', className)}>
      <div className='dropdown-header'>
        <span className='dropdown-header-title'>{title}</span>
        <MaterialSymbol icon='keyboard_arrow_down' />
      </div>
    </div>
  );
};

export default Dropdown;