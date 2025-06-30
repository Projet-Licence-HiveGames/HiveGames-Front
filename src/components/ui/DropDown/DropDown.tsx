import React from "react";
import { MaterialSymbol } from "react-material-symbols";
import { NavLink } from "react-router-dom";

import "./DropDown.css";

const DropdownMenu: React.FC = () => {
  return (
    <div className="dropdown-menu">
      <NavLink className="dropdown-item" to="Library">
        <MaterialSymbol icon="widgets" />
        <span>Library</span>
      </NavLink>
      <NavLink className="dropdown-item" to="Friend">
        <MaterialSymbol icon="groups" />
        <span>Friends</span>
      </NavLink>
      <NavLink className="dropdown-item" to="Profil">
        <MaterialSymbol icon="person_4" />
        <span>Profil</span>
      </NavLink>
      <NavLink className="dropdown-item" to="Setting">
        <MaterialSymbol icon="page_info" />
        <span>Preference</span>
      </NavLink>
      <NavLink className="dropdown-item" to="Wishlist">
        <MaterialSymbol icon="bookmark" />
        <span>Wishlist</span>
      </NavLink>
    </div>
  );
};

export default DropdownMenu;
