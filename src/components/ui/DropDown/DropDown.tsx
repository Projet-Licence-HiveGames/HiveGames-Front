import React from "react";
import { MaterialSymbol } from "react-material-symbols";
import { NavLink } from "react-router-dom";

import "./DropDown.css";

const DropdownMenu: React.FC = () => {
  return (
    <div className="dropdown-menu">
      <NavLink to="library" className="dropdown-item">
        <MaterialSymbol icon="widgets" />
        <span>Library</span>
      </NavLink>
      <NavLink to="friend" className="dropdown-item">
        <MaterialSymbol icon="groups" />
        <span>Friends</span>
      </NavLink>
      <NavLink to="profil" className="dropdown-item">
        <MaterialSymbol icon="person_4" />
        <span>Profil</span>
      </NavLink>
      <NavLink to="setting" className="dropdown-item">
        <MaterialSymbol icon="page_info" />
        <span>Preference</span>
      </NavLink>
      <NavLink to="wishlist" className="dropdown-item">
        <MaterialSymbol icon="bookmark" />
        <span>Wishlist</span>
      </NavLink>
    </div>
  );
};

export default DropdownMenu;
