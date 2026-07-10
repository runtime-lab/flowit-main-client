import { apiRequest } from '@shared/api/http';

import type {
    GetWorkspaceActivityRecordsParams,
    WorkspaceActivityRecordsResponse,
} from '../model/workspace-activity-records.types';

function buildWorkspaceActivityRecordsQuery(params?: GetWorkspaceActivityRecordsParams): string {
    if (!params) {
        return '';
    }

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
            searchParams.set(key, String(value));
        }
    }

    const query = searchParams.toString();

    return query ? `?${query}` : '';
}

export function getWorkspaceActivityRecords(workspaceId: string | number, params?: GetWorkspaceActivityRecordsParams) {
    return apiRequest<WorkspaceActivityRecordsResponse>(
        `/v1/workspaces/${workspaceId}/activity-records${buildWorkspaceActivityRecordsQuery(params)}`,
        {
            method: 'GET',
        },
    );
}
