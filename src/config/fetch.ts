/* eslint-disable @typescript-eslint/no-explicit-any */

enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

type PropsFetch = {
    url: string;
    method: METHODS;
    options?: RequestInit;
    timeOut?: number;
    body?: unknown;
};

export type CustomPromises<T> = Promise<
    Response & {
        data: T;
    }
>;

interface IServiceConsumer {
    get: <T>(url: string, options?: RequestInit) => Promise<T>
    post: <T>(url: string, body: unknown, options?: RequestInit) => Promise<T>
    put: <T>(url: string, body: unknown, options?: RequestInit) => Promise<T>
    delete: (url: string, options?: RequestInit) => Promise<unknown>

}


/**
 * Objeto de propiedades para realizar solicitudes fetch.
 * @param url - La URL a la que se enviará la solicitud.
 * @param method - El método HTTP para la solicitud (GET, POST, PUT, DELETE).
 * @param options - Opciones adicionales para la solicitud fetch.
 * @param timeOut - Tiempo de espera para la solicitud en milisegundos.
 * @param body - Cuerpo de la solicitud, si corresponde.
 */

class HTTP implements IServiceConsumer {

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
            body: method === METHODS.PUT || method === METHODS.POST || method === METHODS.DELETE ? JSON.stringify(body) : undefined,
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
        return await this._request<T>({ url, method: METHODS.GET, options });
    }

    async post<T>(url: string, body: unknown, options?: RequestInit) {
        return await this._request<T>({ url, method: METHODS.POST, body, options });
    }

    async put<T>(url: string, body: unknown, options?: RequestInit) {
        return await this._request<T>({ url, method: METHODS.PUT, body, options });
    }

    async delete(url: string, options?: RequestInit) {
        return await this._request({ url, method: METHODS.DELETE, options });
    }
}

export const HTTPS = HTTP.getInstance()

