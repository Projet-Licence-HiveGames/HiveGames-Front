import React from 'react';
import { Game } from '../../../types/Game';

interface GameLanguagesProps {
    game: Game;
}

const GameLanguages = ({ game }: GameLanguagesProps) => {
    return (
        <div className="game-languages">
            <h2>{translate('languages')}</h2>
        </div>
    );
};

export default GameLanguages;
