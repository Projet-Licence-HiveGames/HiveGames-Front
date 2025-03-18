import React from 'react';
import './RectangleCard.css';
import Category from "../CustomBloc/CategoryBloc/Category.tsx";
import PromoBloc from "../CustomBloc/PromoBloc/PromoBloc.tsx";
import ProgressBar from "../ui/progressBar/ProgressBar.tsx";
import image from '@assets/images/image 49.png';
import {Game} from "../../types/Game.ts";

interface RectangleCardProps {
    game: Game;
}

const RectangleCard: React.FC<RectangleCardProps> = ({game}) => {
    // TODO: Modifier le useState
    const [data] = React.useState<{tag: string[]}>({
        tag: ['New', 'Action', 'Adventure', 'Indie']
    });

    return (
        <div className={'rectangle-card'}>
            <div className={'rectangle-card-image'}>
                <img src={image} alt={game.name}/>
            </div>
            <div className={'rectangle-card-content'}>
                <div className={'rectangle-card-content-title'}>
                    <h1>{game.name}</h1>
                </div>
                <div className={'rectangle-card-content-tag'}>
                    <Category category={data.tag}/>
                </div>
                <div className={'rectangle-card-content-data'}>
                    <div className={'rectangle-card-content-progress-bar'}>
                        <ProgressBar leftPercentValue={50} />
                    </div>
                    <div className={'rectangle-card-content-price'}>
                        <PromoBloc
                            expiryDate={'2022-12-31'}
                            discount={10}
                            originalPrice={100}
                            discountedPrice={90}
                            onAddToCart={() => console.log('Add to cart')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RectangleCard;