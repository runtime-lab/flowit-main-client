import type { WorkspaceMember } from '../model/workspace-members.types';

type FindMemberProfileImageUrlParams = {
    members?: WorkspaceMember[];
    memberId?: number | null;
    displayName?: string;
};

export function findMemberProfileImageUrl({
    members,
    memberId,
    displayName,
}: FindMemberProfileImageUrlParams): string | null {
    if (!members?.length) {
        return null;
    }

    if (memberId != null) {
        const normalizedMemberId = Number(memberId);
        const memberById = members.find(member => member.memberId === normalizedMemberId);

        if (memberById?.profileImageUrl) {
            return memberById.profileImageUrl;
        }
    }

    if (!displayName) {
        return null;
    }

    const normalizedDisplayName = displayName.trim();
    const memberByName = members.find(member => member.name.trim() === normalizedDisplayName);

    return memberByName?.profileImageUrl ?? null;
}
