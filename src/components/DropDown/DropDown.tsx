import React from 'react';
import './DropDown.css';
import {SquareBloc} from "../../assets/icones/SquareBloc.tsx";
import {FriendIcones} from "../../assets/icones/FriendIcone.tsx";
import {FriendGroup} from "../../assets/icones/FriendGroup.tsx";
import {PreferenceSetting} from "../../assets/icones/PreferenceSetting.tsx";
import {NavLink} from "react-router-dom";

const DropdownMenu: React.FC = () => {

    return (
        <div className="dropdown-menu">
            <NavLink to="Library" className="dropdown-item"><SquareBloc/><span>Library</span></NavLink>
            <NavLink to="Friend" className="dropdown-item"><FriendGroup/><span>Friends</span></NavLink>
            <NavLink to="Profil" className="dropdown-item"><FriendIcones/><span>Profil</span></NavLink>
            <NavLink to="Setting" className="dropdown-item"><PreferenceSetting/><span>Preference</span></NavLink>
            <NavLink to="Wishlist" className="dropdown-item"><SquareBloc/><span>Wishlist</span></NavLink>
        </div>
    );
};

export default DropdownMenu;
