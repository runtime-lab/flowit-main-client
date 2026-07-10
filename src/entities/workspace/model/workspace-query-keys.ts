import { createQueryKeys } from '@shared/api';

import type { GetWorkspaceActivityRecordsParams } from './workspace-activity-records.types';

const baseKeys = createQueryKeys('workspace');

export const workspaceQueryKeys = {
    ...baseKeys,
    activityRecords: (params: GetWorkspaceActivityRecordsParams & { workspaceId: string | number }) =>
        [...baseKeys.all, 'activity-records', params] as const,
};
