'use client';

import { useTranslations } from 'next-intl';

import { cn } from '@shared/lib';

import { getNotificationMessageValues } from '../lib/get-notification-message-values';
import { getNotificationRoleChange } from '../lib/get-notification-role-change';
import { getNotificationStatusChange } from '../lib/get-notification-status-change';

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
    const tTaskStatus = useTranslations('board.taskDetail.status');
    const values = getNotificationMessageValues(notification, t('unknownActor'));
    const roleChange = getNotificationRoleChange(notification);
    const statusChange = getNotificationStatusChange(notification);
    const messageClassName = cn(
        MESSAGE_VARIANT_CLASSNAME[variant],
        variant === 'list' && MESSAGE_LIST_READ_CLASSNAME[notification.read ? 'read' : 'unread'],
        className,
    );
    const fallbackMessage = t('fallback');

    const message = (() => {
        if (!tTypes.has(notification.type)) {
            return null;
        }

        if (notification.type === 'WORKSPACE_MEMBER_ROLE_CHANGED') {
            if (!roleChange) {
                return null;
            }

            return tTypes.rich('WORKSPACE_MEMBER_ROLE_CHANGED', {
                ...values,
                roleFrom: tMembers(`roles.${roleChange.from}`),
                roleTo: tMembers(`roles.${roleChange.to}`),
                bold: renderBold,
            });
        }

        if (notification.type === 'TASK_STATUS_CHANGED') {
            if (!statusChange) {
                return null;
            }

            return tTypes.rich('TASK_STATUS_CHANGED', {
                ...values,
                statusFrom: tTaskStatus(statusChange.from),
                statusTo: tTaskStatus(statusChange.to),
                bold: renderBold,
            });
        }

        return tTypes.rich(notification.type, {
            ...values,
            bold: renderBold,
        });
    })();

    return <p className={messageClassName}>{message ?? fallbackMessage}</p>;
}
