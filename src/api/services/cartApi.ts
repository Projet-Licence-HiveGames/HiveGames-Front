import { Game } from "../../types/Game";
import { useFetch } from "../privateApi";

export const useCartGameApi = () => {
  const api = useFetch();

  const fetchCartGames = async (): Promise<Game[]> => {
    const response = await api.get<Game[]>("/cart/list");
    if (!response) {
      throw new Error("Failed to fetch cart games.");
    }
    return response;
  };

  const addGamesToCart = async (gameIds: number): Promise<void> => {
    if (!gameIds) {
      throw new Error("At least one game ID is required to add to the cart.");
    }
    await api.post<void>("/cart/add", { gameIds });
  };

  const clearCartOnServer = async (gameIds?: number[]): Promise<void> => {
    if (!gameIds) {
      throw new Error("gameIds must be an array of numbers.");
    }
    await api.post<void>("/cart/clear", { gameIds });
  };

  const fetchCartGamesByIds = async (ids: number[]): Promise<Game[]> => {
    return await api.post<Game[]>("/games/filter", { ids });
  };

  const fetchOrderDetails = async (sessionId: string): Promise<any> => {
    if (!sessionId) {
      throw new Error("Session ID is required to fetch order details.");
    }

    return await api.get<any>(`/stripe/order/${sessionId}`);
  };

  return {
    fetchCartGames,
    addGamesToCart,
    clearCartOnServer,
    fetchCartGamesByIds,
    fetchOrderDetails,
  };
};
