'use client';

import { useEffect, useRef } from 'react';

import { useWebSocketClient } from './use-websocket-client';

import type { WebSocketMessageHandler } from './types';

type UseWebSocketSubscriptionOptions = {
    enabled?: boolean;
};

export function useWebSocketSubscription(
    destination: string,
    handler: WebSocketMessageHandler,
    options: UseWebSocketSubscriptionOptions = {},
) {
    const { enabled = true } = options;
    const { subscribe } = useWebSocketClient();
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        return subscribe(destination, message => {
            handlerRef.current(message);
        });
    }, [destination, enabled, subscribe]);
}
