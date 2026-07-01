import { apiRequest } from '@shared/api/http';

import type { MarkNotificationsSeenResponse } from '../model/mark-notifications-seen.types';

export function markNotificationsSeen() {
    return apiRequest<MarkNotificationsSeenResponse>('/v1/notifications/seen', {
        method: 'PATCH',
    });
}
