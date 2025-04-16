import React from 'react';
import { Game } from '../../../types/Game';
import './GameFeatures.css';
import { translate } from '../../../utils/translations';
import { translateFeature, featureIcons } from '../../../constants/FeaturesDict';
interface GameFeaturesProps {
    game: Game['features'];
}

export const GameFeatures: React.FC<GameFeaturesProps> = ({ game }) => {

    return (
        <div className='game-features-container'>
            <div className='game-features__title'>
                <h2>{translate('features')}</h2>
            </div>
            <div className='game-features__list'>
                {game?.map((feature, index) => (
                    <div className='game-features__list-item' key={index}>
                        <div className='game-features__list-item__icon'>
                            {featureIcons[feature.label as keyof typeof featureIcons]}
                        </div>
                        <div className='game-features__list-item__title'>
                            <h3>{translateFeature(feature.label as keyof typeof featureIcons)}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


