export const MEMBER_REMOVE_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester lacks permission, or cannot remove self/OWNER',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    WORKSPACE_MEMBER_404_001: 'Target member does not exist or has been removed',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type MemberRemoveErrorCode = keyof typeof MEMBER_REMOVE_ERROR_CODES;

export function isMemberRemoveErrorCode(code: string): code is MemberRemoveErrorCode {
    return code in MEMBER_REMOVE_ERROR_CODES;
}
