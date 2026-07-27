<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import { edit } from '@/routes/appearance';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Appearance settings',
                href: edit(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Appearance settings" />

    <UPageCard
        title="Appearance"
        description="Choose how the interface looks. Your preference is saved on this device."
        variant="naked"
        class="mb-4"
    />

    <UPageCard variant="subtle">
        <UFormField
            label="Color mode"
            description="Light, dark, or follow your system setting."
            class="flex items-start justify-between gap-4 max-sm:flex-col"
        >
            <AppearanceTabs />
        </UFormField>
    </UPageCard>
</template>
