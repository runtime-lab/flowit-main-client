export const UPDATE_WORKSPACE_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an OWNER or ADMIN of this workspace',
    WORKSPACE_400_001: 'Workspace update request contains disallowed values',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type UpdateWorkspaceErrorCode = keyof typeof UPDATE_WORKSPACE_ERROR_CODES;

export function isUpdateWorkspaceErrorCode(code: string): code is UpdateWorkspaceErrorCode {
    return code in UPDATE_WORKSPACE_ERROR_CODES;
}
