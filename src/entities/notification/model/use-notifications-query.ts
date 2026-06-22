'use client';

import { notificationQueryKeys } from './notification-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getNotifications } from '../api';

import type { GetNotificationsParams } from './notification.types';

type UseNotificationsQueryProps = {
    params?: GetNotificationsParams;
    enabled?: boolean;
};

export function useNotificationsQuery({ params, enabled = true }: UseNotificationsQueryProps = {}) {
    return useQuery({
        queryKey: notificationQueryKeys.list(params ?? {}),
        queryFn: () => getNotifications(params),
        enabled,
        staleTime: 0,
    });
}
