<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import TextLink from '@/components/TextLink.vue';
import { login } from '@/routes';
import { email } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Forgot password',
        description: "Enter your email and we'll send a reset link",
    },
});

defineProps<{
    status?: string;
}>();
</script>

<template>
    <Head title="Forgot password" />

    <UAlert
        v-if="status"
        :title="status"
        icon="i-lucide-mail-check"
        color="success"
        variant="subtle"
        class="mb-6"
    />

    <Form
        v-bind="email.form()"
        v-slot="{ errors, processing }"
        class="flex flex-col gap-5"
    >
        <UFormField
            label="Email address"
            name="email"
            :error="errors.email"
        >
            <UInput
                id="email"
                type="email"
                name="email"
                icon="i-lucide-mail"
                size="lg"
                autocomplete="email"
                autofocus
                placeholder="email@example.com"
                class="w-full"
            />
        </UFormField>

        <UButton
            type="submit"
            size="lg"
            block
            :loading="processing"
            :disabled="processing"
            trailing-icon="i-lucide-send"
            data-test="email-password-reset-link-button"
        >
            Email reset link
        </UButton>

        <p class="text-center text-sm text-muted">
            Remembered it?
            <TextLink :href="login()">Back to log in</TextLink>
        </p>
    </Form>
</template>
