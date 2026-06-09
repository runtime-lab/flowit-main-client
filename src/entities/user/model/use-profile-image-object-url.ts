'use client';

import { useEffect, useMemo } from 'react';

export function useProfileImageObjectUrl(blob?: Blob) {
    const objectUrl = useMemo(() => {
        if (!blob) {
            return null;
        }

        return URL.createObjectURL(blob);
    }, [blob]);

    useEffect(() => {
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [objectUrl]);

    return objectUrl;
}
