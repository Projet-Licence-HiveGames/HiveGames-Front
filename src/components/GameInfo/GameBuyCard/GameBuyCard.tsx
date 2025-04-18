import React from 'react';
import PromoBloc from '../../CustomBloc/PromoBloc/PromoBloc';
import { calculateDiscount } from '../../../utils/calculateDiscount';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { translate } from '../../../utils/translations';
import './GameBuyCard.css';


interface GameBuyCardProps {
    name: string;
    oldPrice: number;
    price: number;
}

export const GameBuyCard: React.FC<GameBuyCardProps> = ({ name, oldPrice, price }) => {
    return (
        <div className='game-buy-card-container'>
            <div className='game-buy-card-content'>
                <div className='game-buy-card__title'>
                    <h3>{capitalizeFirstLetter(name)}</h3>
                </div>
                {oldPrice !== 0 && (
                    <div className='game-buy-card__description'>
                        <p>{translate('weekend_deal')}</p>
                    </div>
                )}
            </div>
            <div className='game-buy-card-content__price'>
                <PromoBloc
                    discount={calculateDiscount(oldPrice || 0, price)}
                    originalPrice={oldPrice || 0}
                    discountedPrice={price}
                />
            </div>
        </div>
    );
};
