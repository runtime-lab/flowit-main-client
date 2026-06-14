'use client';

import { memberMutationKeys } from './member-mutation-keys';
import { memberQueryKeys } from './member-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { meWorkspacesQueryKeys } from '@entities/user';

import { updateWorkspaceMemberRole } from '../api/update-workspace-member-role';

import type { UpdateWorkspaceMemberRoleRequest } from './update-workspace-member-role.types';

type UseUpdateWorkspaceMemberRoleMutationProps = {
    workspaceId: string | number;
    memberId: number;
};

export function useUpdateWorkspaceMemberRoleMutation({
    workspaceId,
    memberId,
}: UseUpdateWorkspaceMemberRoleMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: memberMutationKeys.updateRole(workspaceId, memberId),
        mutationFn: (body: UpdateWorkspaceMemberRoleRequest) => updateWorkspaceMemberRole(workspaceId, memberId, body),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: memberQueryKeys.list(workspaceId) }),
                queryClient.invalidateQueries({ queryKey: meWorkspacesQueryKeys.all }),
            ]);
        },
    });
}
