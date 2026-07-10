'use client';

import { workspaceQueryKeys } from './workspace-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceActivityRecords } from '../api';

import type { GetWorkspaceActivityRecordsParams } from './workspace-activity-records.types';

type UseWorkspaceActivityRecordsQueryProps = {
    workspaceId: string | number;
    params?: GetWorkspaceActivityRecordsParams;
    enabled?: boolean;
};

export function useWorkspaceActivityRecordsQuery({
    workspaceId,
    params,
    enabled = true,
}: UseWorkspaceActivityRecordsQueryProps) {
    return useQuery({
        queryKey: workspaceQueryKeys.activityRecords({ workspaceId, ...params }),
        queryFn: () => getWorkspaceActivityRecords(workspaceId, params),
        enabled: enabled && Boolean(workspaceId),
    });
}
