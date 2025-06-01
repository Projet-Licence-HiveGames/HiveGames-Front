import { Game } from "../../types/Game";
import { useFetch } from "../privateApi";

export const useCartGameApi = () => {
  const api = useFetch();

  const fetchCartGamesByIds = async (ids: number[]): Promise<Game[]> => {
    return await api.post<Game[]>("/games", { ids });
  };

  const fetchOrderDetails = async (sessionId: string): Promise<any> => {
    if (!sessionId) {
      throw new Error("Session ID is required to fetch order details.");
    }
    return await api.get<any>(`/stripe/order/${sessionId}`);
  };

  return {
    fetchCartGamesByIds,
    fetchOrderDetails,
  };
};
