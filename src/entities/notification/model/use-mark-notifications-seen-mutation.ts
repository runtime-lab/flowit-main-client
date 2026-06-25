'use client';

import { notificationMutationKeys } from './notification-mutation-keys';
import { notificationQueryKeys } from './notification-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markNotificationsSeen } from '../api';

import type { NotificationsResponse } from './notification.types';

export function useMarkNotificationsSeenMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: notificationMutationKeys.markSeen(),
        mutationFn: () => markNotificationsSeen(),
        onSuccess: () => {
            queryClient.setQueriesData<NotificationsResponse>({ queryKey: notificationQueryKeys.lists() }, old =>
                old ? { ...old, unseenCount: 0 } : old,
            );
        },
    });
}
