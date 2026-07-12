export const JOIN_USER_ERROR_CODES = {
    VALIDATION_400_001: true,
    USER_409_001: true,
    INTERNAL_500_001: true,
} as const;

export type JoinUserErrorCode = keyof typeof JOIN_USER_ERROR_CODES;

export function isJoinUserErrorCode(code: string): code is JoinUserErrorCode {
    return code in JOIN_USER_ERROR_CODES;
}
