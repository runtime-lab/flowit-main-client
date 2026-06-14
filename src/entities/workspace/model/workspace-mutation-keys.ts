export const workspaceMutationKeys = {
    all: ['workspace'] as const,
    update: (workspaceId: string | number) => [...workspaceMutationKeys.all, 'update', workspaceId] as const,
};
