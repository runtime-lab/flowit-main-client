import { WorkspaceCreate } from './workspace-create';

export function WorkspacesList() {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            <WorkspaceCreate />
        </div>
    );
}
