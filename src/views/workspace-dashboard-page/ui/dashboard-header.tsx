'use client';

import { useTranslations } from 'next-intl';

type DashboardHeaderProps = {
    userName: string;
    isPending: boolean;
};

export function DashboardHeader({ userName, isPending }: DashboardHeaderProps) {
    const t = useTranslations('dashboard');
    const displayName = isPending ? '…' : userName;

    return (
        <div className="relative z-10 mb-12 shrink-0 pt-6">
            <h1 className="mb-1 text-[32px] font-bold tracking-tight text-slate-900">
                {t('greeting', { name: displayName })} <span className="inline-block">👋</span>
            </h1>
            <p className="text-[16px] font-medium text-slate-500">{t('subtitle')}</p>
        </div>
    );
}
