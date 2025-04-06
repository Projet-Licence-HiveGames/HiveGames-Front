import React from 'react';
import './GameCard.css';
import Category from "../CustomBloc/CategoryBloc/Category.tsx";
import PromoBloc from "../CustomBloc/PromoBloc/PromoBloc.tsx";
import ProgressBar from "../ui/ProgressBar/ProgressBar.tsx";
import image from '@assets/images/image 49.png';
import { Game } from "../../types/Game.ts";

interface RectangleCardProps {
    game: Game;
}

const GameCard: React.FC<RectangleCardProps> = ({ game }) => {
    // TODO: Modifier le useState
    const [data] = React.useState<{ tag: string[] }>({
        tag: ['New', 'Action', 'Adventure', 'Indie', 'RPG', 'Strategy', 'Simulation', 'Casual']
    });

    const calculateDiscount = (originalPrice: number, discountedPrice: number) => {
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }

    return (
        <div className={'game-card'}>
            <div className={'game-card-image'}>
                <img src={image} alt={game.name} />
                <div className={'game-card-content-progress-bar'}>
                    <ProgressBar leftPercentValue={50} />
                </div>
            </div>
            <div className={'game-card-content'}>
                <div className={'game-card-content-title'}>
                    <h1>{game.name}</h1>

                </div>

                <div className={'game-card-content-data'}>
                    <div className={'game-card-content-tag'}>
                        <Category category={data.tag} />
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
        </div>
    );
}

export default GameCard;