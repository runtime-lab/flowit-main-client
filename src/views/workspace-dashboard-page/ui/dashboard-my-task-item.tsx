'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@shared/i18n';
import { cn, WORKSPACE_ROUTES } from '@shared/lib';
import { getTaskScheduleStatus } from '@shared/lib/date';

import { formatTaskDueDateLabel } from '../lib/format-task-due-date-label';
import { getTaskStatusStyle } from '../lib/get-task-status-style';

import type { Task } from '@entities/task';
import type { TaskScheduleStatus } from '@shared/lib/date';

type DashboardMyTaskItemProps = {
    workspaceId: string;
    task: Task;
};

const DUE_DATE_CLASSNAME: Record<TaskScheduleStatus, string> = {
    upcoming: 'text-slate-500',
    active: 'text-slate-700',
    overdue: 'text-rose-600',
};

const PROGRESS_BAR_CLASSNAME: Record<Task['status'], string> = {
    DONE: 'bg-emerald-500',
    IN_PROGRESS: 'bg-blue-500',
    TODO: 'bg-slate-300',
};

export function DashboardMyTaskItem({ workspaceId, task }: DashboardMyTaskItemProps) {
    const t = useTranslations('dashboard');
    const tStatus = useTranslations('dashboard.taskStatus');
    const status = getTaskStatusStyle(task.status);
    const scheduleStatus = getTaskScheduleStatus(task.startDate, task.dueDate);
    const taskHref = WORKSPACE_ROUTES.boardTask(workspaceId, task.id);
    const dueDateLabel = formatTaskDueDateLabel({
        dueDate: task.dueDate,
        labels: {
            today: t('dueToday'),
            tomorrow: t('dueTomorrow'),
            none: t('noDueDate'),
        },
    });
    const primaryTag = task.tags[0];

    return (
        <Link
            href={taskHref}
            className="group grid grid-cols-[minmax(0,1fr)_100px_80px_72px] items-center gap-4 px-1 py-3.5 transition-colors hover:bg-slate-50"
        >
            <div className="flex min-w-0 items-center gap-2.5">
                <div className={cn('h-2 w-2 shrink-0 rounded-full', status.dot)} />
                <div className="min-w-0">
                    <p className="truncate text-[14px] font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                        {task.title}
                    </p>
                    {primaryTag ? (
                        <p className="mt-0.5 truncate text-[11px] font-semibold text-slate-400">{primaryTag}</p>
                    ) : null}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                        className={cn('h-full rounded-full', PROGRESS_BAR_CLASSNAME[task.status])}
                        style={{ width: `${task.progress}%` }}
                    />
                </div>
                <span className="w-8 shrink-0 text-right text-[12px] font-bold text-slate-600">{task.progress}%</span>
            </div>

            <span
                className={cn(
                    'justify-self-start rounded-md px-2 py-0.5 text-[11px] font-bold',
                    status.bg,
                    status.color,
                )}
            >
                {tStatus(status.textKey)}
            </span>

            <span
                className={cn(
                    'justify-self-end text-right text-[12px] font-semibold',
                    task.dueDate && scheduleStatus ? DUE_DATE_CLASSNAME[scheduleStatus] : 'text-slate-400',
                )}
            >
                {dueDateLabel}
            </span>
        </Link>
    );
}
