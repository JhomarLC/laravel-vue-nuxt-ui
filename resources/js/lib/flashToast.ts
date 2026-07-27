import { router } from '@inertiajs/vue3';
import { useToast } from '@nuxt/ui/composables';
import type { FlashToast } from '@/types/ui';

const toastMeta: Record<
    FlashToast['type'],
    { color: 'success' | 'info' | 'warning' | 'error'; icon: string }
> = {
    success: { color: 'success', icon: 'i-lucide-circle-check' },
    info: { color: 'info', icon: 'i-lucide-info' },
    warning: { color: 'warning', icon: 'i-lucide-triangle-alert' },
    error: { color: 'error', icon: 'i-lucide-circle-x' },
};

export function initializeFlashToast(): void {
    router.on('flash', (event) => {
        const flash = (event as CustomEvent).detail?.flash;
        const data = flash?.toast as FlashToast | undefined;

        if (!data) {
            return;
        }

        const meta = toastMeta[data.type];
        const toast = useToast();

        toast.add({
            title: data.message,
            color: meta.color,
            icon: meta.icon,
        });
    });
}
