import { ApiError } from './api-error';
import { isApiErrorResponse, isApiSuccessResponse } from './parse-api-error';

import { getAccessToken, refreshAccessTokenFromProvider } from '@shared/lib/auth';

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown;
    skipAuth?: boolean;
    isRetry?: boolean;
};

function buildAuthHeaders(skipAuth?: boolean): Record<string, string> {
    if (skipAuth) {
        return {};
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
        return {};
    }

    return {
        Authorization: `Bearer ${accessToken}`,
    };
}

function serializeRequestBody(body: RequestOptions['body']): BodyInit | undefined {
    if (body === undefined) {
        return undefined;
    }

    if (body instanceof FormData) {
        return body;
    }

    return JSON.stringify(body);
}

function buildRequestHeaders(body: RequestOptions['body'], skipAuth?: boolean, headers?: HeadersInit) {
    return {
        Accept: 'application/json',
        ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...buildAuthHeaders(skipAuth),
        ...headers,
    };
}

async function executeBlobRequest(path: string, options: RequestOptions): Promise<Blob> {
    const { body, headers, skipAuth, ...rest } = options;

    let response: Response;

    try {
        response = await fetch(path, {
            ...rest,
            credentials: 'include',
            headers: {
                ...buildAuthHeaders(skipAuth),
                ...headers,
            },
            body: serializeRequestBody(body),
        });
    } catch (cause) {
        const message = cause instanceof Error ? cause.message : 'Network request failed';

        throw new ApiError(message, 0, null);
    }

    if (!response.ok) {
        const responseBody: unknown = await response.json().catch(() => null);
        const message = isApiErrorResponse(responseBody) ? responseBody.error.message : 'API request failed';

        throw new ApiError(message, response.status, responseBody);
    }

    return response.blob();
}

async function executeRequest<TData>(path: string, options: RequestOptions): Promise<TData> {
    const { body, headers, skipAuth, ...rest } = options;

    let response: Response;

    try {
        response = await fetch(path, {
            ...rest,
            credentials: 'include',
            headers: buildRequestHeaders(body, skipAuth, headers),
            body: serializeRequestBody(body),
        });
    } catch (cause) {
        const message = cause instanceof Error ? cause.message : 'Network request failed';

        throw new ApiError(message, 0, null);
    }

    const responseBody: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const message = isApiErrorResponse(responseBody) ? responseBody.error.message : 'API request failed';

        throw new ApiError(message, response.status, responseBody);
    }

    if (!isApiSuccessResponse<TData>(responseBody)) {
        throw new ApiError('Invalid API response', response.status, responseBody);
    }

    return responseBody.data;
}

async function requestWithAuthRetry<TData>(
    path: string,
    options: RequestOptions,
    execute: (path: string, options: RequestOptions) => Promise<TData>,
): Promise<TData> {
    const { isRetry, skipAuth, ...requestOptions } = options;

    try {
        return await execute(path, { ...requestOptions, skipAuth, isRetry });
    } catch (error) {
        const shouldRefresh = error instanceof ApiError && error.status === 401 && !skipAuth && !isRetry;

        if (!shouldRefresh) {
            throw error;
        }

        const accessToken = await refreshAccessTokenFromProvider();

        if (!accessToken) {
            throw error;
        }

        return requestWithAuthRetry(path, { ...requestOptions, skipAuth, isRetry: true }, execute);
    }
}

export async function apiRequest<TData>(path: string, options: RequestOptions = {}): Promise<TData> {
    return requestWithAuthRetry<TData>(path, options, (requestPath, requestOptions) =>
        executeRequest<TData>(requestPath, requestOptions),
    );
}

export async function apiBlobRequest(path: string, options: RequestOptions = {}): Promise<Blob> {
    return requestWithAuthRetry(path, options, executeBlobRequest);
}
