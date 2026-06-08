'use client';

import { meUserQueryKeys } from './me-user-query-keys';
import { updateMeUserMutationKeys } from './update-me-user-mutation-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeUser } from '../api';

import type { UpdateMeUserRequest } from './update-me-user.types';

export function useUpdateMeUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: updateMeUserMutationKeys.update(),
        mutationFn: (body: UpdateMeUserRequest) => updateMeUser(body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: meUserQueryKeys.all });
        },
    });
}
