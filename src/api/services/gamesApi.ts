import { GameBaseType, GameCategory } from "@customTypes/Game.ts";

import { useFetch } from "../privateApi";

export const useGamesApi = () => {
  const api = useFetch();

  const fetchGamesByIds = async ({
    ids,
  }: {
    ids: number[];
  }): Promise<GameBaseType[]> => {
    return await api.post<GameBaseType[]>("/games/filter", { ids });
  };

  const fetchTopCategories = async (): Promise<GameCategory[]> => {
    return await api.get<GameCategory[]>("/games/top-categories");
  };

  const fetchWeeklyGames = async (): Promise<GameBaseType[]> => {
    return await api.get<GameBaseType[]>("/games/week");
  };

  return {
    fetchGamesByIds,
    fetchTopCategories,
    fetchWeeklyGames,
  };
};
