import { useContext, useMemo } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";

export const privateApi = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body: any = null,
    headers: Record<string, string> = {}
): Promise<T> => {
    const url = `${import.meta.env.HIVEGAMES_BACKEND_API}${endpoint}`;

    const defaultOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials: 'include',
    };

    if (body) {
        defaultOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }

    return await response.json() as T;
};

export type APIOptions = { withAuth?: boolean } & RequestInit;
export type RequestInitWithHeaders = RequestInit & {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  headers?: { [key: string]: any };
};

export const useFetch = () => {
    const { logout } = useContext(AuthContext);
  
    const wrapFetch = ({ headers, ...requestOptions }: RequestInit) => {
      return async (
        path: string,
        body?: any,
        { withAuth, ...options }: APIOptions = { withAuth: true },
      ) => {
        const buildOptions: RequestInitWithHeaders = {
          ...options,
          ...requestOptions,
        };
        buildOptions.headers = { ...buildOptions.headers, ...headers };
        if (body) {
          if (body instanceof FormData) {
            buildOptions.body = body;
          } else {
            buildOptions.body = JSON.stringify(body);
            buildOptions.headers = {
              ...buildOptions.headers,
              ...{
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              credentials: 'include'
            };
          }
        }
        const url = `${import.meta.env.HIVEGAMES_BACKEND_API}${path}`;
  
        if (withAuth ?? true) {
          // const token =
          //   access_token == null || tokenHasExpired(access_token)
          //     ? await refresh()
          //     : access_token;
  
          // if (token == null) {
          //   return new Response(null, { status: 401 });
          // }
          // buildOptions.headers.Authorization = `Bearer ${token}`;
  
          return fetch(url, buildOptions).then((res) =>
            handleResponse(res, async () => {
              // if (buildOptions?.headers?.Authorization) {
              //   buildOptions.headers.Authorization = `Bearer ${await refresh()}`;
              // }
              return fetch(url, buildOptions).then(handleResponse);
            }),
          );
        }
  
        return fetch(url, buildOptions).then(handleResponse);
      };
    };
  
    const handleResponse = async (
      response: Response,
      retry?: () => Promise<Response>,
    ) => {
      if (!response.ok) {
        if (response.status == 401) {
          if (retry) {
            return await retry();
          }
          logout();
        } else if (response.status >= 500) {
          toast.error(
            'Service momentanément indisponible. Veuillez réessayer plus tard',
          );
        }
        throw new Error(await response.text());
      }
      return response;
    };
  
    return useMemo(
      () => ({
        get: wrapFetch({ method: 'GET' }),
        post: wrapFetch({ method: 'POST' }),
        put: wrapFetch({ method: 'PUT' }),
        patch: wrapFetch({ method: 'PATCH' }),
        delete: wrapFetch({ method: 'DELETE' }),
      }),
      [], // eslint-disable-line  react-hooks/exhaustive-deps
    );
  };
