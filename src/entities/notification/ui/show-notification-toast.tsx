'use client';

import { NotificationToastContent } from './notification-toast-content';
import { toast } from 'sonner';

import type { Notification } from '../model/notification.types';

export function showNotificationToast(notification: Notification) {
    toast.custom(() => <NotificationToastContent notification={notification} />, {
        id: `notification-${notification.id}`,
        duration: 5_000,
        unstyled: true,
        classNames: {
            toast: 'p-0 bg-transparent border-0 shadow-none',
        },
    });
}
