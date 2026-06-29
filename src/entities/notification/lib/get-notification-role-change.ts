import { isWorkspaceMemberRole } from '@entities/workspace';

import type { Notification } from '../model/notification.types';

export function getNotificationRoleChange(notification: Notification) {
    const roleChange = notification.changes.find(change => change.element === 'ROLE');

    if (!roleChange || !isWorkspaceMemberRole(roleChange.from) || !isWorkspaceMemberRole(roleChange.to)) {
        return null;
    }

    return {
        from: roleChange.from,
        to: roleChange.to,
    };
}
