'use client';

import { useLocale, useTranslations } from 'next-intl';

import { MemberAvatar } from '@entities/member';
import { getActivityRecordActorName } from '@entities/workspace';

import { formatEpochSecondsRelativeTime } from '@shared/lib';

import type { ActivityRecord } from '@entities/workspace';
import type { ReactNode } from 'react';

type DashboardActivityMessageProps = {
    record: ActivityRecord;
    unknownActorLabel: string;
};

function renderBold(chunks: ReactNode) {
    return <span className="font-bold text-slate-900">{chunks}</span>;
}

function DashboardActivityMessage({ record, unknownActorLabel }: DashboardActivityMessageProps) {
    const tActions = useTranslations('dashboard.activityActions');
    const actor = getActivityRecordActorName(record, unknownActorLabel);
    const target = record.target.displayName;

    const message = tActions.has(record.action)
        ? tActions.rich(record.action, {
              actor,
              target,
              bold: renderBold,
          })
        : `${actor} · ${target}`;

    return <p className="text-[14px] leading-snug font-medium text-slate-700">{message}</p>;
}

type DashboardActivityItemProps = {
    workspaceId: string;
    record: ActivityRecord;
};

export function DashboardActivityItem({ workspaceId, record }: DashboardActivityItemProps) {
    const locale = useLocale();
    const t = useTranslations('dashboard');
    const unknownActorLabel = t('unknownActor');
    const actorName = getActivityRecordActorName(record, unknownActorLabel);

    return (
        <div className="group relative flex gap-4">
            <MemberAvatar
                name={actorName}
                workspaceId={workspaceId}
                memberId={record.actor.memberId}
                size="md"
                className="z-10"
            />
            <div className="pt-1.5">
                <DashboardActivityMessage record={record} unknownActorLabel={unknownActorLabel} />
                <p className="mt-1 text-[12px] font-bold text-slate-400">
                    {formatEpochSecondsRelativeTime(record.occurredAt, locale)}
                </p>
            </div>
        </div>
    );
}
