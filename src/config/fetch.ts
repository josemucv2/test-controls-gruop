/* eslint-disable @typescript-eslint/no-explicit-any */

type PropsFetch = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    options?: RequestInit;
    timeOut?: number;
    body?: unknown;
};

export type CustomPromises<T> = Promise<
    Response & {
        data: T;
    }
>;

/**
 * Objeto de propiedades para realizar solicitudes fetch.
 * @param url - La URL a la que se enviará la solicitud.
 * @param method - El método HTTP para la solicitud (GET, POST, PUT, DELETE).
 * @param options - Opciones adicionales para la solicitud fetch.
 * @param timeOut - Tiempo de espera para la solicitud en milisegundos.
 * @param body - Cuerpo de la solicitud, si corresponde.
 */

class HTTP {

    private static instance: HTTP

    private constructor() { }

    public static getInstance(): HTTP {
        if (!HTTP.instance) {
            HTTP.instance = new HTTP();
        }
        return HTTP.instance;
    }

    private async _request<T>({ url, method, options = {}, body, timeOut = 1000000 }: PropsFetch): Promise<T> {
        const { signal, abort } = new AbortController();
        const timeoutId = setTimeout(() => abort(), timeOut);


        const defaultHeaders = {
            'Content-Type': 'application/json',
        };

        const requestOptions = {
            ...options,
            signal,
            headers: { ...defaultHeaders, ...(options.headers || {}) },
            method,
            body: method === 'PUT' || method === 'POST' || method === 'DELETE' ? JSON.stringify(body) : undefined,
        };

        const isCompleteURL = /^https?:\/\//i.test(url);
        const requestURL = isCompleteURL ? url : `${import.meta.env.VITE_BASE_URL}${url}`;

        try {
            const response = await fetch(requestURL, requestOptions);
            clearTimeout(timeoutId);
            const responseData = await response.json();
            if (!response.ok) {
                throw { ...responseData, status: response.status };
            }

            return responseData;
        } catch (error: any) {
            clearTimeout(timeoutId);
            throw error;
        }
    }

    async get<T>(url: string, options?: RequestInit) {
        return await this._request<T>({ url, method: 'GET', options });
    }

    async post<T>(url: string, body: unknown, options?: RequestInit) {
        return await this._request<T>({ url, method: 'POST', body, options });
    }

    async put<T>(url: string, body: unknown, options?: RequestInit) {
        return await this._request<T>({ url, method: 'PUT', body, options });
    }

    async delete(url: string, options?: RequestInit) {
        return await this._request({ url, method: 'DELETE', options });
    }
}

export default HTTP

