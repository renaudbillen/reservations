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
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                    <option value="">
                                        Sélectionnez une salle
                                    </option>
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
                                        'border-red-300':
                                            form.errors.reservation_date,
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
                        </div>

                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    for="start_time"
                                    class="block text-sm font-medium text-gray-700"
                                    >Heure de début</label
                                >
                                <select
                                    id="start_time"
                                    v-model="form.start_time"
                                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                    :class="{
                                        'border-red-300':
                                            form.errors.start_time,
                                    }"
                                >
                                    <option value="">
                                        Sélectionnez une heure de début
                                    </option>
                                    <option
                                        v-for="timeSlot in timeSlots"
                                        :key="timeSlot"
                                        :value="timeSlot"
                                    >
                                        {{ timeSlot }}
                                    </option>
                                </select>
                                <p
                                    v-if="form.errors.start_time"
                                    class="mt-2 text-sm text-red-600"
                                >
                                    {{ form.errors.start_time }}
                                </p>
                            </div>

                            <div>
                                <label
                                    for="end_time"
                                    class="block text-sm font-medium text-gray-700"
                                    >Heure de fin</label
                                >
                                <select
                                    id="end_time"
                                    v-model="form.end_time"
                                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                    :class="{
                                        'border-red-300': form.errors.end_time,
                                    }"
                                    :disabled="!form.start_time"
                                >
                                    <option value="">
                                        Sélectionnez une heure de fin
                                    </option>
                                    <option
                                        v-for="timeSlot in availableEndTimes"
                                        :key="timeSlot"
                                        :value="timeSlot"
                                    >
                                        {{ timeSlot }}
                                    </option>
                                </select>
                                <p
                                    v-if="form.errors.end_time"
                                    class="mt-2 text-sm text-red-600"
                                >
                                    {{ form.errors.end_time }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="form.start_time && form.end_time"
                            class="rounded-md bg-blue-50 p-4"
                        >
                            <p class="text-sm text-blue-700">
                                Cette réservation créera
                                {{ slotsCount }} créneaux de 30 minutes (de
                                {{ form.start_time }} à {{ form.end_time }})
                            </p>
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
                                class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                :class="{
                                    'border-red-300': form.errors.for_user_id,
                                }"
                            >
                                <option value="">
                                    Sélectionnez un praticien (vous par défaut)
                                </option>
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
                                <span v-if="form.processing"
                                    >Enregistrement...</span
                                >
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
import AppLayout from '@/layouts/AppLayout.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { addWeeks, format, startOfWeek } from 'date-fns';
import { computed, onMounted } from 'vue';
import { route } from 'ziggy-js';

const breadcrumbs = [
    { title: 'Tableau de bord', href: route('dashboard') },
    { title: 'Réservations', href: route('admin.reservations.index') },
    {
        title: 'Créer une réservation',
        href: route('admin.reservations.create'),
    },
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
    timeSlots: {
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

// Calculate available end times based on selected start time
const availableEndTimes = computed(() => {
    if (!form.start_time) return [];

    const startIndex = props.timeSlots.indexOf(form.start_time);
    if (startIndex === -1) return [];

    // Return all time slots after the start time
    return props.timeSlots.slice(startIndex + 1);
});

// Calculate number of 30-minute slots
const slotsCount = computed(() => {
    if (!form.start_time || !form.end_time) return 0;

    const startIndex = props.timeSlots.indexOf(form.start_time);
    const endIndex = props.timeSlots.indexOf(form.end_time);

    if (startIndex === -1 || endIndex === -1) return 0;

    return endIndex - startIndex;
});

const form = useForm({
    room_id: queryParams.get('room_id') || '',
    reservation_date:
        queryParams.get('date') || new Date().toISOString().split('T')[0],
    start_time: queryParams.get('time') || '',
    end_time: '',
    for_user_id: '',
});

// If we have a room_id in the URL but it's not in the rooms list, clear it
onMounted(() => {
    if (form.room_id) {
        const roomExists = props.rooms.some((room) => room.id == form.room_id);
        if (!roomExists) {
            form.room_id = '';
        }
    }
});

const submit = () => {
    form.post(route('admin.reservations.store'));
};
</script>
