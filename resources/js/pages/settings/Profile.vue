<script setup lang="ts">
import { Form, Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/DeleteUser.vue';
import { edit } from '@/routes/profile';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Profile settings',
                href: edit(),
            },
        ],
    },
});

const page = usePage();
const user = computed(() => page.props.auth.user);
</script>

<template>
    <Head title="Profile settings" />

    <Form
        id="settings-profile"
        v-bind="ProfileController.update.form()"
        v-slot="{ errors, processing }"
    >
        <UPageCard
            title="Profile"
            description="Update your name and email address."
            variant="naked"
            orientation="horizontal"
            class="mb-4"
        >
            <UButton
                form="settings-profile"
                label="Save changes"
                type="submit"
                class="w-fit lg:ms-auto"
                :loading="processing"
                :disabled="processing"
                data-test="update-profile-button"
            />
        </UPageCard>

        <UPageCard variant="subtle">
            <UFormField
                name="name"
                label="Name"
                description="Your public display name."
                required
                :error="errors.name"
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <UInput
                    :default-value="user.name"
                    name="name"
                    autocomplete="name"
                    placeholder="Full name"
                    class="w-full"
                />
            </UFormField>

            <USeparator />

            <UFormField
                name="email"
                label="Email"
                description="Used to sign in and for account notifications."
                required
                :error="errors.email"
                class="flex items-start justify-between gap-4 max-sm:flex-col"
            >
                <UInput
                    type="email"
                    :default-value="user.email"
                    name="email"
                    autocomplete="username"
                    placeholder="Email address"
                    class="w-full"
                />
            </UFormField>
        </UPageCard>
    </Form>

    <DeleteUser />
</template>
