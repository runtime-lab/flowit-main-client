import { WorkspaceLayout } from '@widgets/workspace-layout';

type Props = {
    params: Promise<{ workspaceId: string }>;
    children: React.ReactNode;
};

export default async function WorkspaceIdLayout({ params, children }: Props) {
    const { workspaceId } = await params;
    return <WorkspaceLayout workspaceId={workspaceId}>{children}</WorkspaceLayout>;
}
