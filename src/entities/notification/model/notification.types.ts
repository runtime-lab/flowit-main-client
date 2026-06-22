export type NotificationAlertType =
    | 'WORKSPACE_MEMBER_JOINED'
    | 'WORKSPACE_MEMBER_ROLE_CHANGED'
    | 'WORKSPACE_MEMBER_REMOVED'
    | 'WORKSPACE_ACCESS_REVOKED'
    | 'WORKSPACE_MEMBER_WITHDRAWN';

export type NotificationScopeType = 'WORKSPACE';

export type NotificationActorType = 'USER';

export type NotificationSubjectType = 'WORKSPACE_MEMBER';

export type NotificationLinkType = 'NONE' | 'WORKSPACE_MEMBERS';

export type NotificationScope = {
    type: NotificationScopeType;
    id: number;
    name: string;
};

export type NotificationActor = {
    type: NotificationActorType;
    id: number | null;
    name: string | null;
    profileImageUrl: string | null;
};

export type NotificationSubject = {
    type: NotificationSubjectType;
    id: number;
    name: string;
};

export type NotificationChange = {
    element: string;
    from: unknown | null;
    to: unknown | null;
};

export type NotificationLink = {
    type: NotificationLinkType;
    workspaceId: number | null;
};

export type Notification = {
    id: number;
    type: NotificationAlertType;
    occurredAt: number;
    scope: NotificationScope;
    actor: NotificationActor;
    subject: NotificationSubject;
    changes: NotificationChange[];
    link: NotificationLink;
    read: boolean;
};

export type NotificationsResponse = {
    items: Notification[];
    totalCount: number;
    unreadCount: number;
    unseenCount: number;
};

export type GetNotificationsParams = {
    page?: number;
    size?: number;
};
