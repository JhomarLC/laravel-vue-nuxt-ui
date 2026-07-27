<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import PasswordInput from '@/components/PasswordInput.vue';
import { update } from '@/routes/password';

defineOptions({
    layout: {
        title: 'Reset password',
        description: 'Choose a new password for your account',
    },
});

const props = defineProps<{
    token: string;
    email: string;
    passwordRules: string;
}>();

const inputEmail = ref(props.email);
</script>

<template>
    <Head title="Reset password" />

    <Form
        v-bind="update.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
        class="flex flex-col gap-5"
    >
        <UFormField label="Email" name="email" :error="errors.email">
            <UInput
                id="email"
                type="email"
                name="email"
                icon="i-lucide-mail"
                size="lg"
                autocomplete="email"
                v-model="inputEmail"
                class="w-full"
                readonly
            />
        </UFormField>

        <UFormField
            label="New password"
            name="password"
            help="Use a strong password you don't reuse elsewhere."
            :error="errors.password"
        >
            <PasswordInput
                id="password"
                name="password"
                icon="i-lucide-lock"
                size="lg"
                autocomplete="new-password"
                class="w-full"
                autofocus
                placeholder="New password"
                :passwordrules="passwordRules"
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
                autocomplete="new-password"
                class="w-full"
                placeholder="Confirm password"
                :passwordrules="passwordRules"
            />
        </UFormField>

        <UButton
            type="submit"
            size="lg"
            block
            :loading="processing"
            :disabled="processing"
            trailing-icon="i-lucide-check"
            data-test="reset-password-button"
        >
            Reset password
        </UButton>
    </Form>
</template>
