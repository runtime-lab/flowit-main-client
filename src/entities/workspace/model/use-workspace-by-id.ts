'use client';

import { useMemo } from 'react';

import { useMeWorkspacesQuery } from './use-me-workspaces-query';

import { findWorkspaceById, getWorkspaceDisplayName } from '../lib';

type UseWorkspaceByIdProps = {
    workspaceId: string | number;
    enabled?: boolean;
};

export function useWorkspaceById({ workspaceId, enabled = true }: UseWorkspaceByIdProps) {
    const query = useMeWorkspacesQuery({ enabled });

    const workspace = useMemo(
        () => findWorkspaceById(query.data?.items ?? [], workspaceId),
        [query.data?.items, workspaceId],
    );

    const displayName = useMemo(
        () =>
            getWorkspaceDisplayName({
                workspace,
                isPending: query.isPending,
                workspaceId,
            }),
        [workspace, query.isPending, workspaceId],
    );

    return {
        workspace,
        displayName,
        isPending: query.isPending,
        isError: query.isError,
    };
}
