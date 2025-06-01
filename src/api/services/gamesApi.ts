import { Game } from "../../types/Game";
import { useFetch } from "../privateApi";

export const useGamesApi = () => {
  const api = useFetch();

  const fetchGamesByIds = async (ids: number[]): Promise<Game[]> => {
    return await api.post<Game[]>("/games", { ids });
  };

  const fetchCategories = async (): Promise<string[]> => {
    return await api.get<string[]>("/games/categories");
  };

  const fetchLanguages = async (): Promise<string[]> => {
    return await api.get<string[]>("/games/languages");
  };

  const fetchFeatures = async (): Promise<string[]> => {
    return await api.get<string[]>("/games/features");
  };

  return {
    fetchGamesByIds,
    fetchCategories,
    fetchLanguages,
    fetchFeatures,
  };
};
