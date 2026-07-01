import { apiRequest } from '@shared/api/http';

import type { GetNotificationsParams, NotificationsResponse } from '../model';

function buildNotificationsQuery(params?: GetNotificationsParams): string {
    if (!params) {
        return '';
    }

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            searchParams.set(key, String(value));
        }
    }

    const query = searchParams.toString();

    return query ? `?${query}` : '';
}

export function getNotifications(params?: GetNotificationsParams) {
    return apiRequest<NotificationsResponse>(`/v1/notifications${buildNotificationsQuery(params)}`, {
        method: 'GET',
    });
}
