'use client';

import { useMemo } from 'react';

export function useProfileImageObjectUrl(blob?: Blob) {
    const objectUrl = useMemo(() => {
        if (!blob) {
            return null;
        }

        return URL.createObjectURL(blob);
    }, [blob]);

    return objectUrl;
}
