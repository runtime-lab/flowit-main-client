export const UPDATE_ME_PASSWORD_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type UpdateMePasswordErrorCode = keyof typeof UPDATE_ME_PASSWORD_ERROR_CODES;

export function isUpdateMePasswordErrorCode(code: string): code is UpdateMePasswordErrorCode {
    return code in UPDATE_ME_PASSWORD_ERROR_CODES;
}
