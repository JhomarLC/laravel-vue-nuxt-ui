<script setup lang="ts">
import { Form, Head, router } from '@inertiajs/vue3';
import type { DropdownMenuItem, TableColumn } from '@nuxt/ui';
import type { Row } from '@tanstack/vue-table';
import { watchDebounced } from '@vueuse/core';
import { computed, h, ref, resolveComponent, watch } from 'vue';
import UserController from '@/actions/App/Http/Controllers/UserController';
import { getInitials } from '@/composables/useInitials';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { create, edit, index } from '@/routes/users';

type ManagedUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string | null;
};

type PaginatedUsers = {
    data: ManagedUser[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
};

const props = defineProps<{
    users: PaginatedUsers;
    filters: {
        search: string;
    };
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
        ],
    },
});

const UAvatar = resolveComponent('UAvatar');
const UBadge = resolveComponent('UBadge');
const UButton = resolveComponent('UButton');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const search = ref(props.filters.search ?? '');
const userToDelete = ref<ManagedUser | null>(null);
const deleteOpen = ref(false);
const isSearching = ref(false);
const syncingFromServer = ref(false);

watch(
    () => props.filters.search,
    (value) => {
        const next = value ?? '';

        if (search.value === next) {
            isSearching.value = false;

            return;
        }

        syncingFromServer.value = true;
        search.value = next;
        isSearching.value = false;
    },
);

watchDebounced(
    search,
    (value) => {
        if (syncingFromServer.value) {
            syncingFromServer.value = false;

            return;
        }

        const next = value.trim();
        const current = (props.filters.search ?? '').trim();

        if (next === current) {
            return;
        }

        isSearching.value = true;

        router.get(
            index.url({
                query: {
                    search: next || undefined,
                },
            }),
            {},
            {
                preserveState: true,
                replace: true,
                onFinish: () => {
                    isSearching.value = false;
                },
            },
        );
    },
    { debounce: 300 },
);

const columns: TableColumn<ManagedUser>[] = [
    {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => {
            return h('div', { class: 'flex items-center gap-3 min-w-0' }, [
                h(UAvatar, {
                    text: getInitials(row.original.name),
                    size: 'md',
                }),
                h('div', { class: 'min-w-0' }, [
                    h(
                        'p',
                        { class: 'truncate font-medium text-highlighted' },
                        row.original.name,
                    ),
                    h(
                        'p',
                        { class: 'truncate text-sm text-muted' },
                        row.original.email,
                    ),
                ]),
            ]);
        },
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const role = row.getValue('role') as string;

            return h(
                UBadge,
                {
                    class: 'capitalize',
                    variant: 'subtle',
                    color: role === 'admin' ? 'primary' : 'neutral',
                },
                () => role,
            );
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Joined',
        cell: ({ row }) => {
            const value = row.getValue('created_at') as string | null;

            if (!value) {
                return h('span', { class: 'text-muted' }, '—');
            }

            return h(
                'span',
                { class: 'text-muted whitespace-nowrap' },
                new Date(value).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }),
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        meta: {
            class: {
                td: 'text-right w-12',
            },
        },
        cell: ({ row }) => {
            const items = [
                {
                    type: 'label',
                    label: 'Actions',
                },
                {
                    label: 'Edit',
                    icon: 'i-lucide-pencil',
                    onSelect() {
                        router.visit(toUrl(edit(row.original.id))!);
                    },
                },
                {
                    type: 'separator',
                },
                {
                    label: 'Delete',
                    icon: 'i-lucide-trash',
                    color: 'error',
                    onSelect() {
                        confirmDelete(row.original);
                    },
                },
            ] satisfies DropdownMenuItem[];

            return h(
                'div',
                {
                    class: 'flex justify-end',
                    onClick: (event: Event) => event.stopPropagation(),
                },
                [
                    h(
                        UDropdownMenu,
                        {
                            content: {
                                align: 'end',
                            },
                            items,
                            'aria-label': 'Actions dropdown',
                        },
                        () =>
                            h(UButton, {
                                icon: 'i-lucide-ellipsis-vertical',
                                color: 'neutral',
                                variant: 'ghost',
                                size: 'sm',
                                'aria-label': 'Actions dropdown',
                            }),
                    ),
                ],
            );
        },
    },
];

const hasUsers = computed(() => props.users.data.length > 0);
const hasActiveSearch = computed(() => Boolean(props.filters.search));

const resultsLabel = computed(() => {
    const { from, to, total } = props.users;

    if (total === 0) {
        return 'No users';
    }

    if (from === null || to === null) {
        return `${total} ${total === 1 ? 'user' : 'users'}`;
    }

    return `Showing ${from}–${to} of ${total}`;
});

