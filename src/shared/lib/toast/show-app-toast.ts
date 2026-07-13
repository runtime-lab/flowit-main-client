import { toast } from 'sonner';

const DEFAULT_DURATION_MS = 3_500;

export function showSuccessToast(message: string) {
    toast.success(message, {
        duration: DEFAULT_DURATION_MS,
    });
}

export function showErrorToast(message: string) {
    toast.error(message, {
        duration: DEFAULT_DURATION_MS,
    });
}
