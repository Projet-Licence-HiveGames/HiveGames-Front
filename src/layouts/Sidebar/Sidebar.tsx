import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CalendarMonth,
  HomeRounded,
  MenuRounded,
  StorefrontOutlined,
  Subscriptions,
} from "@mui/icons-material";
import classNames from "classnames";

import { LanguageSelector } from "../../components/ui/LanguageSelector/LanguageSelector.tsx";
import MenuItem from "../../components/ui/Menu/MenuItem";
import { TLabel } from "../../components/ui/TranslationLabel/TLabel.tsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.tsx";
import { useWindowSize } from "../../hooks/useWindowSize.ts";

import logo from "@assets/images/logo.svg";
import logoName from "@assets/images/logo-name.svg";
import modcraftHost from "@assets/images/powered_by_modcraft.svg";

import "./Sidebar.css";

const Sidebar: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobile, isTablet } = useWindowSize();
  const location = useLocation();
  const sidebarRef = useOutsideClick<HTMLDivElement>(() => {
    if (isExpanded && (isMobile || isTablet)) {
      setIsExpanded(false);
    }
  });

  useEffect(() => {
    if (isMobile || isTablet) {
      setIsExpanded(false);
    }
  }, [isMobile, isTablet, location]);

  return (
    <div
      ref={sidebarRef}
      className={classNames("sidebar", {
        "sidebar--collapsed": !isExpanded,
      })}
    >
      <div className={"sidebar-container"}>
        <div className="sidebar-header">
          <img src={!isExpanded ? logo : logoName} alt="Logo" />
        </div>

        <div className="sidebar-content">
          <div className="sidebar-content-top">
            <MenuItem to="/">
              <HomeRounded />
              <TLabel label="sidebar.home" />
            </MenuItem>
            <MenuItem to="/catalog">
              <StorefrontOutlined />
              <TLabel label="sidebar.catalog" />
            </MenuItem>
            <MenuItem to="/calendar">
              <CalendarMonth />
              <TLabel label="sidebar.calendar" />
            </MenuItem>
            <MenuItem to="/subscription">
              <Subscriptions />
              <TLabel label="sidebar.subscription" />
            </MenuItem>
          </div>
          <div className="sidebar-content-bottom">
            <LanguageSelector />
            <img src={modcraftHost} alt="PoweredByModcraft" />
          </div>
        </div>
      </div>
      <button
        className="sidebar-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MenuRounded />
      </button>
    </div>
  );
};

export default Sidebar;
