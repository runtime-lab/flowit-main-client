'use client';

import { DashboardBackground } from './dashboard-background';
import { DashboardHeader } from './dashboard-header';
import { DashboardIndicatorCards } from './dashboard-indicator-cards';
import { DashboardMyTasks } from './dashboard-my-tasks';
import { DashboardRecentActivities } from './dashboard-recent-activities';

import { useWorkspaceTaskIndicatorsQuery, useWorkspaceTasksQuery } from '@entities/task';
import { useMeUserQuery } from '@entities/user';
import { useWorkspaceActivityRecordsQuery } from '@entities/workspace';

type Props = {
    workspaceId: string;
};

const MY_TASKS_SIZE = 8;
const ACTIVITY_RECORDS_SIZE = 8;

export function WorkspaceDashboardPage({ workspaceId }: Props) {
    const { data: meUser, isPending: isMeUserPending } = useMeUserQuery();
    const { data: indicators, isPending: isIndicatorsPending } = useWorkspaceTaskIndicatorsQuery({ workspaceId });
    const { data: tasksData, isPending: isTasksPending } = useWorkspaceTasksQuery({
        workspaceId,
        params: { mine: true, size: MY_TASKS_SIZE },
    });
    const { data: activitiesData, isPending: isActivitiesPending } = useWorkspaceActivityRecordsQuery({
        workspaceId,
    });

    const userName = meUser?.nickname ?? '';
    const tasks = (tasksData?.items ?? []).slice(0, MY_TASKS_SIZE);
    const activities = (activitiesData?.items ?? []).slice(0, ACTIVITY_RECORDS_SIZE);

    return (
        <div className="animate-in fade-in relative flex h-full min-h-0 flex-col overflow-hidden px-8 pt-8 pb-12 duration-500">
            <DashboardBackground />
            <DashboardHeader userName={userName} isPending={isMeUserPending} />
            <DashboardIndicatorCards indicators={indicators} isPending={isIndicatorsPending} />
            <div className="relative z-10 grid grid-cols-1 gap-6 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-1">
                <DashboardMyTasks workspaceId={workspaceId} tasks={tasks} isPending={isTasksPending} />
                <DashboardRecentActivities
                    workspaceId={workspaceId}
                    activities={activities}
                    isPending={isActivitiesPending}
                />
            </div>
        </div>
    );
}
