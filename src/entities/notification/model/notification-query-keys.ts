import { createQueryKeys } from '@shared/api';

import type { GetNotificationsParams } from './notification.types';

export const notificationQueryKeys = {
    ...createQueryKeys('notification'),
    list: (params: GetNotificationsParams = {}) => ['notification', 'list', params] as const,
};
