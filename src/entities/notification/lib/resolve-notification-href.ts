import { WORKSPACE_ROUTES } from '@shared/lib';

import type { Notification } from '../model/notification.types';

export function resolveNotificationLinkHref(notification: Notification): string | null {
    const { link, subject } = notification;

    if (link.workspaceId === null) {
        return null;
    }

    switch (link.type) {
        case 'WORKSPACE_MEMBERS':
            return WORKSPACE_ROUTES.members(link.workspaceId);
        case 'TASK_DETAIL':
            return subject.type === 'TASK' ? WORKSPACE_ROUTES.boardTask(link.workspaceId, subject.id) : null;
        case 'NONE':
        default:
            return null;
    }
}
