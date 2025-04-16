import React from 'react';
import { Game } from '../../../types/Game';
import PromoBloc from '../../CustomBloc/PromoBloc/PromoBloc';
import { calculateDiscount } from '../../../utils/calculateDiscount';
import './GameBuyCard.css';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
interface GameBuyCardProps {
    game: Game;
}

export const GameBuyCard: React.FC<GameBuyCardProps> = ({ game }) => {
    return (
        <div className='game-buy-card-container'>
            <div className='game-buy-card-content'>
                <div className='game-buy-card__title'>
                    <h3>{capitalizeFirstLetter(game.name)}</h3>
                </div>
                {game.oldPrice &&game.oldPrice !== 0 && (
                    <div className='game-buy-card__description'>
                        <p>WEEKEND DEAL! Offer ends 19 October</p>
                    </div>
                )}
            </div>
            <div className='game-buy-card-content__price'>
                <PromoBloc
                    discount={calculateDiscount(game.oldPrice || 0, game.price)}
                    originalPrice={game.oldPrice || 0}
                    discountedPrice={game.price}
                />
            </div>
        </div>
    );
};
