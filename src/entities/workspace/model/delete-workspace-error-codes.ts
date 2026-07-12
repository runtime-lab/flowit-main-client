export const DELETE_WORKSPACE_ERROR_CODES = {
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type DeleteWorkspaceErrorCode = keyof typeof DELETE_WORKSPACE_ERROR_CODES;

export function isDeleteWorkspaceErrorCode(code: string): code is DeleteWorkspaceErrorCode {
    return code in DELETE_WORKSPACE_ERROR_CODES;
}
