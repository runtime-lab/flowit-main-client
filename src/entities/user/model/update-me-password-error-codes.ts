export const UPDATE_ME_PASSWORD_ERROR_CODES = {
    VALIDATION_400_001: 'New password format is invalid',
    AUTH_401_001: 'Current password is incorrect, or JWT is missing/invalid',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type UpdateMePasswordErrorCode = keyof typeof UPDATE_ME_PASSWORD_ERROR_CODES;

export function isUpdateMePasswordErrorCode(code: string): code is UpdateMePasswordErrorCode {
    return code in UPDATE_ME_PASSWORD_ERROR_CODES;
}
