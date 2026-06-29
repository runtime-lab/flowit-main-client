'use client';

import { useCallback, useEffect, useRef } from 'react';

import { NOTIFICATION_WS_DESTINATION } from './constants';
import { notificationQueryKeys } from './notification-query-keys';
import { useQueryClient } from '@tanstack/react-query';

import { useWebSocketClient, useWebSocketSubscription } from '@shared/api/ws';
import { useDocumentVisibleEffect } from '@shared/lib/hooks';

import { parseNotificationWsMessage } from '../lib/parse-notification-ws-message';
import { isNotificationInCache, upsertNotificationInCache } from '../lib/upsert-notification-in-cache';
import { showNotificationToast } from '../ui/show-notification-toast';

import type { WebSocketConnectionState, WebSocketMessage } from '@shared/api/ws';

export function useNotificationRealtime() {
    const queryClient = useQueryClient();
    const { connectionState } = useWebSocketClient();
    const previousConnectionStateRef = useRef<WebSocketConnectionState>('idle');

    const syncWithServer = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: notificationQueryKeys.all }).catch(() => undefined);
    }, [queryClient]);

    useEffect(() => {
        const previousConnectionState = previousConnectionStateRef.current;
        previousConnectionStateRef.current = connectionState;

        if (connectionState === 'connected' && previousConnectionState === 'disconnected') {
            syncWithServer();
        }
    }, [connectionState, syncWithServer]);

    useDocumentVisibleEffect(syncWithServer);

    const handleNotificationMessage = useCallback(
        (message: WebSocketMessage) => {
            const notification = parseNotificationWsMessage(message.body);

            if (!notification) {
                return;
            }

            const isNew = !isNotificationInCache(queryClient, notification.id);

            upsertNotificationInCache(queryClient, notification);

            if (isNew) {
                showNotificationToast(notification);
            }
        },
        [queryClient],
    );

    useWebSocketSubscription(NOTIFICATION_WS_DESTINATION, handleNotificationMessage);
}