const page = computed({
    get: () => props.users.current_page,
    set: (value: number) => {
        router.get(
            index.url({
                query: {
                    search: search.value || undefined,
                    page: value > 1 ? value : undefined,
                },
            }),
            {},
            { preserveState: true, replace: true },
        );
    },
});

function clearSearch(): void {
    search.value = '';
}

function confirmDelete(user: ManagedUser): void {
    userToDelete.value = user;
    deleteOpen.value = true;
}

function onRowSelect(_event: Event, row: Row<ManagedUser>): void {
    router.visit(toUrl(edit(row.original.id))!);
}
</script>

<template>
    <Head title="Users" />

    <UDashboardPanel id="users">
        <template #header>
            <UDashboardNavbar title="Users">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UColorModeButton />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex flex-col gap-6">
                <div
                    class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div class="space-y-1">
                        <h1 class="text-highlighted text-2xl font-semibold">
                            Users
                        </h1>
                        <p class="text-muted text-sm">
                            Create, update, and manage account access.
                        </p>
                    </div>

                    <UButton
                        :to="toUrl(create())"
                        icon="i-lucide-plus"
                        label="New user"
                        class="w-fit"
                    />
                </div>

                <div
                    class="w-full divide-y divide-default overflow-hidden rounded-lg ring ring-default bg-default"
                >
                    <div
                        class="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <UInput
                            v-model="search"
                            icon="i-lucide-search"
                            placeholder="Search by name or email…"
                            class="w-full max-w-sm"
                            autocomplete="off"
                            :loading="isSearching"
                            :ui="{ trailing: 'pe-1' }"
                        >
                            <template v-if="search && !isSearching" #trailing>
                                <UButton
                                    color="neutral"
                                    variant="link"
                                    size="sm"
                                    icon="i-lucide-x"
                                    aria-label="Clear search"
                                    :padded="false"
                                    @click="clearSearch"
                                />
                            </template>
                        </UInput>

                        <p class="text-sm text-muted whitespace-nowrap">
                            {{ resultsLabel }}
                        </p>
                    </div>

                    <UTable
                        v-if="hasUsers"
                        :data="users.data"
                        :columns="columns"
                        sticky
                        class="max-h-[min(32rem,70vh)]"
                        :ui="{
                            tr: 'cursor-pointer',
                        }"
                        @select="onRowSelect"
                    />

                    <div v-else class="px-4 py-12">
                        <UEmpty
                            icon="i-lucide-users"
                            :title="
                                hasActiveSearch
                                    ? 'No matching users'
                                    : 'No users yet'
                            "
                            :description="
                                hasActiveSearch
                                    ? 'Try a different name or email, or clear your search.'
                                    : 'Add someone to get started with user management.'
                            "
                            :actions="
                                hasActiveSearch
                                    ? [
                                          {
                                              label: 'Clear search',
                                              color: 'neutral',
                                              variant: 'outline',
                                              icon: 'i-lucide-x',
                                              onClick: clearSearch,
                                          },
                                      ]
                                    : [
                                          {
                                              label: 'New user',
                                              to: toUrl(create()),
                                              icon: 'i-lucide-plus',
                                          },
                                      ]
                            "
                        />
                    </div>

                    <div
                        v-if="users.total > 0"
                        class="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <p class="text-sm text-muted">
                            {{ resultsLabel }}
                            <span v-if="hasActiveSearch">
                                for “{{ filters.search }}”
                            </span>
                        </p>

                        <UPagination
                            v-if="users.last_page > 1"
                            v-model:page="page"
                            :total="users.total"
                            :items-per-page="users.per_page"
                            show-edges
                            :sibling-count="1"
                        />
                    </div>
                </div>
            </div>
        </template>
    </UDashboardPanel>

    <UModal
        v-model:open="deleteOpen"
        title="Delete user?"
        :description="
            userToDelete
                ? `This will permanently delete ${userToDelete.name}. This cannot be undone.`
                : undefined
        "
    >
        <template #body>
            <Form
                v-if="userToDelete"
                v-bind="UserController.destroy.form(userToDelete.id)"
                class="flex justify-end gap-2"
                v-slot="{ processing }"
                @success="deleteOpen = false"
            >
                <UButton
                    color="neutral"
                    variant="subtle"
                    type="button"
                    @click="deleteOpen = false"
                >
                    Cancel
                </UButton>
                <UButton
                    type="submit"
                    color="error"
                    :loading="processing"
                    :disabled="processing"
                >
                    Delete
                </UButton>
            </Form>
        </template>
    </UModal>
</template>
