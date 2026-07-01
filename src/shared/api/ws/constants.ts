export const WS_PATH = '/ws';

export const WS_RECONNECT_DELAY_MS = 5_000;

const DEFAULT_WS_BASE_URL = 'ws://localhost:8080';

export function getWsBaseUrl(): string {
    const configuredBaseUrl = process.env.NEXT_PUBLIC_WS_BASE_URL ?? DEFAULT_WS_BASE_URL;

    return configuredBaseUrl.replace(/\/$/, '');
}

export function getWsBrokerUrl(): string {
    return `${getWsBaseUrl()}${WS_PATH}`;
}
