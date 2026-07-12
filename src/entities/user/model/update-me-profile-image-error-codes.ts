export const UPDATE_ME_PROFILE_IMAGE_ERROR_CODES = {
    AUTH_401_001: true,
    FILE_400_001: true,
    FILE_500_001: true,
    INTERNAL_500_001: true,
} as const;

export type UpdateMeProfileImageErrorCode = keyof typeof UPDATE_ME_PROFILE_IMAGE_ERROR_CODES;

export function isUpdateMeProfileImageErrorCode(code: string): code is UpdateMeProfileImageErrorCode {
    return code in UPDATE_ME_PROFILE_IMAGE_ERROR_CODES;
}
