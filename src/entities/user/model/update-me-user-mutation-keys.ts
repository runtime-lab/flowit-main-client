export const updateMeUserMutationKeys = {
    all: ['update-me-user'] as const,
    update: () => [...updateMeUserMutationKeys.all, 'update'] as const,
};
