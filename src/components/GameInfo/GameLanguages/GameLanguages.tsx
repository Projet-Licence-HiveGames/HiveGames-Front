import React from 'react';
import { Game } from '../../../types/Game';
import { translate } from '../../../utils/translations';
interface GameLanguagesProps {
    game: Game['languages'];
}

export const GameLanguages = ({ game }: GameLanguagesProps) => {
    return (
        <div className="game-languages">
            <h2>{translate('languages')}</h2>
        </div>
    );
};
