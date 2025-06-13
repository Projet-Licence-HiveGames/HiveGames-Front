import { Game } from "../../types/Game";
import { useFetch } from "../privateApi";

export const useGamesApi = () => {
  const api = useFetch();

  const fetchGamesByIds = async ({
    ids,
  }: {
    ids: number[];
  }): Promise<Game[]> => {
    return await api.post<Game[]>("/games/filter", { ids });
  };

  const fetchCategories = async (): Promise<string[]> => {
    return await api.get<string[]>("/games/top-categories");
  };

  const fetchLanguages = async (): Promise<string[]> => {
    return await api.get<string[]>("/games/filter/languages");
  };

  const fetchFeatures = async (): Promise<string[]> => {
    return await api.get<string[]>("/games/filter/features");
  };

  return {
    fetchGamesByIds,
    fetchCategories,
    fetchLanguages,
    fetchFeatures,
  };
};
