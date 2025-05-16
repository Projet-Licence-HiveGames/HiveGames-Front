import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useFetch } from "../../api/privateApi.ts";
import FilterSidebar, {
  GameFilter,
} from "../../components/Catalog/FilterSidebar/FilterSidebar.tsx";
import GameCard from "../../components/GameCard/GameCard.tsx";
import { GameCardSkeleton } from "../../components/Skeleton/GameCard/GameCardSkeleton.tsx";
import { useAuth } from "../../context/AuthProvider";
import { Game } from "../../types/Game.ts";

import "./Catalog.css";

export const Catalog: React.FC = () => {
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

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    await fetchAPI
      .post<Game[]>("/games", filters)
      .then((games) =>
        setGameList(
          games.map((game) => {
            const collection = user?.game_collections?.find(
              (c) => c.game_id === game.id,
            );
            return {
              ...game,
              is_wished: collection?.is_wished || false,
              is_owned: collection?.is_owned || false,
              be_notified: collection?.be_notified || false,
            };
          }),
        ),
      )
      .catch(() => toast.error("Erreur lors de la récupération des jeux"));
    setIsLoading(false);
  }, [filters, fetchAPI, user?.game_collections]);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      fetchGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const renderedGames = useMemo(() => {
    return isLoading
      ? Array(10)
          .fill(0)
          .map((_, index) => <GameCardSkeleton key={index} />)
      : gameList.map((game, index) => (
          <GameCard key={index} game={game} isAuthenticated={isAuthenticated} />
        ));
  }, [isLoading, gameList, isAuthenticated]);

  return (
    <div className="catalog-container">
      <div className="catalog-container-cards">{renderedGames}</div>
      <FilterSidebar filters={filters} setFilters={setFilters} />
    </div>
  );
};
