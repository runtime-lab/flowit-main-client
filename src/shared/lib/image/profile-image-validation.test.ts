import { FLOWIT_PROFILE_IMAGE_MAX_SIZE, isAllowedProfileImageFile, isAllowedProfileImageMimeType } from './index';
import { describe, expect, it } from 'vitest';

describe('profile image validation', () => {
    it('jpeg, png, gif mime type만 허용한다', () => {
        expect(isAllowedProfileImageMimeType('image/jpeg')).toBe(true);
        expect(isAllowedProfileImageMimeType('image/png')).toBe(true);
        expect(isAllowedProfileImageMimeType('image/gif')).toBe(true);
        expect(isAllowedProfileImageMimeType('image/webp')).toBe(false);
    });

    it('허용 mime type 파일만 통과한다', () => {
        const file = new File(['test'], 'profile.png', { type: 'image/png' });

        expect(isAllowedProfileImageFile(file)).toBe(true);
    });

    it('최대 용량 상수는 3MB다', () => {
        expect(FLOWIT_PROFILE_IMAGE_MAX_SIZE).toBe(3 * 1024 * 1024);
    });
});
