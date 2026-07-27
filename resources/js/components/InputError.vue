<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>

<template>
    <p v-show="message" class="text-sm text-error">
        {{ message }}
    </p>
</template>
