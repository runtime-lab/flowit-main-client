'use client';

import { MemberAvatar } from './member-avatar';
import { useTranslations } from 'next-intl';

import { cn } from '@shared/lib';

import type { WorkspaceMember, WorkspaceMemberRole } from '@entities/member';

const ROLE_BADGE_CLASSNAME: Record<WorkspaceMemberRole, string> = {
    OWNER: 'bg-purple-50 text-purple-700 border border-purple-100/50',
    ADMIN: 'bg-orange-50 text-orange-700 border border-orange-100/50',
    MEMBER: 'bg-slate-100 text-slate-600 border border-transparent',
};

type WorkspaceMemberRowProps = {
    member: WorkspaceMember;
    isMe: boolean;
};

export function WorkspaceMemberRow({ member, isMe }: WorkspaceMemberRowProps) {
    const t = useTranslations('members');

    return (
        <tr className="group transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <MemberAvatar name={member.name} profileImageUrl={member.profileImageUrl} />
                    <span className="text-[14px] font-bold text-slate-900">
                        {member.name}
                        {isMe ? (
                            <span className="ml-1.5 rounded border border-blue-100/50 bg-blue-50 px-1.5 py-0.5 text-[12px] font-bold text-blue-600">
                                {t('me')}
                            </span>
                        ) : null}
                    </span>
                </div>
            </td>
            <td className="px-6 py-4 text-[14px] font-medium text-slate-500">{member.email}</td>
            <td className="px-6 py-4">
                <span className={cn('rounded px-2.5 py-1 text-[12px] font-bold', ROLE_BADGE_CLASSNAME[member.role])}>
                    {t(`roles.${member.role}`)}
                </span>
            </td>
            <td className="px-6 py-4 text-center" />
        </tr>
    );
}
