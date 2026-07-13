export const GET_NOTIFICATIONS_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type GetNotificationsErrorCode = keyof typeof GET_NOTIFICATIONS_ERROR_CODES;

export function isGetNotificationsErrorCode(code: string): code is GetNotificationsErrorCode {
    return code in GET_NOTIFICATIONS_ERROR_CODES;
}
