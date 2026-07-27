<script setup lang="ts">
import AuthLayout from '@/layouts/auth/AuthSimpleLayout.vue';

const { title = '', description = '' } = defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <UApp>
        <AuthLayout :title="title" :description="description">
            <slot />
        </AuthLayout>
    </UApp>
</template>
