import { dayjs } from '@shared/lib/date';

type FormatTaskDueDateLabelParams = {
    dueDate: number | null;
    labels: {
        today: string;
        tomorrow: string;
        none: string;
    };
};

export function formatTaskDueDateLabel({ dueDate, labels }: FormatTaskDueDateLabelParams) {
    if (!dueDate) {
        return labels.none;
    }

    const due = dayjs.unix(dueDate).startOf('day');
    const today = dayjs().startOf('day');
    const diffDays = due.diff(today, 'day');

    if (diffDays === 0) {
        return labels.today;
    }

    if (diffDays === 1) {
        return labels.tomorrow;
    }

    if (due.year() === today.year()) {
        return due.format('M/D');
    }

    return due.format('YY.M.D');
}
