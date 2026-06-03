type PageProps = {
    params: Promise<{ workspaceId: string; locale: string }>;
};

export default async function BoardPage({ params }: PageProps) {
    const { workspaceId } = await params;
    return (
        <div className="p-8">
            <h1 className="text-xl font-bold">Board — workspace {workspaceId}</h1>
        </div>
    );
}
