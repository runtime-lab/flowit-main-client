import type { Notification } from '../model/notification.types';

export function getNotificationMessageValues(notification: Notification, unknownActorLabel: string) {
    return {
        actor: notification.actor.name?.trim() || unknownActorLabel,
        subject: notification.subject.name,
        workspace: notification.scope.name,
    };
}
