export const LOGIN_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'Email or password is incorrect, or credentials cannot be verified',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type LoginErrorCode = keyof typeof LOGIN_ERROR_CODES;

export function isLoginErrorCode(code: string): code is LoginErrorCode {
    return code in LOGIN_ERROR_CODES;
}
