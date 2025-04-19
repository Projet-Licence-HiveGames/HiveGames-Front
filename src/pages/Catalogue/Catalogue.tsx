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
import toast from "react-hot-toast";

export const Catalogue: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
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
    setIsLoading(true);
    await fetchAPI.post<Game[]>("/games", filters)
    .then(
      (games) => setGameList(games.map((game) => {
        const collection = user?.game_collections?.find((c) => c.game_id === game.id);
        return {
          ...game,
          is_wished: collection?.is_wished || false,
          is_owned: collection?.is_owned || false,
          be_notified: collection?.be_notified || false,
        };
      }))
    ).catch(() => toast.error("Erreur lors de la récupération des jeux"));
    setIsLoading(false);
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
