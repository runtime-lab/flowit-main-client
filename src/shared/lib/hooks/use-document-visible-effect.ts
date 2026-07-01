'use client';

import { useEffect, useRef } from 'react';

export function useDocumentVisibleEffect(onVisible: () => void) {
    const onVisibleRef = useRef(onVisible);

    useEffect(() => {
        onVisibleRef.current = onVisible;
    }, [onVisible]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState !== 'visible') {
                return;
            }

            onVisibleRef.current();
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);
}
