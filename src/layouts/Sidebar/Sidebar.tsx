import React, { useState } from "react";
import classNames from "classnames";
import logo from "@assets/images/logo.svg";
import logoName from "@assets/images/logo-name.svg";
import {
  MenuRounded,
  MenuOpenRounded,
  HomeRounded,
  CalendarMonth,
  Subscriptions,
  StorefrontOutlined,
} from "@mui/icons-material";

import "./Sidebar.css";
import MenuItem from "../../components/ui/menu/MenuItem";

const Sidebar:React.FC = () => {
    const [isCollapsed, setCollapsed] = useState(false);
    return (
        <div className={classNames('sidebar-container', {'sidebar-container--collapsed': isCollapsed})}>
            <button className='sidebar-collapse' onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? <MenuRounded /> : <MenuOpenRounded />}</button>
            <div className='sidebar-header'>
                <img src={isCollapsed ? logo : logoName} alt="Logo" />
            </div>
            <div className='sidebar-content'>
                <MenuItem to="/" isCollapsed={isCollapsed}><HomeRounded /><span>Accueil</span></MenuItem>
                <MenuItem to="/catalogue" isCollapsed={isCollapsed}><StorefrontOutlined /><span>Catalogue</span></MenuItem>
                <hr/>
                <MenuItem to="/calendar" isCollapsed={isCollapsed}><CalendarMonth/><span>Calendrier</span></MenuItem>
                <MenuItem to="/subscription" isCollapsed={isCollapsed}><Subscriptions/><span>Abonnement</span></MenuItem>
                <hr/>
            </div>
        </div>
    );
};

export default Sidebar;
