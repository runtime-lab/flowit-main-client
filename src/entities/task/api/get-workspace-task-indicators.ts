import { apiRequest } from '@shared/api/http';

import type { WorkspaceTaskIndicatorsResponse } from '../model/workspace-task-indicators.types';

export function getWorkspaceTaskIndicators(workspaceId: string | number) {
    return apiRequest<WorkspaceTaskIndicatorsResponse>(`/v1/workspaces/${workspaceId}/tasks/indicators`, {
        method: 'GET',
    });
}
