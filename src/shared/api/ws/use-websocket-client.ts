'use client';

import { useContext } from 'react';

import { WebSocketContext } from './websocket-context';

export function useWebSocketClient() {
    const context = useContext(WebSocketContext);

    if (!context) {
        throw new Error('useWebSocketClient must be used within WebSocketProvider.');
    }

    return context;
}
