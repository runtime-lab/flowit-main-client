export const GET_WORKSPACE_MEMBERS_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type GetWorkspaceMembersErrorCode = keyof typeof GET_WORKSPACE_MEMBERS_ERROR_CODES;

export function isGetWorkspaceMembersErrorCode(code: string): code is GetWorkspaceMembersErrorCode {
    return code in GET_WORKSPACE_MEMBERS_ERROR_CODES;
}
