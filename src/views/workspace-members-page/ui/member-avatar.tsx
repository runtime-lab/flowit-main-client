'use client';

import { useWorkspaceMemberProfileImageQuery } from '@entities/member';
import { useProfileImageObjectUrl } from '@entities/user';

type MemberAvatarProps = {
    name: string;
    profileImageUrl: string | null;
};

export function MemberAvatar({ name, profileImageUrl }: MemberAvatarProps) {
    const { data: profileImageBlob } = useWorkspaceMemberProfileImageQuery({
        profileImageUrl,
        enabled: !!profileImageUrl,
    });
    const profileImageObjectUrl = useProfileImageObjectUrl(profileImageBlob);
    const profileText = name.trim().slice(0, 1) || '?';

    return (
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-100/50 bg-blue-50 text-sm font-bold text-blue-600">
            {profileImageObjectUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profileImageObjectUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
                profileText
            )}
        </div>
    );
}
