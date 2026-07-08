import { Suspense } from 'react';

import { WorkspaceBoardPage } from '@views/workspace-board-page';

type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function Board({ params }: PageProps) {
    const { workspaceId } = await params;
    return (
        <Suspense>
            <WorkspaceBoardPage workspaceId={workspaceId} />
        </Suspense>
    );
}
