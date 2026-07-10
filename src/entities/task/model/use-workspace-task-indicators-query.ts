'use client';

import { taskQueryKeys } from './task-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceTaskIndicators } from '../api';

type UseWorkspaceTaskIndicatorsQueryProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceTaskIndicatorsQuery({ workspaceId, enabled = true }: UseWorkspaceTaskIndicatorsQueryProps) {
    return useQuery({
        queryKey: taskQueryKeys.indicators(workspaceId),
        queryFn: () => getWorkspaceTaskIndicators(workspaceId),
        enabled: enabled && Boolean(workspaceId),
    });
}
