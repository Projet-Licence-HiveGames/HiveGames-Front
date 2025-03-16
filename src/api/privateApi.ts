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
