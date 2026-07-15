export const ME_WORKSPACES_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type MeWorkspacesErrorCode = keyof typeof ME_WORKSPACES_ERROR_CODES;

export function isMeWorkspacesErrorCode(code: string): code is MeWorkspacesErrorCode {
    return code in ME_WORKSPACES_ERROR_CODES;
}
