import { apiRequest } from '@shared/api/http';

import type { RemoveWorkspaceMemberResponse } from '../model/remove-workspace-member.types';

export function removeWorkspaceMember(workspaceId: string | number, memberId: number) {
    return apiRequest<RemoveWorkspaceMemberResponse>(`/v1/workspaces/${workspaceId}/members/${memberId}`, {
        method: 'DELETE',
    });
}
