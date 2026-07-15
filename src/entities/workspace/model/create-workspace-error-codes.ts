export const CREATE_WORKSPACE_ERROR_CODES = {
    VALIDATION_400_001: 'Request body or validation value is invalid',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    WORKSPACE_500_001: 'Workspace invite code generation or internal processing failed',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type CreateWorkspaceErrorCode = keyof typeof CREATE_WORKSPACE_ERROR_CODES;

export function isCreateWorkspaceErrorCode(code: string): code is CreateWorkspaceErrorCode {
    return code in CREATE_WORKSPACE_ERROR_CODES;
}
