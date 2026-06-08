import { apiRequest } from '@shared/api/http';

import type { UpdateMeUserRequest, UpdateMeUserResponse } from '../model/update-me-user.types';

const ME_USER_PATH = '/v1/users/me';

export function updateMeUser(body: UpdateMeUserRequest) {
    return apiRequest<UpdateMeUserResponse>(ME_USER_PATH, {
        method: 'PATCH',
        body,
    });
}
