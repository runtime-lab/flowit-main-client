import { apiRequest } from '@shared/api/http';

import type {
    UpdateWorkspaceMemberRoleRequest,
    UpdateWorkspaceMemberRoleResponse,
} from '../model/update-workspace-member-role.types';

export function updateWorkspaceMemberRole(
    workspaceId: string | number,
    memberId: number,
    body: UpdateWorkspaceMemberRoleRequest,
) {
    return apiRequest<UpdateWorkspaceMemberRoleResponse>(`/v1/workspaces/${workspaceId}/members/${memberId}/role`, {
        method: 'PATCH',
        body,
    });
}
