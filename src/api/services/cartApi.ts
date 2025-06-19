import { Game } from "@customTypes/Game.ts";

import { useFetch } from "../privateApi";

import { StripeOrderType } from "@/types/StripeOrderType.ts";

export const useCartGameApi = () => {
  const api = useFetch();

  const fetchCartGames = async (): Promise<number[]> => {
    const response = await api.get<number[]>("/cart/list");
    if (!response) {
      throw new Error("Failed to fetch cart games.");
    }
    return response;
  };

  const addGamesToCart = async (gameIds: number[]): Promise<void> => {
    if (!gameIds) {
      throw new Error("At least one game ID is required to add to the cart.");
    }
    await api.post("/cart/add", { gameIds });
  };

  const clearCartOnServer = async (gameIds?: number[]): Promise<void> => {
    await api.post("/cart/clear", { gameIds });
  };

  const fetchCartGamesByIds = async (ids: number[]): Promise<Game[]> => {
    return await api.post<Game[]>("/games/filter", { ids });
  };

  const fetchOrderDetails = async (sessionId: string): Promise<any> => {
    if (!sessionId) {
      throw new Error("Session ID is required to fetch order details.");
    }

    return await api.get<StripeOrderType>(`/stripe/order/${sessionId}`);
  };

  return {
    fetchCartGames,
    addGamesToCart,
    clearCartOnServer,
    fetchCartGamesByIds,
    fetchOrderDetails,
  };
};
