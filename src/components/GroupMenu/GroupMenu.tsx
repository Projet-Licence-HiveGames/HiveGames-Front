import React, {useEffect, useRef, useState} from 'react';
import './GroupMenu.css';
import { NotificationBell } from '../../assets/icones/NotificationBell.tsx';
import { BasketCart } from "../../assets/icones/BasketCart.tsx";
import logoAccount from "../../assets/images/logoAccount.png";
import { LogoutAccount } from "../../assets/icones/LogoutAccount.tsx";
import DropdownMenu from "../DropDown/DropDown.tsx";

export const GroupMenu: React.FC = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null); // Référence pour le menu

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Fermer le dropdown en cliquant à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="group-menu--content">
            <NotificationBell numberNotif={5} />
            <BasketCart />

            <div className="group-menu--connexion" onClick={toggleDropdown} ref={dropdownRef}>
                <img
                    alt={"Account logo"}
                    src={logoAccount}
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/40x40';
                    }}
                />
                <div className="group-menu--connexion-text">
                    <h4>Pseudo</h4>
                    <p>Administrateur</p>
                </div>
                {isDropdownOpen && (
                    <DropdownMenu/>
                )}
            </div>



            <div className="group-menu--disconnect">
                <LogoutAccount />
            </div>
        </div>
    );
};
