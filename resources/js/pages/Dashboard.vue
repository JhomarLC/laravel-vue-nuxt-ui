<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: dashboard(),
            },
        ],
    },
});

const page = usePage();
const user = computed(() => page.props.auth.user);
const firstName = computed(
    () => user.value?.name?.trim().split(/\s+/u)[0] ?? 'there',
);
const greeting = computed(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return 'Good morning';
    }

    if (hour < 18) {
        return 'Good afternoon';
    }

    return 'Good evening';
});

const shortcuts = [
    {
        title: 'Profile',
        description: 'Update your name and email address.',
        icon: 'i-lucide-user',
        to: toUrl(editProfile()),
    },
    {
        title: 'Security',
        description: 'Change your password and keep your account safe.',
        icon: 'i-lucide-shield',
        to: toUrl(editSecurity()),
    },
    {
        title: 'Appearance',
        description: 'Switch between light, dark, or system theme.',
        icon: 'i-lucide-sun-moon',
        to: toUrl(editAppearance()),
    },
];
</script>

<template>
    <Head title="Dashboard" />

    <UDashboardPanel id="dashboard">
        <template #header>
            <UDashboardNavbar title="Dashboard">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UColorModeButton />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex flex-col gap-6 sm:gap-8">
                <div class="space-y-1">
                    <h1 class="text-highlighted text-2xl font-semibold">
                        {{ greeting }}, {{ firstName }}
                    </h1>
                    <p class="text-muted text-sm">
                        Here's a quick place to manage your account and get
                        started.
                    </p>
                </div>

                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <UPageCard
                        v-for="item in shortcuts"
                        :key="item.title"
                        :title="item.title"
                        :description="item.description"
                        :icon="item.icon"
                        :to="item.to"
                        variant="subtle"
                        spotlight
                        class="transition-transform duration-200 hover:-translate-y-0.5"
                    />
                </div>

                <UEmpty
                    icon="i-lucide-layout-dashboard"
                    variant="outline"
                    title="Your workspace is ready"
                    description="This dashboard is a starting point. Add features here as your product grows — for now, use Settings to personalize your account."
                    :actions="[
                        {
                            label: 'Edit profile',
                            icon: 'i-lucide-user',
                            to: toUrl(editProfile()),
                        },
                        {
                            label: 'Security settings',
                            icon: 'i-lucide-shield',
                            color: 'neutral',
                            variant: 'subtle',
                            to: toUrl(editSecurity()),
                        },
                    ]"
                />
            </div>
        </template>
    </UDashboardPanel>
</template>
