import { getWsBrokerUrl, WS_RECONNECT_DELAY_MS } from './constants';
import { Client } from '@stomp/stompjs';

import { getAccessToken } from '@shared/lib/auth';

import type { WebSocketConnectionState, WebSocketMessage, WebSocketMessageHandler } from './types';
import type { IMessage, StompSubscription } from '@stomp/stompjs';

export class StompConnection {
    private client: Client | null = null;
    private handlers = new Map<string, Set<WebSocketMessageHandler>>();
    private stompSubscriptions = new Map<string, StompSubscription>();
    private state: WebSocketConnectionState = 'idle';
    private stateListeners = new Set<(state: WebSocketConnectionState) => void>();

    getState(): WebSocketConnectionState {
        return this.state;
    }

    onStateChange(listener: (state: WebSocketConnectionState) => void): () => void {
        this.stateListeners.add(listener);

        return () => {
            this.stateListeners.delete(listener);
        };
    }

    connect(): void {
        const accessToken = getAccessToken();

        if (!accessToken) {
            return;
        }

        if (this.client?.active) {
            return;
        }

        const client = new Client({
            brokerURL: getWsBrokerUrl(),
            connectHeaders: this.buildConnectHeaders(),
            reconnectDelay: WS_RECONNECT_DELAY_MS,
            beforeConnect: () => {
                client.connectHeaders = this.buildConnectHeaders();
            },
            onConnect: () => {
                this.setState('connected');
                this.syncStompSubscriptions();
            },
            onDisconnect: () => {
                this.setState('disconnected');
            },
            onStompError: () => {
                this.setState('disconnected');
            },
            onWebSocketClose: () => {
                if (!this.client?.active) {
                    this.setState('idle');
                }
            },
        });

        this.client = client;
        this.setState('connecting');
        client.activate();
    }

    disconnect(): void {
        if (!this.client) {
            this.setState('idle');
            return;
        }

        const client = this.client;
        this.client = null;
        this.clearStompSubscriptions();
        this.setState('idle');
        client.deactivate().catch(() => undefined);
    }

    subscribe(destination: string, handler: WebSocketMessageHandler): () => void {
        const destinationHandlers = this.handlers.get(destination) ?? new Set<WebSocketMessageHandler>();
        destinationHandlers.add(handler);
        this.handlers.set(destination, destinationHandlers);

        if (this.client?.connected) {
            this.ensureStompSubscription(destination);
        }

        return () => {
            const handlers = this.handlers.get(destination);

            if (!handlers) {
                return;
            }

            handlers.delete(handler);

            if (handlers.size === 0) {
                this.handlers.delete(destination);
                this.removeStompSubscription(destination);
            }
        };
    }

    private buildConnectHeaders(): Record<string, string> {
        const accessToken = getAccessToken();

        if (!accessToken) {
            return {};
        }

        return {
            Authorization: `Bearer ${accessToken}`,
        };
    }

    private setState(state: WebSocketConnectionState): void {
        if (this.state === state) {
            return;
        }

        this.state = state;
        this.stateListeners.forEach(listener => listener(state));
    }

    private syncStompSubscriptions(): void {
        for (const destination of this.handlers.keys()) {
            this.ensureStompSubscription(destination);
        }
    }

    private ensureStompSubscription(destination: string): void {
        if (!this.client?.connected || this.stompSubscriptions.has(destination)) {
            return;
        }

        const subscription = this.client.subscribe(destination, (message: IMessage) => {
            this.dispatchMessage(destination, message);
        });

        this.stompSubscriptions.set(destination, subscription);
    }

    private dispatchMessage(destination: string, message: IMessage): void {
        const handlers = this.handlers.get(destination);

        if (!handlers) {
            return;
        }

        const payload: WebSocketMessage = {
            destination,
            body: message.body,
        };

        handlers.forEach(handler => handler(payload));
    }

    private removeStompSubscription(destination: string): void {
        const subscription = this.stompSubscriptions.get(destination);

        if (!subscription) {
            return;
        }

        subscription.unsubscribe();
        this.stompSubscriptions.delete(destination);
    }

    private clearStompSubscriptions(): void {
        for (const subscription of this.stompSubscriptions.values()) {
            subscription.unsubscribe();
        }

        this.stompSubscriptions.clear();
    }
}
