<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
            <div class="mb-6 flex items-center justify-between">
                <h1 class="text-2xl font-semibold text-gray-900">Vacations</h1>
                <Button
                    @click="router.visit(route('admin.vacations.create'))"
                    class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-900"
                >
                    <Plus /> Add
                </Button>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                Start Date
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                            >
                                End Date
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="vacation in vacations" :key="vacation.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    {{ vacation.name }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">
                                    {{ formatDate(vacation.start_date) }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-500">
                                    {{ formatDate(vacation.end_date) }}
                                </div>
                            </td>
                            <td
                                class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap"
                            >
                                <div class="flex space-x-2">
                                    <Button
                                        @click="
                                            router.visit(
                                                route(
                                                    'admin.vacations.edit',
                                                    vacation.id,
                                                ),
                                            )
                                        "
                                        rel="noopener"
                                        severity="info"
                                    >
                                        <SquarePen class="h-5 w-5" /> Edit
                                    </Button>
                                    <Button
                                        @click="deleteVacation(vacation)"
                                        rel="noopener"
                                        severity="danger"
                                    >
                                        <Trash class="h-5 w-5" /> Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="vacations.length === 0">
                            <td
                                colspan="3"
                                class="px-6 py-4 text-center text-sm text-gray-500"
                            >
                                No vacations found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Dialog
            v-model:visible="showDeleteDialog"
            modal
            :style="{ width: '450px' }"
            header="Confirm Deletion"
            :closable="!isDeleting"
            :showHeader="true"
            :dismissableMask="!isDeleting"
        >
            <div class="flex items-center justify-center">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="vacationToDelete">
                    Are you sure you want to delete this vacation?
                </span>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button
                        type="button"
                        label="No"
                        icon="pi pi-times"
                        class="p-button-text"
                        :disabled="isDeleting"
                        @click="showDeleteDialog = false"
                    />
                    <Button
                        type="button"
                        label="Yes"
                        icon="pi pi-check"
                        class="p-button-danger"
                        :loading="isDeleting"
                        @click="confirmDelete"
                    />
                </div>
            </template>
        </Dialog>
    </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { format } from 'date-fns';
import type { BreadcrumbItemType } from '@/types';
import { Button, Dialog } from 'primevue';
import { route } from 'ziggy-js';
import { Plus, SquarePen, Trash } from 'lucide-vue-next';

const props = defineProps<{
    vacations: Array<{
        id: number;
        name: string;
        start_date: string;
        end_date: string;
    }>;
}>();

const showDeleteDialog = ref(false);
const isDeleting = ref(false);
const vacationToDelete = ref<{ id: number; name: string } | null>(null);

const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
};

const deleteVacation = (vacation: { id: number; name: string }) => {
    vacationToDelete.value = vacation;
    showDeleteDialog.value = true;
};

const confirmDelete = async () => {
    if (!vacationToDelete.value) return;

    isDeleting.value = true;
    try {
        router.delete(
            route('admin.vacations.destroy', vacationToDelete.value.id),
        );
    } finally {
        isDeleting.value = false;
        showDeleteDialog.value = false;
        vacationToDelete.value = null;
    }
};

const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Vacations', href: route('admin.vacations.index') },
];
</script>
