<script setup lang="ts">
import { router, usePage } from '@inertiajs/vue3';
import type { DropdownMenuItem } from '@nuxt/ui';
import { computed } from 'vue';
import { useAppearance } from '@/composables/useAppearance';
import { getInitials } from '@/composables/useInitials';
import { toUrl } from '@/lib/utils';
import { logout } from '@/routes';
import { edit as editProfile } from '@/routes/profile';

defineProps<{
    collapsed?: boolean;
}>();

const page = usePage();
const user = computed(() => page.props.auth.user);
const { appearance, updateAppearance } = useAppearance();

const items = computed<DropdownMenuItem[][]>(() => [
    [
        {
            type: 'label',
            label: user.value.name,
            description: user.value.email,
            avatar: {
                alt: user.value.name,
                text: getInitials(user.value.name),
            },
        },
    ],
    [
        {
            label: 'Profile',
            icon: 'i-lucide-user',
            to: toUrl(editProfile()),
        },
        {
            label: 'Settings',
            icon: 'i-lucide-settings',
            to: toUrl(editProfile()),
        },
    ],
    [
        {
            label: 'Appearance',
            icon: 'i-lucide-sun-moon',
            children: [
                {
                    label: 'Light',
                    icon: 'i-lucide-sun',
                    type: 'checkbox',
                    checked: appearance.value === 'light',
                    onSelect(e: Event) {
                        e.preventDefault();
                        updateAppearance('light');
                    },
                },
                {
                    label: 'Dark',
                    icon: 'i-lucide-moon',
                    type: 'checkbox',
                    checked: appearance.value === 'dark',
                    onSelect(e: Event) {
                        e.preventDefault();
                        updateAppearance('dark');
                    },
                },
                {
                    label: 'System',
                    icon: 'i-lucide-monitor',
                    type: 'checkbox',
                    checked: appearance.value === 'system',
                    onSelect(e: Event) {
                        e.preventDefault();
                        updateAppearance('system');
                    },
                },
            ],
        },
    ],
    [
        {
            label: 'Log out',
            icon: 'i-lucide-log-out',
            onSelect() {
                router.flushAll();
                router.post(toUrl(logout())!);
            },
        },
    ],
]);
</script>

<template>
    <UDropdownMenu
        :items="items"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{
            content: collapsed
                ? 'w-48'
                : 'w-(--reka-dropdown-menu-trigger-width)',
        }"
    >
        <UButton
            :avatar="{
                alt: user.name,
                text: getInitials(user.name),
            }"
            :label="collapsed ? undefined : user.name"
            :trailing-icon="collapsed ? undefined : 'i-lucide-chevrons-up-down'"
            color="neutral"
            variant="ghost"
            block
            :square="collapsed"
            class="data-[state=open]:bg-elevated"
            data-test="sidebar-menu-button"
            :ui="{
                trailingIcon: 'text-dimmed',
            }"
        />
    </UDropdownMenu>
</template>
