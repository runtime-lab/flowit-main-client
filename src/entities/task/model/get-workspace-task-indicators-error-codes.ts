export const GET_WORKSPACE_TASK_INDICATORS_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type GetWorkspaceTaskIndicatorsErrorCode = keyof typeof GET_WORKSPACE_TASK_INDICATORS_ERROR_CODES;

export function isGetWorkspaceTaskIndicatorsErrorCode(code: string): code is GetWorkspaceTaskIndicatorsErrorCode {
    return code in GET_WORKSPACE_TASK_INDICATORS_ERROR_CODES;
}
