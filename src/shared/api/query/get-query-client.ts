import { defaultQueryClientOptions } from './default-query-client-options';
import { isServer, QueryClient } from '@tanstack/react-query';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: defaultQueryClientOptions,
    });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    }

    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
}
