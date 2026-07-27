<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import type { SelectItem } from '@nuxt/ui';
import { ref } from 'vue';
import UserController from '@/actions/App/Http/Controllers/UserController';
import PasswordInput from '@/components/PasswordInput.vue';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { create, index } from '@/routes/users';

defineProps<{
    roles: SelectItem[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Dashboard',
                href: dashboard(),
            },
            {
                title: 'Users',
                href: index(),
            },
            {
                title: 'New user',
                href: create(),
            },
        ],
    },
});

const role = ref('user');
</script>

<template>
    <Head title="New user" />

    <UDashboardPanel id="users-create">
        <template #header>
            <UDashboardNavbar title="New user">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UColorModeButton />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <Form
                id="create-user"
                v-bind="UserController.store.form()"
                class="mx-auto flex w-full max-w-2xl flex-col gap-6"
                v-slot="{ errors, processing }"
            >
                <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div class="space-y-1">
                        <UButton
                            :to="toUrl(index())"
                            color="neutral"
                            variant="ghost"
                            icon="i-lucide-arrow-left"
                            label="Back to users"
                            class="-ms-2.5 mb-1 w-fit"
                        />
                        <h1 class="text-highlighted text-2xl font-semibold">
                            New user
                        </h1>
                        <p class="text-muted text-sm">
                            Add a new account and assign a role.
                        </p>
                    </div>

                    <UButton
                        form="create-user"
                        type="submit"
                        label="Create user"
                        class="w-fit"
                        :loading="processing"
                        :disabled="processing"
                    />
                </div>

                <UPageCard variant="subtle" class="space-y-4">
                    <UFormField
                        label="Name"
                        name="name"
                        required
                        :error="errors.name"
                    >
                        <UInput
                            name="name"
                            autocomplete="name"
                            placeholder="Full name"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        label="Email"
                        name="email"
                        required
                        :error="errors.email"
                    >
                        <UInput
                            type="email"
                            name="email"
                            autocomplete="username"
                            placeholder="Email address"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        label="Password"
                        name="password"
                        required
                        :error="errors.password"
                    >
                        <PasswordInput
                            name="password"
                            autocomplete="new-password"
                            placeholder="Password"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        label="Confirm password"
                        name="password_confirmation"
                        required
                        :error="errors.password_confirmation"
                    >
                        <PasswordInput
                            name="password_confirmation"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        label="Role"
                        name="role"
                        required
                        :error="errors.role"
                    >
                        <input type="hidden" name="role" :value="role" />
                        <USelect
                            v-model="role"
                            :items="roles"
                            class="w-full"
                        />
                    </UFormField>
                </UPageCard>
            </Form>
        </template>
    </UDashboardPanel>
</template>
