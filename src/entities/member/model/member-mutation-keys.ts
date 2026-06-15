export const memberMutationKeys = {
    all: ['member'] as const,
    withdraw: (workspaceId: string | number) => [...memberMutationKeys.all, 'withdraw', workspaceId] as const,
    updateRole: (workspaceId: string | number, memberId: number) =>
        [...memberMutationKeys.all, 'updateRole', workspaceId, memberId] as const,
    remove: (workspaceId: string | number, memberId: number) =>
        [...memberMutationKeys.all, 'remove', workspaceId, memberId] as const,
};
