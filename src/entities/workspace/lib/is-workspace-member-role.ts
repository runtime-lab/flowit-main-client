import { WORKSPACE_MEMBER_ROLES } from '../model/workspace.type';

import type { WorkspaceMemberRole } from '../model/workspace.type';

export function isWorkspaceMemberRole(value: unknown): value is WorkspaceMemberRole {
    return typeof value === 'string' && WORKSPACE_MEMBER_ROLES.includes(value as WorkspaceMemberRole);
}
