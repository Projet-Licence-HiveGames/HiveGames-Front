import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { NavLink } from 'react-router-dom';
import './DropDown.css';

const DropdownMenu: React.FC = () => {
  return (
    <div className='dropdown-menu'>
      <NavLink to='Library' className='dropdown-item'>
        <MaterialSymbol icon='widgets' />
        <span>Library</span>
      </NavLink>
      <NavLink to='Friend' className='dropdown-item'>
        <MaterialSymbol icon='groups' />
        <span>Friends</span>
      </NavLink>
      <NavLink to='Profil' className='dropdown-item'>
        <MaterialSymbol icon='person_4' />
        <span>Profil</span>
      </NavLink>
      <NavLink to='Setting' className='dropdown-item'>
        <MaterialSymbol icon='page_info' />
        <span>Preference</span>
      </NavLink>
      <NavLink to='Wishlist' className='dropdown-item'>
        <MaterialSymbol icon='bookmark' />
        <span>Wishlist</span>
      </NavLink>
    </div>
  );
};

export default DropdownMenu;
