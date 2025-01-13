import React from 'react';
import './GroupMenu.css';
import {NotificationBell} from '../../assets/images/notificationBell.tsx'
import {BasketCart} from "../../assets/images/BasketCart.tsx";

export const GroupMenu: React.FC = () => {
  return (
    <div className="GroupMenu-content">
        <NotificationBell numberNotif={5}/>
        <BasketCart/>
        <div className="GroupMenu-connexion">
            <img src="https://placehold.co/40x40"/>
            <div className="GroupMenu-connexion-text">
                <h4>Pseudo</h4>
                <p>Administrateur</p>
            </div>
        </div>
    </div>
  );
};