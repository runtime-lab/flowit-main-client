'use client';

import { memberMutationKeys } from './member-mutation-keys';
import { memberQueryKeys } from './member-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeWorkspaceMember } from '../api/remove-workspace-member';

type UseRemoveWorkspaceMemberMutationProps = {
    workspaceId: string | number;
    memberId: number;
};

export function useRemoveWorkspaceMemberMutation({ workspaceId, memberId }: UseRemoveWorkspaceMemberMutationProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: memberMutationKeys.remove(workspaceId, memberId),
        mutationFn: () => removeWorkspaceMember(workspaceId, memberId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: memberQueryKeys.list(workspaceId) });
        },
    });
}
