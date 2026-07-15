export const JOIN_INVITE_CODE_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    WORKSPACE_404_001: 'No workspace matches the provided invite code',
    WORKSPACE_JOIN_REQUEST_409_001: 'Requester is already an active member of this workspace',
    WORKSPACE_JOIN_REQUEST_409_002: 'Workspace join request state transition is not allowed',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type JoinInviteCodeErrorCode = keyof typeof JOIN_INVITE_CODE_ERROR_CODES;

export function isJoinInviteCodeErrorCode(code: string): code is JoinInviteCodeErrorCode {
    return code in JOIN_INVITE_CODE_ERROR_CODES;
}
