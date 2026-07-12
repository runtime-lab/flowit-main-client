export const UPDATE_ME_USER_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type UpdateMeUserErrorCode = keyof typeof UPDATE_ME_USER_ERROR_CODES;

export function isUpdateMeUserErrorCode(code: string): code is UpdateMeUserErrorCode {
    return code in UPDATE_ME_USER_ERROR_CODES;
}
