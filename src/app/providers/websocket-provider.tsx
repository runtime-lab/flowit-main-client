'use client';

import { useAuthStore } from '@entities/session';

import { WebSocketProvider as SharedWebSocketProvider } from '@shared/api/ws';

type WebSocketProviderProps = {
    children: React.ReactNode;
};

export function WebSocketProvider({ children }: WebSocketProviderProps) {
    const accessToken = useAuthStore(state => state.accessToken);

    return <SharedWebSocketProvider accessToken={accessToken}>{children}</SharedWebSocketProvider>;
}
