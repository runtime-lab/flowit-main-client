export const JOIN_USER_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    USER_409_001: 'An active user with the same email already exists',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type JoinUserErrorCode = keyof typeof JOIN_USER_ERROR_CODES;

export function isJoinUserErrorCode(code: string): code is JoinUserErrorCode {
    return code in JOIN_USER_ERROR_CODES;
}
