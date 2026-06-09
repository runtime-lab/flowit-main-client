export const FLOWIT_PROFILE_IMAGE_MAX_SIZE = 3 * 1024 * 1024;

export const ALLOWED_PROFILE_IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'] as const;

export type AllowedProfileImageMimeType = (typeof ALLOWED_PROFILE_IMAGE_MIME_TYPES)[number];
