import { apiBlobRequest } from '@shared/api/http';

const ME_PROFILE_IMAGE_PATH = '/v1/users/me/profile-image';

export function meProfileImage() {
    return apiBlobRequest(ME_PROFILE_IMAGE_PATH, {
        method: 'GET',
    });
}
