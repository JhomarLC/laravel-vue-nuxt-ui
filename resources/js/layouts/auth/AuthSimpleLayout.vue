<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();

const appName = usePage().props.name;
</script>

<template>
    <div class="relative flex min-h-svh flex-col bg-muted">
        <div class="absolute end-4 top-4 z-10 flex items-center gap-2">
            <UColorModeButton />
        </div>

        <div
            class="flex flex-1 flex-col items-center justify-center gap-6 p-6 md:p-10"
        >
            <div class="w-full max-w-md">
                <div class="mb-6 flex flex-col items-center gap-3 text-center">
                    <Link
                        :href="home()"
                        class="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <div
                            class="flex size-10 items-center justify-center rounded-lg bg-primary shadow-sm"
                        >
                            <AppLogoIcon
                                class="size-5 fill-current text-inverted"
                            />
                        </div>
                        <span class="text-highlighted text-lg font-semibold">
                            {{ appName }}
                        </span>
                    </Link>
                </div>

                <UCard
                    :ui="{
                        root: 'shadow-sm ring-default',
                        body: 'sm:p-8',
                    }"
                >
                    <div class="mb-6 space-y-1.5 text-center">
                        <h1 class="text-highlighted text-xl font-semibold">
                            {{ title }}
                        </h1>
                        <p v-if="description" class="text-sm text-muted">
                            {{ description }}
                        </p>
                    </div>

                    <slot />
                </UCard>
            </div>
        </div>
    </div>
</template>
