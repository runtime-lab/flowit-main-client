import type { TaskStatus } from '@entities/task';

type TaskStatusStyle = {
    textKey: TaskStatus;
    color: string;
    bg: string;
    dot: string;
};

const TASK_STATUS_STYLE: Record<TaskStatus, TaskStatusStyle> = {
    DONE: {
        textKey: 'DONE',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50/80',
        dot: 'bg-emerald-500',
    },
    IN_PROGRESS: {
        textKey: 'IN_PROGRESS',
        color: 'text-blue-700',
        bg: 'bg-blue-50/80',
        dot: 'bg-blue-500',
    },
    TODO: {
        textKey: 'TODO',
        color: 'text-slate-600',
        bg: 'bg-slate-100',
        dot: 'bg-slate-300',
    },
};

export function getTaskStatusStyle(status: TaskStatus) {
    return TASK_STATUS_STYLE[status];
}
