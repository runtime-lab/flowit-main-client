export const loginMutationKeys = {
    all: ['login'] as const,
    login: () => [...loginMutationKeys.all, 'login'] as const,
};
