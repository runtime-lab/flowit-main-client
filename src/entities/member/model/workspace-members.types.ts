import type { WorkspaceMemberRole } from '@entities/workspace';

/** @see WorkspaceMemberStatus
 * - ACTIVE: 정상적으로 활동 중인 멤버입니다.
 * - LOCKED: 잠금 처리된 멤버입니다.
 * - WITHDRAWN: 탈퇴 처리된 멤버입니다.
 */
export type WorkspaceMemberStatus = 'ACTIVE' | 'LOCKED' | 'WITHDRAWN';

export type WorkspaceMember = {
    memberId: number;
    name: string;
    email: string;
    status: WorkspaceMemberStatus;
    role: WorkspaceMemberRole;
    profileImageUrl: string | null;
};

export type WorkspaceMembersResponse = {
    inviteCode: string;
    members: WorkspaceMember[];
};
