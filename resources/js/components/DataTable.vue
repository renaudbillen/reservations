<template>
    <div class="overflow-hidden rounded-lg bg-white shadow">
        <div class="flex items-center justify-between px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 capitalize">
                {{ title }}
            </h3>

            <div v-if="can.user_create">
                <Button
                    @click="router.visit(props.createRoute)"
                    class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-900"
                >
                    <Plus /> Ajouter {{ model }}
                </Button>
            </div>
        </div>

        <!-- Search input -->
        <div class="px-4 py-3 sm:px-6" v-if="showSearch">
            <div class="flex">
                <div class="relative max-w-md grow">
                    <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                        <svg
                            class="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        v-model="filters.search"
                        class="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                        :placeholder="`Rechercher ${title.toLowerCase()}...`"
                        @keyup.enter="fetchData"
                    />
                </div>
            </div>
        </div>

        <div class="pr-5 pl-5">
            <DataTable
                :value="data.data"
                :paginator="true"
                :rows="filters.per_page"
                :totalRecords="data.total"
                :lazy="true"
                :loading="loading"
                :sortField="filters.sort"
                :sortOrder="filters.direction === 'asc' ? 1 : -1"
                @page="onPageChange($event)"
                @sort="onSort($event)"
                class="p-datatable-sm"
                :rowsPerPageOptions="[10, 20, 50]"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="{first} à {last} de {totalRecords} enregistrement(s)"
                :first="(data.current_page - 1) * filters.per_page"
                stripedRows
                scrollable
            >
                <template #empty>
                    <div class="p-4 text-center text-gray-500">
                        Pas de {{ title.toLowerCase() }} trouvé.
                    </div>
                </template>
                <template #loading>
                    <div class="p-4 text-center">
                        Chargement {{ title.toLowerCase() }}. Veuillez
                        patienter...
                    </div>
                </template>

                <slot></slot>

                <Column
                    v-if="(can.user_edit || can.user_destroy) && showActions"
                    :exportable="false"
                    style="width: 12rem"
                >
                    <template #body="slotProps">
                        <div class="flex space-x-2">
                            <Button
                                @click="
                                    router.visit(
                                        props.editRoute(slotProps.data),
                                    )
                                "
                                rel="noopener"
                                severity="info"
                            >
                                <SquarePen class="h-5 w-5" /> Modifier
                            </Button>
                            <Button
                                v-if="can.user_destroy"
                                @click="handleDelete(slotProps.data)"
                                severity="danger"
                            >
                                <Trash class="h-5 w-5" /> Supprimer
                            </Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog
            v-model:visible="visible"
            modal
            :style="{ width: '450px' }"
            header="Confirmer la suppression"
            :closable="!deleteLoading"
            :showHeader="true"
            :dismissableMask="!deleteLoading"
        >
            <div class="flex items-center justify-center">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="itemToDelete">
                    Etes-vous sûr de vouloir supprimer ce
                    {{ model.toLowerCase() }}?
                </span>
            </div>
            <template #footer>
                <div class="flex justify-end gap-2">
                    <Button
                        type="button"
                        label="Non"
                        class="p-button-secondary"
                        :disabled="deleteLoading"
                        @click="visible = false"
                    />
                    <Button
                        type="button"
                        label="Oui"
                        class="p-button-danger"
                        :loading="deleteLoading"
                        @click="confirmDelete"
                    />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { SquarePen, Trash, Plus } from 'lucide-vue-next';
import { DataTable, Column, Button, Dialog, useToast } from 'primevue';

type SortDirection = 'asc' | 'desc';

interface Props {
    title: string;
    table: string;
    model: string;
    fetchUrl: string;
    createRoute: string;
    editRoute: (item: any) => string;
    deleteRoute: (item: any) => string;
    initialFilters?: {
        sort?: string;
        direction?: SortDirection;
        per_page?: number;
    };
    showSearch?: boolean;
    showActions?: boolean;
}

const page = usePage();
const toast = useToast();
const can = computed(() => page.props.auth.can);

const visible = ref(false);
const itemToDelete = ref<any>(null);
const deleteLoading = ref(false);

const props = withDefaults(defineProps<Props>(), {
    showSearch: true,
    showActions: true,
    initialFilters: () => ({
        sort: 'created_at',
        direction: 'desc' as SortDirection,
        per_page: 10,
    }),
});

const loading = ref(false);
const data = ref({
    data: [],
    current_page: 1,
    from: 0,
    to: 0,
    total: 0,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
});

const filters = reactive({
    page: 1,
    per_page: props.initialFilters.per_page || 10,
    sort: props.initialFilters.sort || 'created_at',
    direction: props.initialFilters.direction || 'desc',
    search: '',
});

const fetchData = async () => {
    try {
        loading.value = true;
        const params = new URLSearchParams();

        // Add pagination
        params.append('page', filters.page.toString());
        params.append('per_page', filters.per_page.toString());

        // Add sorting
        params.append('sort', filters.sort);
        params.append('direction', filters.direction);

        // Add search if exists
        if (filters.search) {
            params.append('search', filters.search);
        }

        const url = `${props.fetchUrl}?${params.toString()}`;
        const response = await axios.get(url);
        data.value = response.data[props.table] || response.data;
    } catch (error) {
        console.error(`Error fetching ${props.table.toLowerCase()}:`, error);
    } finally {
        loading.value = false;
    }
};

const handleDelete = (item: any) => {
    itemToDelete.value = item;
    visible.value = true;
};

const confirmDelete = async () => {
    if (!itemToDelete.value) return;

    deleteLoading.value = true;
    try {
        router.delete(props.deleteRoute(itemToDelete.value), {
            onSuccess: () => {
                fetchData();
            },
            preserveScroll: true,
            preserveState: false,
        });
    } catch (error) {
        console.error('Error deleting item:', error);
    } finally {
        deleteLoading.value = false;
        visible.value = false;
    }
};

const onPageChange = (event: any) => {
    filters.page = event.page + 1;
    filters.per_page = event.rows;
};

const onSort = (event: any) => {
    filters.sort = event.sortField as string;
    filters.direction = event.sortOrder === 1 ? 'asc' : 'desc';
};

watch(
    () => ({ ...filters }),
    () => {
        fetchData();
    },
    { immediate: true },
);

onMounted(() => {
    if (page.props.flash?.success) {
        toast.add({
            severity: 'success',
            summary: 'Succès',
            detail: page.props.flash.success,
            life: 3000,
        });
    }

    if (page.props.flash?.warning) {
        toast.add({
            severity: 'warn',
            summary: 'Attention',
            detail: page.props.flash.warning,
            life: 3000,
        });
    }

    if (page.props.flash?.error) {
        toast.add({
            severity: 'error',
            summary: 'Erreur',
            detail: page.props.flash.error,
            life: 3000,
        });
    }
});
</script>
