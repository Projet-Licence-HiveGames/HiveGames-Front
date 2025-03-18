import React from 'react';
import './Catalogue.css';
import RectangleCard from "../../components/RectangleCatalogueCard/RectangleCard.tsx";
import {Game} from "../../types/Game.ts";

export const Catalogue: React.FC = () => {
    const [gameList, setGameList] = React.useState<Game[]>([
        {id: 1, name: 'Game 1'},
        {id: 2, name: 'Game 2'},
        {id: 3, name: 'Game 3'},
        {id: 4, name: 'Game 4'},
        {id: 5, name: 'Game 5'},
        {id: 6, name: 'Game 6'},
        {id: 7, name: 'Game 7'},
    ]);

    return (
        <div className="catalog-container">
            <div className="catalog-container-cards">
                {gameList.map((game, index) => (
                    <RectangleCard key={index} game={game} />
                ))}
            </div>
        </div>
    );
};
