export const GET_WORKSPACE_ACTIVITY_RECORDS_ERROR_CODES = {
    AUTH_401_001: 'JWT access token is missing, invalid, or user is not active',
    AUTH_403_001: 'Requester is not an active member of this workspace',
    WORKSPACE_404_001: 'Workspace does not exist or has been deleted',
    INTERNAL_500_001: 'Unexpected internal server error',
} as const;

export type GetWorkspaceActivityRecordsErrorCode = keyof typeof GET_WORKSPACE_ACTIVITY_RECORDS_ERROR_CODES;

export function isGetWorkspaceActivityRecordsErrorCode(code: string): code is GetWorkspaceActivityRecordsErrorCode {
    return code in GET_WORKSPACE_ACTIVITY_RECORDS_ERROR_CODES;
}
