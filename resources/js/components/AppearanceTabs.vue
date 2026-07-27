<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    {
        value: 'light' as const,
        icon: 'i-lucide-sun',
        label: 'Light',
    },
    {
        value: 'dark' as const,
        icon: 'i-lucide-moon',
        label: 'Dark',
    },
    {
        value: 'system' as const,
        icon: 'i-lucide-monitor',
        label: 'System',
    },
];
</script>

<template>
    <div class="grid w-full gap-2 sm:grid-cols-3">
        <button
            v-for="{ value, icon, label } in tabs"
            :key="value"
            type="button"
            class="rounded-lg border p-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
            :class="
                appearance === value
                    ? 'border-primary bg-primary/10'
                    : 'border-default bg-default hover:bg-elevated'
            "
            @click="updateAppearance(value)"
        >
            <div class="flex items-center gap-2">
                <UIcon :name="icon" class="size-4 text-highlighted" />
                <span class="text-sm font-medium text-highlighted">
                    {{ label }}
                </span>
            </div>
            <!-- <p class="text-xs text-muted">
                {{ description }}
            </p> -->
        </button>
    </div>
</template>
