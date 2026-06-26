'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { StompConnection } from './stomp-connection';

import type { WebSocketConnectionState, WebSocketContextValue } from './types';

export const WebSocketContext = createContext<WebSocketContextValue | null>(null);

type WebSocketProviderProps = {
    children: React.ReactNode;
    accessToken: string | null;
};

export function WebSocketProvider({ children, accessToken }: WebSocketProviderProps) {
    const [connection] = useState(() => new StompConnection());
    const [connectionState, setConnectionState] = useState<WebSocketConnectionState>('idle');

    useEffect(() => {
        return connection.onStateChange(setConnectionState);
    }, [connection]);

    useEffect(() => {
        if (!accessToken) {
            connection.disconnect();
            return;
        }

        connection.connect();

        return () => {
            connection.disconnect();
        };
    }, [accessToken, connection]);

    const subscribe = useCallback<WebSocketContextValue['subscribe']>(
        (destination, handler) => connection.subscribe(destination, handler),
        [connection],
    );

    const value = useMemo<WebSocketContextValue>(
        () => ({
            connectionState,
            subscribe,
        }),
        [connectionState, subscribe],
    );

    return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}
