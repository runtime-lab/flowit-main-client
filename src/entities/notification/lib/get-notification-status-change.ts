import type { TaskStatus } from '@entities/task';
import type { Notification } from '../model/notification.types';

const TASK_STATUS_VALUES: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

function isTaskStatus(value: unknown): value is TaskStatus {
    return typeof value === 'string' && TASK_STATUS_VALUES.includes(value as TaskStatus);
}

export function getNotificationStatusChange(notification: Notification) {
    const statusChange = notification.changes.find(change => change.element === 'STATUS');

    if (!statusChange || !isTaskStatus(statusChange.from) || !isTaskStatus(statusChange.to)) {
        return null;
    }

    return {
        from: statusChange.from,
        to: statusChange.to,
    };
}
