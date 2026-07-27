<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import PasswordInput from '@/components/PasswordInput.vue';
import TextLink from '@/components/TextLink.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';

defineProps<{
    passwordRules: string;
}>();

defineOptions({
    layout: {
        title: 'Create your account',
        description: 'Get started in just a few details',
    },
});
</script>

<template>
    <Head title="Register" />

    <Form
        v-bind="store.form()"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
        class="flex flex-col gap-5"
    >
        <UFormField label="Name" name="name" :error="errors.name">
            <UInput
                id="name"
                type="text"
                name="name"
                icon="i-lucide-user"
                size="lg"
                required
                autofocus
                :tabindex="1"
                autocomplete="name"
                placeholder="Full name"
                class="w-full"
            />
        </UFormField>

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
                :tabindex="2"
                autocomplete="email"
                placeholder="email@example.com"
                class="w-full"
            />
        </UFormField>

        <UFormField
            label="Password"
            name="password"
            help="Use a strong password you don't reuse elsewhere."
            :error="errors.password"
        >
            <PasswordInput
                id="password"
                name="password"
                icon="i-lucide-lock"
                size="lg"
                required
                :tabindex="3"
                autocomplete="new-password"
                placeholder="Create a password"
                :passwordrules="passwordRules"
                class="w-full"
            />
        </UFormField>

        <UFormField
            label="Confirm password"
            name="password_confirmation"
            :error="errors.password_confirmation"
        >
            <PasswordInput
                id="password_confirmation"
                name="password_confirmation"
                icon="i-lucide-lock-keyhole"
                size="lg"
                required
                :tabindex="4"
                autocomplete="new-password"
                placeholder="Confirm password"
                :passwordrules="passwordRules"
                class="w-full"
            />
        </UFormField>

        <UButton
            type="submit"
            size="lg"
            block
            :tabindex="5"
            :loading="processing"
            :disabled="processing"
            trailing-icon="i-lucide-arrow-right"
            data-test="register-user-button"
        >
            Create account
        </UButton>

        <USeparator label="or" />

        <p class="text-center text-sm text-muted">
            Already have an account?
            <TextLink :href="login()" :tabindex="6">Log in</TextLink>
        </p>
    </Form>
</template>
