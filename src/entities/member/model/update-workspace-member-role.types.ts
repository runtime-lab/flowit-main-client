import type { WorkspaceMemberRole } from './workspace-members.types';

export type UpdateWorkspaceMemberRoleRequest = {
    role: WorkspaceMemberRole;
};

export type UpdateWorkspaceMemberRoleResponse = Record<string, never>;
