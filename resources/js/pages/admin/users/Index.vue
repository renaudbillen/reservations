<template>
    <Head :title="title" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <DataTable
            :title="title"
            :table="table"
            :model="model"
            :fetch-url="route('api.admin.users.index')"
            :create-route="route('admin.users.create')"
            :edit-route="(user) => route('admin.users.edit', user.id)"
            :delete-route="(user) => route('admin.users.destroy', user.id)"
            :initial-filters="{
                sort: 'created_at',
                direction: 'desc',
                per_page: 10,
            }"
        >
            <Column field="name" header="Nom" :sortable="true">
                <template #body="{ data }">
                    <div class="font-medium text-gray-500">
                        {{ data.name }}
                    </div>
                </template>
            </Column>

            <Column field="email" header="Email" :sortable="true">
                <template #body="{ data }">
                    <div class="text-gray-500">
                        {{ data.email }}
                    </div>
                </template>
            </Column>

            <Column field="created_at" header="Date de création" :sortable="true">
                <template #body="{ data }">
                    <div class="text-gray-500">
                        {{ formatDate(data.created_at) }}
                    </div>
                </template>
            </Column>
        </DataTable>
    </AppLayout>
</template>

<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
import Column from 'primevue/column';
import { route } from 'ziggy-js';

const title = 'praticiens';
const table = 'users';
const model = 'praticien';

const breadcrumbs = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
    },
    {
        title: 'Praticiens',
        href: route('admin.users.index'),
    },
];

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
</script>
