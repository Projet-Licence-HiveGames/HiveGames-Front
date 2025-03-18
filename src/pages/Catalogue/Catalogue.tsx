import React from 'react';
import './Catalogue.css';
import GameCard from "../../components/GameCard/GameCard.tsx";
import FilterSidebar, { GameFilter } from '../../components/Catalog/FilterSidebar/FilterSidebar.tsx';
import { Game } from '../../types/Game.ts';

export const Catalogue: React.FC = () => {
  const [filters, setFilters] = React.useState<GameFilter>({
    search: '',
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 0 },
  });
  const [gameList, setGameList] = React.useState<Game[]>([
      {id: 1, name: 'Game 1'},
      {id: 2, name: 'Game 2'},
      {id: 3, name: 'Game 3'},
      {id: 4, name: 'Game 4'},
      {id: 5, name: 'Game 5'},
      {id: 6, name: 'Game 6'},
      {id: 7, name: 'Game 7'},
      {id: 8, name: 'Game 8'},
      {id: 9, name: 'Game 9'},
      {id: 10, name: 'Game 10'}
  ]);

  return (
    <div className="catalog-container">
        <div className="catalog-container-cards">
            {gameList.map((game, index) => (
                <GameCard key={index} game={game} />
            ))}
        </div>
        <FilterSidebar filters={filters} setFilters={setFilters}/>
    </div>
  );
};
