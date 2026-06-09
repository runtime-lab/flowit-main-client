import { ALLOWED_PROFILE_IMAGE_MIME_TYPES } from './profile-image.constants';

import type { AllowedProfileImageMimeType } from './profile-image.constants';

export function isAllowedProfileImageMimeType(type: string): type is AllowedProfileImageMimeType {
    return (ALLOWED_PROFILE_IMAGE_MIME_TYPES as readonly string[]).includes(type);
}

export function isAllowedProfileImageFile(file: File) {
    return isAllowedProfileImageMimeType(file.type);
}
