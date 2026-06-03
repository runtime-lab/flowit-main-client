'use client';

import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkspaceById } from '@entities/workspace';

import { Link, usePathname } from '@shared/i18n';
import { cn } from '@shared/lib/clsx/cn';
import { WORKSPACE_ROUTES } from '@shared/lib/routes/workspace-routes';

import { WORKSPACE_NAV_ITEMS } from '../model/workspace-nav-items';

type Props = { workspaceId: string };

export function WorkspaceSidebar({ workspaceId }: Props) {
    const pathname = usePathname();
    const t = useTranslations('sidebar');
    const { displayName: workspaceName } = useWorkspaceById({ workspaceId });

    return (
        <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200/80 bg-white">
            <div className="px-5 pt-5 pb-3">
                <Link
                    href={WORKSPACE_ROUTES.list}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-100 bg-slate-50/80 p-3 transition-colors hover:border-slate-200"
                >
                    <div className="min-w-0">
                        <p className="mb-0.5 text-[11px] font-medium text-slate-400">{t('currentWorkspace')}</p>
                        <p className="truncate text-[13px] font-bold text-slate-800" title={workspaceName}>
                            {workspaceName}
                        </p>
                    </div>
                    <ChevronRight className="size-3.5 shrink-0 text-slate-400" aria-hidden />
                </Link>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-3">
                {WORKSPACE_NAV_ITEMS.map(item => {
                    const href = item.href(workspaceId);
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);
                    return (
                        <Link
                            key={item.key}
                            href={href}
                            className={cn(
                                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
                                isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800',
                            )}
                        >
                            <item.icon className="size-4" />
                            {t(item.labelKey)}
                        </Link>
                    );
                })}
            </nav>
            {/* 하단 마이페이지 Link — 경로는 팀 합의 */}
        </aside>
    );
}
