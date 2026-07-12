export const LOGIN_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    INTERNAL_500_001: true,
} as const;

export type LoginErrorCode = keyof typeof LOGIN_ERROR_CODES;

export function isLoginErrorCode(code: string): code is LoginErrorCode {
    return code in LOGIN_ERROR_CODES;
}
