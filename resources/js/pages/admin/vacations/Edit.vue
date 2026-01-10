<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="mx-auto max-w-2xl bg-white p-6 shadow-xl sm:rounded-lg">
            <h1 class="mb-6 text-2xl font-semibold text-gray-900">
                Edit Vacation
            </h1>

            <form @submit.prevent="submit">
                <div class="mb-4">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Name</label
                    >
                    <input
                        type="text"
                        id="name"
                        v-model="form.name"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                    <p
                        v-if="form.errors.name"
                        class="mt-1 text-sm text-red-600"
                    >
                        {{ form.errors.name }}
                    </p>
                </div>

                <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label
                            for="start_date"
                            class="block text-sm font-medium text-gray-700"
                            >Start Date</label
                        >
                        <input
                            type="date"
                            id="start_date"
                            v-model="form.start_date"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                            @change="updateEndDateMin"
                        />
                        <p
                            v-if="form.errors.start_date"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.start_date }}
                        </p>
                    </div>
                    <div>
                        <label
                            for="end_date"
                            class="block text-sm font-medium text-gray-700"
                            >End Date</label
                        >
                        <input
                            type="date"
                            id="end_date"
                            v-model="form.end_date"
                            :min="form.start_date"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        <p
                            v-if="form.errors.end_date"
                            class="mt-1 text-sm text-red-600"
                        >
                            {{ form.errors.end_date }}
                        </p>
                    </div>
                </div>

                <div class="flex items-center justify-end space-x-4">
                    <Link
                        :href="route('admin.vacations.index')"
                        class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                        :disabled="form.processing"
                    >
                        Update Vacation
                    </button>
                </div>
            </form>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItemType } from '@/types';
import { route } from 'ziggy-js';

const props = defineProps<{
    vacation: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
    };
}>();

const form = useForm({
    name: props.vacation.name,
    start_date: props.vacation.start_date,
    end_date: props.vacation.end_date,
});

const updateEndDateMin = () => {
    // If end date is before start date, update it to match start date
    if (
        form.start_date &&
        form.end_date &&
        new Date(form.end_date) < new Date(form.start_date)
    ) {
        form.end_date = form.start_date;
    }
};

const submit = () => {
    form.put(route('admin.vacations.update', props.vacation.id));
};

const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Vacations', href: route('admin.vacations.index') },
    { title: 'Edit', href: route('admin.vacations.edit', props.vacation.id) },
];
</script>
