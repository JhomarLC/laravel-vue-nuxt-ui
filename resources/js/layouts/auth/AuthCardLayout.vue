<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10"
    >
        <div class="flex w-full max-w-md flex-col gap-6">
            <Link
                :href="home()"
                class="flex items-center gap-2 self-center font-medium"
            >
                <div
                    class="flex size-9 items-center justify-center rounded-md bg-primary text-inverted"
                >
                    <AppLogoIcon class="size-5 fill-current" />
                </div>
            </Link>

            <UCard>
                <template #header>
                    <div class="space-y-1 text-center">
                        <h1 class="text-highlighted text-xl font-medium">
                            {{ title }}
                        </h1>
                        <p class="text-sm text-muted">
                            {{ description }}
                        </p>
                    </div>
                </template>

                <slot />
            </UCard>
        </div>
    </div>
</template>
