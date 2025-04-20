import React, { useContext, useEffect, useRef } from "react";
import {
  CalendarMonth,
  HomeRounded,
  StorefrontOutlined,
  Subscriptions,
} from "@mui/icons-material";
import classNames from "classnames";

import MenuItem from "../../components/ui/Menu/MenuItem";
import TLabel from "../../components/ui/TranslationLabel/TLabel.tsx";
import { TranslationContext } from "../../context/TranslationProvider.tsx";
import useWindowSize from "../../hooks/useWindowSize.ts";

import logo from "@assets/images/logo.svg";
import logoName from "@assets/images/logo-name.svg";

import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { selectedLanguage, setSelectedLanguage } =
    useContext(TranslationContext);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useWindowSize();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isMobile || isTablet) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, isTablet]);

  return (
    <div
      ref={sidebarRef}
      className={classNames("sidebar-container", {
        "sidebar-container--collapsed": !isOpen,
      })}
    >
      <div className="sidebar-header">
        <img src={!isOpen ? logo : logoName} alt="Logo" />
      </div>

      <div className="sidebar-content">
        <div className="sidebar-content-top">
          <MenuItem to="/">
            <HomeRounded />
            <TLabel label="sidebar.home" />
          </MenuItem>
          <MenuItem to="/catalogue">
            <StorefrontOutlined />
            <TLabel label="sidebar.catalog" />
          </MenuItem>
          <hr />
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
          <select
            onChange={(e) => {
              setSelectedLanguage(e.target.value as "fr" | "en");
            }}
          >
            <option value="fr" selected={selectedLanguage === "fr"}>
              Français
            </option>
            <option value="en" selected={selectedLanguage === "en"}>
              English
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
