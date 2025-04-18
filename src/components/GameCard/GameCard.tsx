import React from 'react';
import './GameCard.css';
import { Game } from '../../types/Game';
import Category from '../CustomBloc/CategoryBloc/Category';
import PromoBloc from "../CustomBloc/PromoBloc/PromoBloc";
import ProgressBar from "../ui/ProgressBar/ProgressBar";
import image from '@assets/images/image 49.png';
import { WishButton } from '../CustomBloc/WishButton/WishButton';
import { useAuth } from '../../context/AuthProvider';

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    const { isAuthenticated } = useAuth();
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }

    return (
        <div className={'game-card'}>
            <div className={'game-card-image'}>
                <img src={game.image?.[0] || image} alt={game.name} />
                <div className={'game-card-content-progress-bar'}>
                    <ProgressBar leftPercentValue={50} />
                </div>
            </div>
            <div className={'game-card-content'}>
                {isAuthenticated && <WishButton game={game} />}
                <div className={'game-card-content-title'}>
                    <a href={`/game/${game.id}`}><h3>{capitalizeFirstLetter(game.name)}</h3></a>
                </div>
                <div className={'game-card-content-category'}>
                    <Category category={game.categories?.map(category => category.label) || []} />
                </div>
                <div className={'game-card-content-price'}>
                    <PromoBloc
                        discount={calculateDiscount(game.oldPrice || 0, game.price)}
                        originalPrice={game.oldPrice || 0}
                        discountedPrice={game.price}
                    />
                </div>
            </div>
        </div>
    );
}

export default GameCard;
