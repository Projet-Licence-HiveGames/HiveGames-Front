import React from 'react';
import './PromoShow.css';

interface PromoShowProps {
    discount: number;
}

const PromoShow: React.FC<PromoShowProps> = ({discount}) => {
    return (
        <div className={'promo-show-box'}>
            <h3>{discount}%</h3>
        </div>
    );
}

export default PromoShow;