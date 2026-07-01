'use client';

import { useNotificationsQuery } from './use-notifications-query';

type UseNotificationsSummaryQueryProps = {
    enabled?: boolean;
};

export function useNotificationsSummaryQuery({ enabled = true }: UseNotificationsSummaryQueryProps = {}) {
    return useNotificationsQuery({
        params: { page: 0, size: 1 },
        enabled,
    });
}
