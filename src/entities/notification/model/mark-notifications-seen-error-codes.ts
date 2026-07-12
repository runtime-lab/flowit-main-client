export const MARK_NOTIFICATIONS_SEEN_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type MarkNotificationsSeenErrorCode = keyof typeof MARK_NOTIFICATIONS_SEEN_ERROR_CODES;

export function isMarkNotificationsSeenErrorCode(code: string): code is MarkNotificationsSeenErrorCode {
    return code in MARK_NOTIFICATIONS_SEEN_ERROR_CODES;
}
