import React from 'react'
import './PromoBloc.css'
import PriceBox from "../PriceBox/PriceBox.tsx";
import PromoShow from "../PromoShow/PromoShow.tsx";
import CartButton from "../CartButton/CartButton.tsx";

interface PromoBlocProps {
    expiryDate: string;
    discount: number;
    originalPrice: number;
    discountedPrice: number;
    onAddToCart: () => void;
}

const PromoBloc: React.FC<PromoBlocProps> = ({expiryDate, discount, originalPrice, discountedPrice, onAddToCart}) => {
    return (
        <div className="promotion-card">
            <div className="promo-header">
                <span className="promo-expiry-date">
                  Until <strong>{expiryDate}</strong> :
                </span>
                <div className="promo-price">
                    <PromoShow discount={discount}/>
                    <PriceBox
                        oldPrice={originalPrice}
                        price={discountedPrice}/>
                    <CartButton onClick={onAddToCart}/>
                </div>
            </div>
        </div>
    );
}

export default PromoBloc;