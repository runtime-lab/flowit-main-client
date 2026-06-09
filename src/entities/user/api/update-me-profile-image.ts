import { apiRequest } from '@shared/api/http';

import type { UpdateMeProfileImageResponse } from '../model/update-me-profile-image.types';

const UPDATE_ME_PROFILE_IMAGE_PATH = '/v1/users/me/profile-image';

export function updateMeProfileImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return apiRequest<UpdateMeProfileImageResponse>(UPDATE_ME_PROFILE_IMAGE_PATH, {
        method: 'PUT',
        body: formData,
    });
}
