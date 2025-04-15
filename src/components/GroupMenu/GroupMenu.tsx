import React, {useEffect, useRef, useState} from 'react';
import {MaterialSymbol} from 'react-material-symbols';
import {BasketCart} from '../../assets/icones/BasketCart.tsx';
import {NotificationBell} from '../../assets/icones/NotificationBell.tsx';
import logoAccount from '../../assets/images/logoAccount.png';
import DropdownMenu from '../ui/DropDown/DropDown.tsx';
import './GroupMenu.css';
import {useAuth} from "../../context/AuthProvider.tsx";
import {NavLink} from 'react-router-dom';

export const GroupMenu: React.FC = () => {
    const {isAuthenticated, user, logout} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null); // Référence pour le Menu

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
        <div className='group-menu-content'>
            <div className='group-menu-icones'>
                <NotificationBell numberNotif={5}/>
                <BasketCart/>
            </div>

            {isAuthenticated ? (<div
                className='group-menu-connexion'
                onClick={toggleDropdown}
                ref={dropdownRef}
            >
                <img
                    alt={'Account logo'}
                    src={logoAccount}
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/40x40';
                    }}
                />
                <div className='group-menu-connexion-text authenticated'>
                    <h4>{user?.pseudo}</h4>
                    <p>{user?.user_role}</p>
                </div>
                {isDropdownOpen && <DropdownMenu/>}
            </div>) : (
                <div className='group-menu-connexion'>
                    <NavLink
                        className={'group-menu-connexion-text'}
                        to={"login"}
                    >
                        <h4>Se connecter</h4>
                    </NavLink>
                </div>
            )}

            {isAuthenticated && (
                <div className='group-menu--disconnect'>
                    <button onClick={logout}>
                        <MaterialSymbol icon='logout' size={32}/>
                    </button>
                </div>
            )}
        </div>
    );
};
