<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <DataTable
            :title="title"
            :table="table"
            :model="model"
            :fetch-url="route('api.admin.vacations.index')"
            :create-route="route('admin.vacations.create')"
            :edit-route="(item) => route('admin.vacations.edit', item.id)"
            :delete-route="(item) => route('admin.vacations.destroy', item.id)"
            :initial-filters="{
                sort: 'start_date',
                direction: 'desc',
                per_page: 10,
            }"
        >
            <Column field="name" header="Nom" :sortable="true">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
            </Column>
            <Column field="start_date" header="Date de début" :sortable="true">
                <template #body="{ data }">
                    {{ formatDate(data.start_date) }}
                </template>
            </Column>
            <Column field="end_date" header="Date de fin" :sortable="true">
                <template #body="{ data }">
                    {{ formatDate(data.end_date) }}
                </template>
            </Column>
        </DataTable>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import DataTable from '@/components/DataTable.vue';
import Column from 'primevue/column';
import { format } from 'date-fns';
import type { BreadcrumbItemType } from '@/types';
import { route } from 'ziggy-js';

const title = 'vacances';
const table = 'vacations';
const model = 'vacances';

const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
};

const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Tableau de bord', href: route('dashboard') },
    { title: 'Vacances', href: route('admin.vacations.index') },
];
</script>
