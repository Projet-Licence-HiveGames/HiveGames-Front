import React, { useState } from 'react';
import classNames from 'classnames';
import Button from '../../components/ui/buttons/Button';
import logo from '@assets/images/logo.svg';
import logoName from '@assets/images/logo-name.svg';
import { MenuRounded, MenuOpenRounded } from '@mui/icons-material';

import './Sidebar.css'

const Sidebar:React.FC = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  return (
    <div className={classNames('sidebar-container', {'collapsed': isCollapsed})}>
      <button className='sidebar-collapse' onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? <MenuRounded /> : <MenuOpenRounded />}</button>
      <div className='sidebar-header'>
        <img src={isCollapsed ? logo : logoName} alt="Logo" />
      </div>
      <div className='sidebar-content'>
        <Button to="/" buttonType='menuItem'>Home</Button>
        <Button to="/about" buttonType='menuItem'>About</Button>
        <Button to="/contact" buttonType='menuItem'>Contact</Button>
      </div>
    </div>
  );
};

export default Sidebar;
