<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="py-6 sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200 bg-white p-6">
                    <div class="mb-6 flex items-center justify-between">
                        <h2 class="text-2xl font-semibold text-gray-800">
                            Modifier les vacances: {{ vacation.name }}
                        </h2>
                    </div>

                    <form @submit.prevent="submit" autocomplete="off">
                        <div class="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-2">
                            <div>
                                <IftaLabel>
                                    <InputText
                                        id="name"
                                        v-model="form.name"
                                        type="text"
                                        class="w-full"
                                        :class="{
                                            'p-invalid': form.errors.name,
                                        }"
                                        required
                                    />
                                    <label for="name">Nom</label>
                                </IftaLabel>
                                <small v-if="form.errors.name" class="p-error">
                                    {{ form.errors.name }}
                                </small>
                            </div>

                            <div
                                class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2"
                            >
                                <div>
                                    <label
                                        for="start_date"
                                        class="block text-sm font-medium text-gray-700"
                                        >Date de début</label
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
                                        >Date de fin</label
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
                        </div>

                        <div class="mt-8 flex items-center justify-end">
                            <Button
                                @click="
                                    router.visit(route('admin.vacations.index'))
                                "
                                rel="noopener"
                                severity="secondary"
                                class="mr-2"
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                :loading="form.processing"
                                severity="info"
                            >
                                Sauver
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { router, useForm } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItemType } from '@/types';
import { route } from 'ziggy-js';
import { Button, IftaLabel, InputText } from 'primevue';

const props = defineProps<{
    vacation: {
        id: number;
        name: string;
        start_date: string;
        end_date: string;
    };
}>();

const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const form = useForm({
    name: props.vacation.name,
    start_date: formatDateForInput(props.vacation.start_date),
    end_date: formatDateForInput(props.vacation.end_date),
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
    { title: 'Tableau de bord', href: route('dashboard') },
    { title: 'Vacances', href: route('admin.vacations.index') },
    { title: 'Modifier', href: route('admin.vacations.edit', props.vacation.id) },
];
</script>
