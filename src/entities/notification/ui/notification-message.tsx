'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@shared/lib';

import { getNotificationMessageValues } from '../lib/get-notification-message-values';

import type { Notification } from '../model/notification.types';
import type { ReactNode } from 'react';

type NotificationMessageProps = {
    notification: Notification;
    className?: string;
    variant?: 'list' | 'toast';
};

function renderBold(chunks: ReactNode) {
    return <span className="font-semibold text-slate-900">{chunks}</span>;
}

export function NotificationMessage({ notification, className, variant = 'list' }: NotificationMessageProps) {
    const t = useTranslations('notification');
    const tTypes = useTranslations('notification.types');
    const values = getNotificationMessageValues(notification, t('unknownActor'));
    const messageClassName = cn(
        variant === 'toast'
            ? 'mt-0.5 line-clamp-2 text-[13px] leading-snug font-medium text-slate-800'
            : 'line-clamp-3 text-[13px] leading-[1.45]',
        variant === 'list' && (notification.read ? 'font-normal text-slate-500' : 'font-medium text-slate-800'),
        className,
    );

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
