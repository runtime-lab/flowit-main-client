export const UPDATE_ME_PROFILE_IMAGE_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    FILE_400_001: 'Profile image file is empty, unsupported, or too large',
    FILE_500_001: 'Failed to store, read, or clean up the profile image file',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type UpdateMeProfileImageErrorCode = keyof typeof UPDATE_ME_PROFILE_IMAGE_ERROR_CODES;

export function isUpdateMeProfileImageErrorCode(code: string): code is UpdateMeProfileImageErrorCode {
    return code in UPDATE_ME_PROFILE_IMAGE_ERROR_CODES;
}
