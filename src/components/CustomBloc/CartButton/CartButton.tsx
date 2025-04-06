import React from 'react'
import './CartButton.css'

interface CartButtonProps {
    onClick?: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({onClick}) => {
    return (
        <button className={'cart-button'} onClick={onClick}>
            <span>Acheter</span>
        </button>
    );
}

export default CartButton;