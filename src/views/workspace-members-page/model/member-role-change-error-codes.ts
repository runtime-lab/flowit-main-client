export const MEMBER_ROLE_CHANGE_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester lacks permission, or the last OWNER cannot be demoted',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    WORKSPACE_MEMBER_404_001: 'Target member does not exist or has been removed',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type MemberRoleChangeErrorCode = keyof typeof MEMBER_ROLE_CHANGE_ERROR_CODES;

export function isMemberRoleChangeErrorCode(code: string): code is MemberRoleChangeErrorCode {
    return code in MEMBER_ROLE_CHANGE_ERROR_CODES;
}
