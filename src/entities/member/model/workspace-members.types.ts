/** @see WorkspaceMemberRole
 * - OWNER: 워크스페이스 소유자 권한입니다.
 * - ADMIN: 워크스페이스를 관리할 수 있는 관리자 권한입니다.
 * - MEMBER: 워크스페이스에 참여한 일반 멤버 권한입니다.
 */
export type WorkspaceMemberRole = 'OWNER' | 'ADMIN' | 'MEMBER';

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
