<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import type { SelectItem } from '@nuxt/ui';
import { ref } from 'vue';
import UserController from '@/actions/App/Http/Controllers/UserController';
import PasswordInput from '@/components/PasswordInput.vue';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { index } from '@/routes/users';

const props = defineProps<{
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
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
                title: 'Edit user',
                href: index(),
            },
        ],
    },
});

const role = ref(props.user.role);
</script>

<template>
    <Head :title="`Edit ${user.name}`" />

    <UDashboardPanel id="users-edit">
        <template #header>
            <UDashboardNavbar :title="`Edit ${user.name}`">
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
                id="edit-user"
                v-bind="UserController.update.form(user.id)"
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
                            Edit user
                        </h1>
                        <p class="text-muted text-sm">
                            Update account details and role for
                            {{ user.name }}.
                        </p>
                    </div>

                    <UButton
                        form="edit-user"
                        type="submit"
                        label="Save changes"
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
                            :default-value="user.name"
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
                            :default-value="user.email"
                            autocomplete="username"
                            placeholder="Email address"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        label="Password"
                        name="password"
                        description="Leave blank to keep the current password."
                        :error="errors.password"
                    >
                        <PasswordInput
                            name="password"
                            autocomplete="new-password"
                            placeholder="New password"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        label="Confirm password"
                        name="password_confirmation"
                        :error="errors.password_confirmation"
                    >
                        <PasswordInput
                            name="password_confirmation"
                            autocomplete="new-password"
                            placeholder="Confirm new password"
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
