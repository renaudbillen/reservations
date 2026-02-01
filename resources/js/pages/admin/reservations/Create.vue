<template>
    <AppLayout title="Créer une réservation" :breadcrumbs="breadcrumbs">
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">
                Créer une réservation
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg"
                >
                    <form @submit.prevent="submit" class="space-y-6">
                        <div>
                            <label
                                for="room_id"
                                class="block text-sm font-medium text-gray-700"
                                >Cabinet</label
                            >
                            <select
                                id="room_id"
                                v-model="form.room_id"
                                class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                :class="{
                                    'border-red-300 text-red-900':
                                        form.errors.room_id,
                                }"
                            >
                                <option value="">Sélectionnez une salle</option>
                                <option
                                    v-for="room in rooms"
                                    :key="room.id"
                                    :value="room.id"
                                >
                                    {{ room.name }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.room_id"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.room_id }}
                            </p>
                        </div>

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    for="reservation_date"
                                    class="block text-sm font-medium text-gray-700"
                                    >Date de réservation</label
                                >
                                <input
                                    type="date"
                                    id="reservation_date"
                                    v-model="form.reservation_date"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    :class="{
                                        'border-red-300': form.errors.reservation_date,
                                    }"
                                    min="2026-01-01"
                                    :max="maxDate"
                                />
                                <p
                                    v-if="form.errors.reservation_date"
                                    class="mt-2 text-sm text-red-600"
                                >
                                    {{ form.errors.reservation_date }}
                                </p>
                            </div>

                            <div>
                                <label
                                    for="reservation_period"
                                    class="block text-sm font-medium text-gray-700"
                                    >Période</label
                                >
                                <select
                                    id="reservation_period"
                                    v-model="form.reservation_period"
                                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    :class="{
                                        'border-red-300': form.errors.reservation_period,
                                    }"
                                >
                                    <option value="">Sélectionnez une période</option>
                                    <option value="AM">Matin (AM)</option>
                                    <option value="PM">Après-midi (PM)</option>
                                </select>
                                <p
                                    v-if="form.errors.reservation_period"
                                    class="mt-2 text-sm text-red-600"
                                >
                                    {{ form.errors.reservation_period }}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label
                                for="for_user_id"
                                class="block text-sm font-medium text-gray-700"
                                >Réservation pour</label
                            >
                            <select
                                id="for_user_id"
                                v-model="form.for_user_id"
                                class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                :class="{
                                    'border-red-300': form.errors.for_user_id,
                                }"
                            >
                                <option value="">Sélectionnez un praticien (vous par défaut)</option>
                                <option
                                    v-for="user in users"
                                    :key="user.id"
                                    :value="user.id"
                                >
                                    {{ user.name }}
                                </option>
                            </select>
                            <p
                                v-if="form.errors.for_user_id"
                                class="mt-2 text-sm text-red-600"
                            >
                                {{ form.errors.for_user_id }}
                            </p>
                        </div>

                        <div class="flex justify-end space-x-3">
                            <Link
                                :href="route('admin.reservations.index')"
                                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                :disabled="form.processing"
                            >
                                <span v-if="form.processing">Enregistrement...</span>
                                <span v-else>Enregistrer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { useForm, Link } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import { route } from 'ziggy-js';
import { onMounted, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { addWeeks, startOfWeek, format } from 'date-fns';

const breadcrumbs = [
    { title: 'Tableau de bord', href: route('dashboard') },
    { title: 'Réservations', href: route('admin.reservations.index') },
    { title: 'Créer une réservation', href: route('admin.reservations.create') },
];

const props = defineProps({
    rooms: {
        type: Array,
        required: true,
    },
    users: {
        type: Array,
        required: true,
    },
});

const page = usePage();
const queryParams = new URLSearchParams(window.location.search);

// Check if current user is Super Admin
const isSuperAdmin = computed(() => {
    const user = page.props.auth?.user;
    return user?.roles?.includes('Super Admin') || false;
});

// Calculate max date (3 full weeks after current week) for non-Super Admin users
const maxDate = computed(() => {
    if (isSuperAdmin.value) {
        return null; // No restriction for Super Admin
    }
    const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
    const currentWeekEnd = addWeeks(currentWeekStart, 1); // Start of next week
    const maxAllowedDate = addWeeks(currentWeekEnd, 3); // 3 full weeks after current week
    const maxDateSaturday = new Date(maxAllowedDate);
    maxDateSaturday.setDate(maxDateSaturday.getDate() - 1); // Subtract 1 day to end on Saturday
    return format(maxDateSaturday, 'yyyy-MM-dd');
});

const form = useForm({
    room_id: queryParams.get('room_id') || '',
    reservation_date: queryParams.get('date') || new Date().toISOString().split('T')[0],
    reservation_period: (queryParams.get('period') as 'AM' | 'PM') || 'AM',
    for_user_id: '',
});

// If we have a room_id in the URL but it's not in the rooms list, clear it
onMounted(() => {
    if (form.room_id) {
        const roomExists = props.rooms.some(room => room.id == form.room_id);
        if (!roomExists) {
            form.room_id = '';
        }
    }
});

const submit = () => {
    form.post(route('admin.reservations.store'));
};
</script>
