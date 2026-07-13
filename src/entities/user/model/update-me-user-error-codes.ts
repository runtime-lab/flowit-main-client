export const UPDATE_ME_USER_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type UpdateMeUserErrorCode = keyof typeof UPDATE_ME_USER_ERROR_CODES;

export function isUpdateMeUserErrorCode(code: string): code is UpdateMeUserErrorCode {
    return code in UPDATE_ME_USER_ERROR_CODES;
}
