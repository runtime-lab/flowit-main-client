'use client';

import { NotificationListItem } from './notification-list-item';
import { useTranslations } from 'next-intl';

import type { Notification } from '@entities/notification';

type NotificationListProps = {
    items: Notification[];
    isLoading: boolean;
};

function NotificationListSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex animate-pulse items-start gap-3">
                    <div className="size-9 shrink-0 rounded-full bg-slate-100" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3.5 w-full rounded bg-slate-100" />
                        <div className="h-3 w-1/3 rounded bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function NotificationList({ items, isLoading }: NotificationListProps) {
    const t = useTranslations('notification');

    if (isLoading) {
        return <NotificationListSkeleton />;
    }

    if (items.length === 0) {
        return <p className="py-6 text-center text-[13px] font-medium text-slate-400">{t('empty')}</p>;
    }

    return (
        <div className="max-h-[360px] space-y-4 overflow-y-auto">
            {items.map(notification => (
                <NotificationListItem key={notification.id} notification={notification} />
            ))}
        </div>
    );
}
