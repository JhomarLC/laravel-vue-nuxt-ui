<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { ref } from 'vue';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import PasswordInput from '@/components/PasswordInput.vue';

const open = ref(false);
</script>

<template>
    <div class="mt-4 space-y-4 lg:mt-12">
        <UPageCard
            title="Delete account"
            description="Permanently delete your account and all of its resources."
            variant="naked"
            class="mb-4"
        />

        <UPageCard variant="subtle">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="space-y-1">
                    <p class="text-sm font-medium text-highlighted">Warning</p>
                    <p class="text-sm text-muted">
                        Please proceed with caution, this cannot be undone.
                    </p>
                </div>

                <UButton
                    color="error"
                    label="Delete account"
                    data-test="delete-user-button"
                    @click="open = true"
                />
            </div>
        </UPageCard>

        <UModal
            v-model:open="open"
            title="Are you sure you want to delete your account?"
            description="Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
        >
            <template #body>
                <Form
                    v-bind="ProfileController.destroy.form()"
                    reset-on-success
                    :options="{
                        preserveScroll: true,
                    }"
                    class="space-y-4"
                    v-slot="{ errors, processing, reset, clearErrors }"
                >
                    <UFormField
                        label="Password"
                        name="password"
                        :error="errors.password"
                    >
                        <PasswordInput
                            id="password"
                            name="password"
                            placeholder="Password"
                            class="w-full"
                        />
                    </UFormField>

                    <div class="flex justify-end gap-2">
                        <UButton
                            color="neutral"
                            variant="subtle"
                            type="button"
                            @click="
                                () => {
                                    clearErrors();
                                    reset();
                                    open = false;
                                }
                            "
                        >
                            Cancel
                        </UButton>

                        <UButton
                            type="submit"
                            color="error"
                            :loading="processing"
                            :disabled="processing"
                            data-test="confirm-delete-user-button"
                        >
                            Delete account
                        </UButton>
                    </div>
                </Form>
            </template>
        </UModal>
    </div>
</template>
