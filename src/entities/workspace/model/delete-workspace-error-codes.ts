export const DELETE_WORKSPACE_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not the OWNER of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type DeleteWorkspaceErrorCode = keyof typeof DELETE_WORKSPACE_ERROR_CODES;

export function isDeleteWorkspaceErrorCode(code: string): code is DeleteWorkspaceErrorCode {
    return code in DELETE_WORKSPACE_ERROR_CODES;
}
