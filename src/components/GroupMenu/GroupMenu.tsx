import React, { useEffect, useRef, useState } from "react";
import { MaterialSymbol } from "react-material-symbols";
import { Link, NavLink, useLocation } from "react-router-dom";
import Person4RoundedIcon from "@mui/icons-material/Person4Rounded";

import { BasketCart } from "../../assets/icones/BasketCart.tsx";
import { NotificationBell } from "../../assets/icones/NotificationBell.tsx";
import logoAccount from "../../assets/images/logoAccount.png";
import { useAuth } from "../../context/AuthProvider.tsx";
import useWindowSize from "../../hooks/useWindowSize.ts";
import DropdownMenu from "../ui/DropDown/DropDown.tsx";
import { TLabel } from "../ui/TranslationLabel/TLabel.tsx";

import "./GroupMenu.css";

export const GroupMenu: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null); // Référence pour le Menu
  const { isMobile } = useWindowSize();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="group-menu-content">
      <div className="group-menu-icones">
        <NotificationBell numberNotif={5} />
        <Link to={"/cart"}>
          <BasketCart />
        </Link>
      </div>

      {!isMobile ? (
        isAuthenticated ? (
          <>
            <div
              className="group-menu-connexion"
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              <img
                alt={"Account logo"}
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/40x40";
                }}
                src={logoAccount}
              />
              <div className="group-menu-connexion-text authenticated">
                <h4>{user?.pseudo}</h4>
                <p>{user?.user_role}</p>
              </div>
              {isDropdownOpen && <DropdownMenu />}
            </div>
            <div className="group-menu--disconnect">
              <button onClick={logout}>
                <MaterialSymbol icon="logout" size={32} />
              </button>
            </div>
          </>
        ) : (
          <div className="group-menu-connexion">
            <NavLink
              className={"group-menu-connexion-text"}
              state={{ from: location }}
              to={"login"}
            >
              <TLabel baliseType={"h4"} label={"login"} />
            </NavLink>
          </div>
        )
      ) : isAuthenticated ? (
        <>
          <div
            className="group-menu-connexion mobile"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <img
              alt={"Account logo"}
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/40x40";
              }}
              src={logoAccount}
            />
            {isDropdownOpen && <DropdownMenu />}
          </div>
          <div className="group-menu--disconnect">
            <button onClick={logout}>
              <MaterialSymbol icon="logout" size={32} />
            </button>
          </div>
        </>
      ) : (
        <NavLink className={"group-menu-connexion-text"} to={"login"}>
          <Person4RoundedIcon />
        </NavLink>
      )}
    </div>
  );
};
