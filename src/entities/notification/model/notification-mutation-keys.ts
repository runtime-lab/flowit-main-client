export const notificationMutationKeys = {
    all: ['notification'] as const,
    markSeen: () => [...notificationMutationKeys.all, 'mark-seen'] as const,
};
