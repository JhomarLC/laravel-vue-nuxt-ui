<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import PasswordInput from '@/components/PasswordInput.vue';
import { store } from '@/routes/password/confirm';

defineOptions({
    layout: {
        title: 'Confirm your password',
        description: 'This is a secure area. Please confirm to continue.',
    },
});
</script>

<template>
    <Head title="Confirm password" />

    <Form
        v-bind="store.form()"
        reset-on-success
        v-slot="{ errors, processing }"
        class="flex flex-col gap-5"
    >
        <UFormField
            label="Password"
            name="password"
            :error="errors.password"
        >
            <PasswordInput
                id="password"
                name="password"
                icon="i-lucide-lock"
                size="lg"
                class="w-full"
                required
                autocomplete="current-password"
                autofocus
                placeholder="Enter your password"
            />
        </UFormField>

        <UButton
            type="submit"
            size="lg"
            block
            :loading="processing"
            :disabled="processing"
            trailing-icon="i-lucide-shield-check"
            data-test="confirm-password-button"
        >
            Confirm password
        </UButton>
    </Form>
</template>
