export type WebSocketConnectionState = 'idle' | 'connecting' | 'connected' | 'disconnected';

export type WebSocketMessage = {
    destination: string;
    body: string;
};

export type WebSocketMessageHandler = (message: WebSocketMessage) => void;

export type WebSocketContextValue = {
    connectionState: WebSocketConnectionState;
    subscribe: (destination: string, handler: WebSocketMessageHandler) => () => void;
};
