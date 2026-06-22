'use client';

import { useLocale, useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import { formatNotificationRelativeTime, getNotificationMessageValues } from '@entities/notification';

import { cn } from '@shared/lib';

import type { Notification } from '@entities/notification';
import type { ReactNode } from 'react';

type NotificationListItemProps = {
    notification: Notification;
};

const messageClassName = 'text-[14px] leading-snug text-slate-700';

function renderBold(chunks: ReactNode) {
    return <span className="font-bold text-slate-900">{chunks}</span>;
}

function NotificationMessage({ notification }: NotificationListItemProps) {
    const t = useTranslations('notification');
    const tTypes = useTranslations('notification.types');
    const values = getNotificationMessageValues(notification, t('unknownActor'));

    if (!tTypes.has(notification.type)) {
        return <p className={messageClassName}>{t('fallback')}</p>;
    }

    return (
        <p className={messageClassName}>
            {tTypes.rich(notification.type, {
                ...values,
                bold: renderBold,
            })}
        </p>
    );
}

export function NotificationListItem({ notification }: NotificationListItemProps) {
    const locale = useLocale();
    const t = useTranslations('notification');
    const isWithdrawn = notification.type === 'WORKSPACE_MEMBER_WITHDRAWN';
    const avatarName = isWithdrawn ? notification.subject.name : notification.actor.name?.trim() || '?';
    const avatarProfileImageUrl = isWithdrawn ? null : notification.actor.profileImageUrl;
    const relativeTime = formatNotificationRelativeTime(notification.occurredAt, locale, {
        justNow: t('justNow'),
    });

    return (
        <div
            className={cn('flex items-start gap-3', !notification.read && '-mx-2 rounded-xl bg-slate-50/80 px-2 py-2')}
        >
            <MemberAvatar
                name={avatarName}
                profileImageUrl={avatarProfileImageUrl}
                size="md"
                className="border-emerald-100/50 bg-emerald-50 text-[13px] text-emerald-600"
            />
            <div className="min-w-0 flex-1">
                <NotificationMessage notification={notification} />
                <span className="mt-1 block text-[12px] font-medium text-slate-400">{relativeTime}</span>
            </div>
        </div>
    );
}
