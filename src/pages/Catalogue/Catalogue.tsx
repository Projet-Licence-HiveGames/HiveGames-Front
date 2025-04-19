import React, { useEffect, useState } from "react";

import { useFetch } from "../../api/privateApi.ts";
import FilterSidebar, {
  GameFilter,
} from "../../components/Catalog/FilterSidebar/FilterSidebar.tsx";
import GameCard from "../../components/GameCard/GameCard.tsx";
import GameCardSkeleton from "../../components/GameCard/GameCardSkeleton.tsx";
import { useAuth } from "../../context/AuthProvider.tsx";
import { Game } from "../../types/Game.ts";

import "./Catalogue.css";

export const Catalogue: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const fetchAPI = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<GameFilter>({
    search: "",
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 101 },
    order_by: "rating-desc",
  });
  const [gameList, setGameList] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      await fetchAPI.post<Game[]>("/games", filters).then(setGameList);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux :", error);
    } finally {
      setIsLoading(false);
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
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => <GameCardSkeleton key={index} />)
          : gameList.map((game, index) => (
              <GameCard
                key={index}
                game={game}
                isAuthenticated={isAuthenticated}
              />
            ))}
      </div>
      <FilterSidebar filters={filters} setFilters={setFilters} />
    </div>
  );
};
