export const CREATE_WORKSPACE_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    WORKSPACE_500_001: true,
    INTERNAL_500_001: true,
} as const;

export type CreateWorkspaceErrorCode = keyof typeof CREATE_WORKSPACE_ERROR_CODES;

export function isCreateWorkspaceErrorCode(code: string): code is CreateWorkspaceErrorCode {
    return code in CREATE_WORKSPACE_ERROR_CODES;
}
