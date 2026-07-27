<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Welcome back',
        description: 'Sign in to continue to your account',
    },
});

defineProps<{
    status?: string;
    canResetPassword: boolean;
}>();
</script>

<template>
    <Head title="Log in" />

    <UAlert
        v-if="status"
        :title="status"
        icon="i-lucide-circle-check"
        color="success"
        variant="subtle"
        class="mb-6"
    />

    <Form
        v-bind="store.form()"
        :reset-on-success="['password']"
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
                required
                autofocus
                :tabindex="1"
                autocomplete="email"
                placeholder="email@example.com"
                class="w-full"
            />
        </UFormField>

        <UFormField
            label="Password"
            name="password"
            :error="errors.password"
        >
            <template v-if="canResetPassword" #hint>
                <TextLink :href="request()" class="text-sm" :tabindex="5">
                    Forgot password?
                </TextLink>
            </template>

            <PasswordInput
                id="password"
                name="password"
                icon="i-lucide-lock"
                size="lg"
                required
                :tabindex="2"
                autocomplete="current-password"
                placeholder="Enter your password"
                class="w-full"
            />
        </UFormField>

        <div class="flex items-center justify-between gap-3">
            <UCheckbox
                id="remember"
                name="remember"
                label="Remember me"
                :tabindex="3"
            />
        </div>

        <UButton
            type="submit"
            size="lg"
            block
            :tabindex="4"
            :loading="processing"
            :disabled="processing"
            trailing-icon="i-lucide-arrow-right"
            data-test="login-button"
        >
            Log in
        </UButton>

        <USeparator label="or" />

        <p class="text-center text-sm text-muted">
            Don't have an account?
            <TextLink :href="register()" :tabindex="5">Create one</TextLink>
        </p>
    </Form>
</template>
