export const updateMeProfileImageMutationKeys = {
    all: ['update-me-profile-image'] as const,
    update: () => [...updateMeProfileImageMutationKeys.all, 'update'] as const,
};
