import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useFetch } from "../../api/privateApi.ts";
import FilterSidebar, {
  GameFilter,
} from "../../components/Catalog/FilterSidebar/FilterSidebar.tsx";
import GameCard from "../../components/GameCard/GameCard.tsx";
import { GameCardSkeleton } from "../../components/Skeleton/GameCard/GameCardSkeleton.tsx";
import { useAuth } from "../../context/AuthProvider";
import { findGameCollection, GameBaseType } from "../../types/Game.ts";

import "./Catalog.css";

export const Catalog: FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchAPI = useFetch();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<GameFilter>({
    search: "",
    only_promoted: false,
    categories: [],
    languages: [],
    features: [],
    prices: { min: 0, max: 101 },
    order_by: "rating-desc",
  });
  const [gameList, setGameList] = useState<GameBaseType[]>([]);

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    await fetchAPI
      .post<GameBaseType[]>("/games/filter", filters)
      .then((games) =>
        setGameList(
          games.map((game) => {
            const collection = findGameCollection(game.id, user);
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
    const params = Object.fromEntries(searchParams.entries());
    const newFilters: GameFilter = {
      search: params.search || "",
      only_promoted: params.only_promoted === "true",
      categories: params.categories
        ? params.categories
            .split(",")
            .filter((id) => !isNaN(parseInt(id)))
            .map(Number)
        : [],
      languages: params.languages
        ? params.languages
            .split(",")
            .filter((id) => !isNaN(parseInt(id)))
            .map(Number)
        : [],
      features: params.features
        ? params.features
            .split(",")
            .filter((id) => !isNaN(parseInt(id)))
            .map(Number)
        : [],
      prices: {
        min:
          params.min && !isNaN(parseInt(params.min)) ? parseInt(params.min) : 0,
        max:
          params.max && !isNaN(parseInt(params.max))
            ? parseInt(params.max)
            : 101,
      },
      order_by: params.order_by || "rating-desc",
    };
    setFilters(newFilters);
  }, []);

  // Synchronize filters to URL
  useEffect(() => {
    const newParams: any = {
      ...(filters.search && { search: filters.search }),
      ...(filters.only_promoted && { only_promoted: true }),
      ...(filters.categories.length && {
        categories: filters.categories.join(","),
      }),
      ...(filters.languages.length && {
        languages: filters.languages.join(","),
      }),
      ...(filters.features.length && { features: filters.features.join(",") }),
      ...(filters.prices.min !== 0 && { min: filters.prices.min.toString() }),
      ...(filters.prices.max !== 101 && { max: filters.prices.max.toString() }),
      ...(filters.order_by !== "rating-desc" && { order_by: filters.order_by }),
    };
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (!user) return;
    const timeoutId = setTimeout(async () => {
      await fetchGames();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters, user]);

  const renderedGames = useMemo(() => {
    return isLoading
      ? Array(10)
          .fill(0)
          .map((_, index) => <GameCardSkeleton key={index} />)
      : gameList.map((game, index) => (
          <GameCard game={game} isAuthenticated={isAuthenticated} key={index} />
        ));
  }, [isLoading, gameList, isAuthenticated]);

  return (
    <div className="catalog-container">
      <div className="catalog-container-cards">{renderedGames}</div>
      <FilterSidebar filters={filters} setFilters={setFilters} />
    </div>
  );
};
