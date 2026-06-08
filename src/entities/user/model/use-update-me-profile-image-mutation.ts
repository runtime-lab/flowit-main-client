'use client';

import { meProfileImageQueryKeys } from './me-profile-image-query-keys';
import { meUserQueryKeys } from './me-user-query-keys';
import { updateMeProfileImageMutationKeys } from './update-me-profile-image-mutation-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeProfileImage } from '../api';

export function useUpdateMeProfileImageMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: updateMeProfileImageMutationKeys.update(),
        mutationFn: (file: File) => updateMeProfileImage(file),
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: meUserQueryKeys.all }),
                queryClient.invalidateQueries({ queryKey: meProfileImageQueryKeys.all }),
            ]);
        },
    });
}
