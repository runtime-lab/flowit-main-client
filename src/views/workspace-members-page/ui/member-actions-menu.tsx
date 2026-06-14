'use client';

import { MoreVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@shared/ui';

type MemberActionsMenuProps = {
    canChangeRole: boolean;
    canRemove: boolean;
    onChangeRole: () => void;
    onRemove: () => void;
};

export function MemberActionsMenu({ canChangeRole, canRemove, onChangeRole, onRemove }: MemberActionsMenuProps) {
    const t = useTranslations('members');

    return (
        <Dropdown>
            <DropdownTrigger>
                <button
                    type="button"
                    aria-label={t('memberActions')}
                    className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                    <MoreVertical className="size-4" />
                </button>
            </DropdownTrigger>
            <DropdownMenu className="w-32 py-1.5">
                {canChangeRole ? (
                    <DropdownItem
                        className="rounded-none px-4 py-2 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                        onClick={onChangeRole}
                    >
                        {t('changeRole')}
                    </DropdownItem>
                ) : null}
                {canRemove ? (
                    <DropdownItem
                        className="rounded-none px-4 py-2 text-[13px] font-bold text-rose-600 hover:bg-rose-50"
                        onClick={onRemove}
                    >
                        {t('removeMember')}
                    </DropdownItem>
                ) : null}
            </DropdownMenu>
        </Dropdown>
    );
}
