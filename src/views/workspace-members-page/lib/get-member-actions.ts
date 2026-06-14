import { isWorkspaceManager } from '@entities/workspace';

import type { WorkspaceMember, WorkspaceMemberRole } from '@entities/member';

export type MemberActions = {
    canChangeRole: boolean;
    canRemove: boolean;
    allowedRoles: WorkspaceMemberRole[];
};

function getAssignableRoles(viewerRole: WorkspaceMemberRole): WorkspaceMemberRole[] {
    if (viewerRole === 'OWNER') {
        return ['OWNER', 'ADMIN', 'MEMBER'];
    }

    // ADMIN은 대상 역할을 OWNER로 변경할 수 없음
    return ['ADMIN', 'MEMBER'];
}

/** OWNER를 OWNER가 아닌 역할로 변경할 수 있는지 (변경 후 ACTIVE OWNER 1명 이상 유지) */
function canDemoteOwner(allMembers: WorkspaceMember[]): boolean {
    const activeOwnerCount = allMembers.filter(member => member.role === 'OWNER' && member.status === 'ACTIVE').length;

    return activeOwnerCount > 1;
}

/**
 * 멤버 행별 UI 액션 가능 여부.
 * - 역할 변경: OWNER/ADMIN만 가능, ADMIN은 OWNER 지정 불가, 유일 OWNER 강등 불가
 * - 강제 퇴장: OWNER/ADMIN만 가능, OWNER·본인 대상 불가
 */
export function getMemberActions(
    viewerRole: string | undefined,
    target: WorkspaceMember,
    isMe: boolean,
    allMembers: WorkspaceMember[],
): MemberActions {
    if (!isWorkspaceManager(viewerRole)) {
        return { canChangeRole: false, canRemove: false, allowedRoles: [] };
    }

    // OWNER·본인은 강제 퇴장 대상이 될 수 없음
    const canRemove = !isMe && target.role !== 'OWNER';

    let allowedRoles = getAssignableRoles(viewerRole as WorkspaceMemberRole).filter(role => role !== target.role);

    if (target.role === 'OWNER' && !canDemoteOwner(allMembers)) {
        allowedRoles = [];
    }

    return {
        canChangeRole: allowedRoles.length > 0,
        canRemove,
        allowedRoles,
    };
}
