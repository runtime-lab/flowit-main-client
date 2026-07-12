'use client';

import { Toaster } from 'sonner';

export function AppToaster() {
    return (
        <Toaster
            position="bottom-right"
            offset={20}
            gap={12}
            richColors
            closeButton
            toastOptions={{
                classNames: {
                    toast: 'font-medium',
                },
            }}
        />
    );
}
