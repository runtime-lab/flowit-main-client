'use client';

import { memberQueryKeys } from './member-query-keys';
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceMemberProfileImage } from '../api';

type UseWorkspaceMemberProfileImageQueryProps = {
    profileImageUrl?: string | null;
    enabled?: boolean;
};

export function useWorkspaceMemberProfileImageQuery({
    profileImageUrl,
    enabled = true,
}: UseWorkspaceMemberProfileImageQueryProps) {
    const hasProfileImage = Boolean(profileImageUrl);

    return useQuery({
        queryKey: memberQueryKeys.detail(['profile-image', profileImageUrl ?? 'none']),
        queryFn: () => getWorkspaceMemberProfileImage(profileImageUrl!),
        enabled: enabled && hasProfileImage,
        staleTime: Infinity,
    });
}
