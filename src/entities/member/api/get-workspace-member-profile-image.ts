import { apiBlobRequest } from '@shared/api/http';

export function getWorkspaceMemberProfileImage(profileImageUrl: string) {
    return apiBlobRequest(profileImageUrl, {
        method: 'GET',
    });
}
