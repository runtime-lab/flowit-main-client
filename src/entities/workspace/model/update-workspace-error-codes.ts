export const UPDATE_WORKSPACE_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_400_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type UpdateWorkspaceErrorCode = keyof typeof UPDATE_WORKSPACE_ERROR_CODES;

export function isUpdateWorkspaceErrorCode(code: string): code is UpdateWorkspaceErrorCode {
    return code in UPDATE_WORKSPACE_ERROR_CODES;
}
