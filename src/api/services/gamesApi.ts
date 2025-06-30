import { GameBaseType, GameCategory, GameType } from "@customTypes/Game.ts";

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

  const fetchSearchGamesByName = async (
    search: string,
  ): Promise<GameType[]> => {
    return await api.get<GameType[]>(
      `/games/search/${encodeURIComponent(search)}`,
    );
  };

  const fetchTopCategories = async (): Promise<GameCategory[]> => {
    return await api.get<GameCategory[]>("/games/top-categories");
  };

  const fetchWeeklyGames = async (): Promise<GameBaseType[]> => {
    return await api.get<GameBaseType[]>("/games/week");
  };

  const fetchGameById = async ({
    id,
  }: {
    id: number;
  }): Promise<GameBaseType> => {
    return await api.get<GameBaseType>(`/games/${id}`);
  };

  return {
    fetchGamesByIds,
    fetchSearchGamesByName,
    fetchTopCategories,
    fetchWeeklyGames,
    fetchGameById,
  };
};
