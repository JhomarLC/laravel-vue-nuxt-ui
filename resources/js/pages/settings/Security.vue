<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import PasswordInput from '@/components/PasswordInput.vue';
import { edit } from '@/routes/security';

type Props = {
    passwordRules: string;
};

const props = defineProps<Props>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Security settings',
                href: edit(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Security settings" />

    <Form
        id="settings-security"
        v-bind="SecurityController.update.form()"
        :options="{
            preserveScroll: true,
        }"
        reset-on-success
        :reset-on-error="[
            'password',
            'password_confirmation',
            'current_password',
        ]"
        v-slot="{ errors, processing }"
    >
        <UPageCard
            title="Password"
            description="Ensure your account is using a long, random password to stay secure."
            variant="naked"
            orientation="horizontal"
            class="mb-4"
        >
            <UButton
                form="settings-security"
                label="Save changes"
                type="submit"
                class="w-fit lg:ms-auto"
                :loading="processing"
                :disabled="processing"
                data-test="update-password-button"
            />
        </UPageCard>

        <UPageCard variant="subtle">
            <UFormField
                name="current_password"
                label="Current password"
                :error="errors.current_password"
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <PasswordInput
                    name="current_password"
                    autocomplete="current-password"
                    placeholder="Current password"
                    class="w-full"
                />
            </UFormField>

            <USeparator />

            <UFormField
                name="password"
                label="New password"
                :error="errors.password"
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <PasswordInput
                    name="password"
                    autocomplete="new-password"
                    placeholder="New password"
                    :passwordrules="props.passwordRules"
                    class="w-full"
                />
            </UFormField>

            <USeparator />

            <UFormField
                name="password_confirmation"
                label="Confirm password"
                :error="errors.password_confirmation"
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <PasswordInput
                    name="password_confirmation"
                    autocomplete="new-password"
                    placeholder="Confirm password"
                    :passwordrules="props.passwordRules"
                    class="w-full"
                />
            </UFormField>
        </UPageCard>
    </Form>
</template>
