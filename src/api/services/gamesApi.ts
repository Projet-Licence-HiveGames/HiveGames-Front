import {
  GameBaseType,
  GameCategory,
  GameFeature,
  GameLanguage,
} from "@customTypes/Game.ts";

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

  const fetchCategories = async (): Promise<GameCategory[]> => {
    return await api.get<GameCategory[]>("/games/top-categories");
  };

  const fetchLanguages = async (): Promise<GameLanguage[]> => {
    return await api.get<GameLanguage[]>("/games/filter/languages");
  };

  const fetchFeatures = async (): Promise<GameFeature[]> => {
    return await api.get<GameFeature[]>("/games/filter/features");
  };

  return {
    fetchGamesByIds,
    fetchCategories,
    fetchLanguages,
    fetchFeatures,
  };
};
