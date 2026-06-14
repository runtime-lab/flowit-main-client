'use client';

import { WorkspaceMemberRow } from './workspace-member-row';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkspaceMembersQuery } from '@entities/member';
import { useMeUserQuery } from '@entities/user';

type Props = {
    workspaceId: string;
};

export function WorkspaceMembersTable({ workspaceId }: Props) {
    const t = useTranslations('members');
    const { data: meUser } = useMeUserQuery();
    const { data, isPending, isError } = useWorkspaceMembersQuery({ workspaceId, enabled: !!workspaceId });

    if (isPending) {
        return (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white py-16 shadow-sm">
                <Loader2 className="size-6 animate-spin text-slate-400" />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border border-slate-200/80 bg-white px-6 py-8 text-center text-sm font-medium text-rose-500 shadow-sm">
                {t('loadFailed')}
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full text-left">
                <thead className="border-b border-slate-200/80 bg-slate-50/50 text-[13px] font-bold text-slate-500">
                    <tr>
                        <th className="px-6 py-4">{t('name')}</th>
                        <th className="px-6 py-4">{t('email')}</th>
                        <th className="px-6 py-4">{t('role')}</th>
                        <th className="px-6 py-4 text-center">{t('action')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.members.map(member => (
                        <WorkspaceMemberRow
                            key={member.memberId}
                            member={member}
                            isMe={meUser?.email === member.email}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
