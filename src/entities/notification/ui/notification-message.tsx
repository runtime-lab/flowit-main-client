'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@shared/lib';

import { getNotificationMessageValues } from '../lib/get-notification-message-values';
import { getNotificationRoleChange } from '../lib/get-notification-role-change';

import type { Notification } from '../model/notification.types';
import type { ReactNode } from 'react';

type NotificationMessageProps = {
    notification: Notification;
    className?: string;
    variant?: 'list' | 'toast';
};

const MESSAGE_VARIANT_CLASSNAME = {
    toast: 'mt-0.5 line-clamp-2 text-[13px] leading-snug font-medium text-slate-800',
    list: 'line-clamp-3 text-[13px] leading-[1.45]',
} as const;

const MESSAGE_LIST_READ_CLASSNAME = {
    read: 'font-normal text-slate-500',
    unread: 'font-medium text-slate-800',
} as const;

function renderBold(chunks: ReactNode) {
    return <span className="font-semibold text-slate-900">{chunks}</span>;
}

export function NotificationMessage({ notification, className, variant = 'list' }: NotificationMessageProps) {
    const t = useTranslations('notification');
    const tTypes = useTranslations('notification.types');
    const tMembers = useTranslations('members');
    const values = getNotificationMessageValues(notification, t('unknownActor'));
    const roleChange = getNotificationRoleChange(notification);
    const messageClassName = cn(
        MESSAGE_VARIANT_CLASSNAME[variant],
        variant === 'list' && MESSAGE_LIST_READ_CLASSNAME[notification.read ? 'read' : 'unread'],
        className,
    );

    if (!tTypes.has(notification.type)) {
        return <p className={messageClassName}>{t('fallback')}</p>;
    }

    if (notification.type === 'WORKSPACE_MEMBER_ROLE_CHANGED') {
        if (!roleChange) {
            return <p className={messageClassName}>{t('fallback')}</p>;
        }

        return (
            <p className={messageClassName}>
                {tTypes.rich('WORKSPACE_MEMBER_ROLE_CHANGED', {
                    ...values,
                    roleFrom: tMembers(`roles.${roleChange.from}`),
                    roleTo: tMembers(`roles.${roleChange.to}`),
                    bold: renderBold,
                })}
            </p>
        );
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
