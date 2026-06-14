'use client';

import { memberQueryKeys } from './member-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceMembers } from '../api';

type UseWorkspaceMembersQueryProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceMembersQuery({ workspaceId, enabled = true }: UseWorkspaceMembersQueryProps) {
    return useQuery({
        queryKey: memberQueryKeys.list(workspaceId),
        queryFn: () => getWorkspaceMembers(workspaceId),
        enabled,
    });
}
