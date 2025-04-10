import React, { Suspense, useEffect } from "react";
import "./Catalogue.css";
import GameCard from "../../components/GameCard/GameCard.tsx";
import FilterSidebar, {
  GameFilter,
} from "../../components/Catalog/FilterSidebar/FilterSidebar.tsx";
import { Game } from "../../types/Game.ts";
import { useFetch } from "../../api/privateApi.ts";
import GameCardSkeleton from "../../components/GameCard/GameCardSkeleton.tsx";

export const Catalogue: React.FC = () => {
  const fetchAPI = useFetch();
  const [filters, setFilters] = React.useState<GameFilter>({
    search: "",
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 101 },
  });
  const [gameList, setGameList] = React.useState<Game[]>([
    // { id: 1, name: "Game 1", price: 100, oldPrice: 200 },
    // { id: 2, name: "Game 2", price: 200, oldPrice: 0 },
    // { id: 3, name: "Game 3", price: 300, oldPrice: 350 },
    // { id: 4, name: "Game 4", price: 400, oldPrice: 420 },
    // { id: 5, name: "Game 5", price: 500 },
    // { id: 6, name: "Game 6", price: 600 },
    // { id: 7, name: "Game 7", price: 700 },
    // { id: 8, name: "Game 8", price: 800 },
    // { id: 9, name: "Game 9", price: 900 },
    // { id: 10, name: "Game 10", price: 1000 },
  ]);

  const fetchGames = async () => {
    try {
      await fetchAPI.post<Game[]>("/games", filters).then(setGameList);
    }
    catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      fetchGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  return (
    <div className="catalog-container">
      <div className="catalog-container-cards">
        <Suspense fallback={<GameCardSkeleton />}>
          {gameList.map((game, index) => (
            <GameCard key={index} game={game} />
          ))}
        </Suspense>
      </div>
      <FilterSidebar filters={filters} setFilters={setFilters} />
    </div>
  );
};
