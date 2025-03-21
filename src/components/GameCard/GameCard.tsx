import React from 'react';
import './GameCard.css';
import Category from "../CustomBloc/CategoryBloc/Category.tsx";
import PromoBloc from "../CustomBloc/PromoBloc/PromoBloc.tsx";
import ProgressBar from "../ui/ProgressBar/ProgressBar.tsx";
import image from '@assets/images/image 49.png';
import {Game} from "../../types/Game.ts";

interface RectangleCardProps {
    game: Game;
}

const GameCard: React.FC<RectangleCardProps> = ({game}) => {
    // TODO: Modifier le useState
    const [data] = React.useState<{tag: string[]}>({
        tag: ['New', 'Action', 'Adventure', 'Indie', 'RPG', 'Strategy', 'Simulation', 'Casual']
    });

    return (
        <div className={'game-card'}>
            <div className={'game-card-image'}>
                <img src={image} alt={game.name}/>
            </div>
            <div className={'game-card-content'}>
                <div className={'game-card-content-title'}>
                    <h1>Fallout 4</h1>
                </div>
                <div className={'game-card-content-tag'}>
                    <Category category={data.tag}/>
                </div>
                <div className={'game-card-content-data'}>
                    <div className={'game-card-content-progress-bar'}>
                        <ProgressBar leftPercentValue={50} />
                    </div>
                    <div className={'game-card-content-price'}>
                        <PromoBloc
                            expiryDate={'2022-12-31'}
                            discount={10}
                            originalPrice={100}
                            discountedPrice={90}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameCard;