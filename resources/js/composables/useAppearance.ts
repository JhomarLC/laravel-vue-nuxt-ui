import { useColorMode } from '@vueuse/core';
import type { ComputedRef, Ref } from 'vue';
import { computed, watch } from 'vue';
import type { Appearance, ResolvedAppearance } from '@/types';

export type { Appearance, ResolvedAppearance };

export type UseAppearanceReturn = {
    appearance: Ref<Appearance>;
    resolvedAppearance: ComputedRef<ResolvedAppearance>;
    updateAppearance: (value: Appearance) => void;
};

/**
 * Shared VueUse color mode. Prefer `.store` for the user preference
 * (`auto` / light / dark). `.value` / `.state` are the resolved theme
 * and must not be written back as the preference (that breaks System).
 *
 * Modes match Nuxt UI's `useDark()` plugin: only toggle the `dark` class.
 */
function getColorMode() {
    return useColorMode({
        initialValue: 'auto',
        modes: {
            auto: '',
            light: '',
            dark: 'dark',
        },
    });
}

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;

    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const setThemeColor = (isDark: boolean): void => {
    if (typeof document === 'undefined') {
        return;
    }

    document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', isDark ? '#18181b' : '#ffffff');
};

function toColorMode(value: Appearance): 'light' | 'dark' | 'auto' {
    return value === 'system' ? 'auto' : value;
}

function fromColorMode(value: string): Appearance {
    if (value === 'auto') {
        return 'system';
    }

    if (value === 'dark' || value === 'light') {
        return value;
    }

    return 'system';
}

function syncLaravelAppearance(appearance: Appearance): void {
    localStorage.setItem('appearance', appearance);
    setCookie('appearance', appearance);
}

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    const colorMode = getColorMode();
    const savedAppearance = localStorage.getItem(
        'appearance',
    ) as Appearance | null;

    if (savedAppearance) {
        colorMode.store.value = toColorMode(savedAppearance);
    }

    setThemeColor(colorMode.state.value === 'dark');

    // Persist preference (`auto` when System), never the resolved light/dark.
    watch(
        () => colorMode.store.value,
        (preference) => {
            syncLaravelAppearance(fromColorMode(String(preference)));
        },
    );

    // Keep theme-color meta in sync when the device preference changes under System.
    watch(
        () => colorMode.state.value,
        (resolved) => {
            setThemeColor(resolved === 'dark');
        },
    );
}

export function useAppearance(): UseAppearanceReturn {
    const colorMode = getColorMode();

    const appearance = computed<Appearance>({
        get: () => fromColorMode(String(colorMode.store.value)),
        set: (value) => {
            updateAppearance(value);
        },
    });

    const resolvedAppearance = computed<ResolvedAppearance>(() =>
        colorMode.state.value === 'dark' ? 'dark' : 'light',
    );

    function updateAppearance(value: Appearance): void {
        colorMode.store.value = toColorMode(value);
        syncLaravelAppearance(value);
        setThemeColor(colorMode.state.value === 'dark');
    }

    return {
        appearance: appearance as unknown as Ref<Appearance>,
        resolvedAppearance,
        updateAppearance,
    };
}
