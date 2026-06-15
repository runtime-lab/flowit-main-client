import type { WorkspaceMemberRole } from '@entities/workspace';

export type UpdateWorkspaceMemberRoleRequest = {
    role: WorkspaceMemberRole;
};

export type UpdateWorkspaceMemberRoleResponse = Record<string, never>;
