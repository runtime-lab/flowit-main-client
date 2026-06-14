import { apiRequest } from '@shared/api/http';

import type { WorkspaceMembersResponse } from '../model/workspace-members.types';

export function getWorkspaceMembers(workspaceId: string | number) {
    return apiRequest<WorkspaceMembersResponse>(`/v1/workspaces/${workspaceId}/members`, {
        method: 'GET',
    });
}
