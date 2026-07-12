export const GET_WORKSPACE_TASKS_ERROR_CODES = {
    VALIDATION_400_001: 'Request query params are invalid (e.g. mine and assigneeMemberId together)',
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type GetWorkspaceTasksErrorCode = keyof typeof GET_WORKSPACE_TASKS_ERROR_CODES;

export function isGetWorkspaceTasksErrorCode(code: string): code is GetWorkspaceTasksErrorCode {
    return code in GET_WORKSPACE_TASKS_ERROR_CODES;
}
