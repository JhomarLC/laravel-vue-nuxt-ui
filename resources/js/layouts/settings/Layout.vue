<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

const links = [
    [
        {
            label: 'Profile',
            icon: 'i-lucide-user',
            to: toUrl(editProfile()),
            exact: true,
        },
        {
            label: 'Security',
            icon: 'i-lucide-shield',
            to: toUrl(editSecurity()),
        },
        {
            label: 'Appearance',
            icon: 'i-lucide-sun-moon',
            to: toUrl(editAppearance()),
        },
    ],
] satisfies NavigationMenuItem[][];
</script>

<template>
    <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
        <template #header>
            <UDashboardNavbar title="Settings">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UColorModeButton />
                </template>
            </UDashboardNavbar>

            <UDashboardToolbar>
                <UNavigationMenu
                    :items="links"
                    highlight
                    class="-mx-1 flex-1"
                />
            </UDashboardToolbar>
        </template>

        <template #body>
            <div
                class="mx-auto flex w-full flex-col gap-4 sm:gap-6 lg:max-w-2xl lg:gap-12"
            >
                <slot />
            </div>
        </template>
    </UDashboardPanel>
</template>
