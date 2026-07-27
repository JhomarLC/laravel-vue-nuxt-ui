<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import type { NavigationMenuItem } from '@nuxt/ui';
import { computed, ref } from 'vue';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import UserMenu from '@/components/UserMenu.vue';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import { index as usersIndex } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

withDefaults(defineProps<Props>(), {
    breadcrumbs: () => [],
});

const open = ref(false);
const page = usePage();
const appName = computed(() => page.props.name);
const isAdmin = computed(() =>
    (page.props.auth.user?.roles ?? []).includes('admin'),
);

const links = computed(() => {
    const main: NavigationMenuItem[] = [
        {
            label: 'Dashboard',
            icon: 'i-lucide-house',
            to: toUrl(dashboard()),
            onSelect: () => {
                open.value = false;
            },
        },
    ];

    if (isAdmin.value) {
        main.push({
            label: 'Users',
            icon: 'i-lucide-users',
            to: toUrl(usersIndex()),
            onSelect: () => {
                open.value = false;
            },
        });
    }

    main.push({
        label: 'Settings',
        icon: 'i-lucide-settings',
        to: toUrl(editProfile()),
        type: 'trigger',
        children: [
            {
                label: 'Profile',
                icon: 'i-lucide-user',
                to: toUrl(editProfile()),
                onSelect: () => {
                    open.value = false;
                },
            },
            {
                label: 'Security',
                icon: 'i-lucide-shield',
                to: toUrl(editSecurity()),
                onSelect: () => {
                    open.value = false;
                },
            },
            {
                label: 'Appearance',
                icon: 'i-lucide-sun-moon',
                to: toUrl(editAppearance()),
                onSelect: () => {
                    open.value = false;
                },
            },
        ],
    });

    return [main];
});

const groups = computed(() => {
    const items: {
        label: string;
        icon: string;
        to: string | undefined;
        suffix?: string;
    }[] = [
        {
            label: 'Dashboard',
            icon: 'i-lucide-house',
            to: toUrl(dashboard()),
        },
    ];

    if (isAdmin.value) {
        items.push({
            label: 'Users',
            icon: 'i-lucide-users',
            to: toUrl(usersIndex()),
        });
    }

    items.push(
        {
            label: 'Profile',
            icon: 'i-lucide-user',
            to: toUrl(editProfile()),
            suffix: 'Settings',
        },
        {
            label: 'Security',
            icon: 'i-lucide-shield',
            to: toUrl(editSecurity()),
            suffix: 'Settings',
        },
        {
            label: 'Appearance',
            icon: 'i-lucide-sun-moon',
            to: toUrl(editAppearance()),
            suffix: 'Settings',
        },
    );

    return [
        {
            id: 'links',
            label: 'Go to',
            items,
        },
    ];
});
</script>

<template>
    <UDashboardGroup unit="rem" storage="local">
        <UDashboardSidebar
            id="default"
            v-model:open="open"
            collapsible
            resizable
            class="bg-elevated/25"
            :ui="{ footer: 'lg:border-t lg:border-default' }"
        >
            <template #header="{ collapsed }">
                <Link
                    :href="dashboard()"
                    class="flex items-center gap-2 truncate"
                    :class="collapsed ? 'justify-center' : 'px-1'"
                >
                    <div
                        class="flex size-8 items-center justify-center rounded-md bg-primary"
                    >
                        <AppLogoIcon class="size-5 fill-current text-inverted" />
                    </div>
                    <span
                        v-if="!collapsed"
                        class="truncate font-semibold text-highlighted"
                    >
                        {{ appName }}
                    </span>
                </Link>
            </template>

            <template #default="{ collapsed }">
                <UDashboardSearchButton
                    :collapsed="collapsed"
                    label="Search…"
                    class="bg-transparent ring-default"
                />

                <UNavigationMenu
                    :collapsed="collapsed"
                    :items="links[0]"
                    orientation="vertical"
                    tooltip
                    popover
                />
            </template>

            <template #footer="{ collapsed }">
                <UserMenu :collapsed="collapsed" />
            </template>
        </UDashboardSidebar>

        <UDashboardSearch :groups="groups" />

        <slot />
    </UDashboardGroup>
</template>
