import { useContext } from "react";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthProvider";

export type APIOptions = RequestInit & { withAuth?: boolean };

export const useFetch = () => {
  const { logout } = useContext(AuthContext);

  const fetchData = async <T>(
    path: string,
    { headers = {}, body, ...options }: APIOptions = {},
  ): Promise<T> => {
    const url = `${import.meta.env.HIVEGAMES_BACKEND_API}${path}`;

    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    };

    const fetchOptions: RequestInit = {
      ...options,
      headers: requestHeaders,
      credentials: "include",
    };

    if (body) {
      fetchOptions.body =
        body instanceof FormData ? body : JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    return handleResponse<T>(response);
  };

  const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      } else if (response.status >= 500) {
        toast.error(
          "Service momentanément indisponible. Veuillez réessayer plus tard",
        );
      }
      throw response;
    }
    return response.json();
  };

  return {
    get: <T>(path: string, options?: APIOptions) =>
      fetchData<T>(path, { method: "GET", ...options }),
    post: <T>(path: string, body?: any, options?: APIOptions) =>
      fetchData<T>(path, { method: "POST", body, ...options }),
    put: <T>(path: string, body?: any, options?: APIOptions) =>
      fetchData<T>(path, { method: "PUT", body, ...options }),
    patch: <T>(path: string, body?: any, options?: APIOptions) =>
      fetchData<T>(path, { method: "PATCH", body, ...options }),
    delete: <T>(path: string, options?: APIOptions) =>
      fetchData<T>(path, { method: "DELETE", ...options }),
  };
};
