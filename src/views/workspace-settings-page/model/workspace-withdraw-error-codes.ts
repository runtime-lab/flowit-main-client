export const WORKSPACE_WITHDRAW_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not a member, or last OWNER has no ADMIN for ownership transfer',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type WorkspaceWithdrawErrorCode = keyof typeof WORKSPACE_WITHDRAW_ERROR_CODES;

export function isWorkspaceWithdrawErrorCode(code: string): code is WorkspaceWithdrawErrorCode {
    return code in WORKSPACE_WITHDRAW_ERROR_CODES;
}
