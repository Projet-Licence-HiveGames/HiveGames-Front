import React, {useEffect, useRef, useState} from 'react';
import {MaterialSymbol} from 'react-material-symbols';
import {BasketCart} from '../../assets/icones/BasketCart.tsx';
import {NotificationBell} from '../../assets/icones/NotificationBell.tsx';
import logoAccount from '../../assets/images/logoAccount.png';
import DropdownMenu from '../DropDown/DropDown.tsx';
import './GroupMenu.css';
import useAuth from "../../hooks/useAuth.tsx";
import {privateApi} from "../../api/privateApi.ts";

export const GroupMenu: React.FC = () => {
    const {isAuthenticated, user} = useAuth();
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

    const logoutUser = async () => {
        await privateApi('/auth/logout', 'GET');
    };

    return (
        <div className='group-menu-content'>
            <div className='group-menu-icones'>
                <NotificationBell numberNotif={5}/>
                <BasketCart/>
            </div>

            <div
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
                <div className='group-menu-connexion-text'>
                    {isAuthenticated ? (
                        <>
                            <h4>{user?.name}</h4>
                            <p>{user?.user_role}</p>
                        </>
                    ) : (
                        <>
                            <h4>Pseudo</h4>
                            <p>Administrateur</p>
                        </>
                    )}
                </div>
                {isDropdownOpen && <DropdownMenu/>}
            </div>

            <div className='group-menu--disconnect'>
                <MaterialSymbol icon='logout' size={32}>
                    <button onClick={logoutUser}/>
                </MaterialSymbol>
            </div>
        </div>
    );
};
