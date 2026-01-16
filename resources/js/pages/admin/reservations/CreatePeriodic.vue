<template>
    <AppLayout title="Créer une réservation périodique" :breadcrumbs="breadcrumbs">
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">
                Créer une réservation périodique
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-3xl sm:px-6 lg:px-8">
                <div
                    class="overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg"
                >
                    <form @submit.prevent="submit" class="space-y-6">
                        <!-- Room Selection -->
                        <div>
                            <label
                                for="room_id"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Room
                            </label>
                            <select
                                id="room_id"
                                v-model="form.room_id"
                                class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                :class="{
                                    'border-red-500': form.errors.room_id,
                                }"
                                required
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
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.room_id }}
                            </p>
                        </div>

                        <!-- Day of Week and Period -->
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    for="day_of_week"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Day of Week
                                </label>
                                <select
                                    id="day_of_week"
                                    v-model="form.day_of_week"
                                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                    :class="{
                                        'border-red-500':
                                            form.errors.day_of_week,
                                    }"
                                    required
                                >
                                    <option value="">Sélectionnez un jour</option>
                                    <option
                                        v-for="(day, index) in daysOfWeek"
                                        :key="index"
                                        :value="index"
                                    >
                                        {{ day }}
                                    </option>
                                </select>
                                <p
                                    v-if="form.errors.day_of_week"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ form.errors.day_of_week }}
                                </p>
                            </div>

                            <div>
                                <label
                                    for="period"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Period
                                </label>
                                <select
                                    id="period"
                                    v-model="form.period"
                                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                    :class="{
                                        'border-red-500': form.errors.period,
                                    }"
                                    required
                                >
                                    <option value="">Sélectionnez une période</option>
                                    <option value="AM">Matin (AM)</option>
                                    <option value="PM">Après-midi (PM)</option>
                                </select>
                                <p
                                    v-if="form.errors.period"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ form.errors.period }}
                                </p>
                            </div>
                        </div>

                        <!-- Date Range -->
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label
                                    for="start_date"
                                    class="block text-sm font-medium text-gray-700"
                                >
                                    Date de début
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    v-model="form.start_date"
                                    :min="minStartDate"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    :class="{
                                        'border-red-500':
                                            form.errors.start_date,
                                    }"
                                    required
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
                                >
                                    Date de fin
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    v-model="form.end_date"
                                    :min="form.start_date || minStartDate"
                                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    :class="{
                                        'border-red-500': form.errors.end_date,
                                    }"
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

                        <!-- User Selection -->
                        <div>
                            <label
                                for="user_id"
                                class="block text-sm font-medium text-gray-700"
                            >
                                User
                            </label>
                            <select
                                id="user_id"
                                v-model="form.user_id"
                                class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                :class="{
                                    'border-red-500': form.errors.user_id,
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
                                v-if="form.errors.user_id"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.user_id }}
                            </p>
                        </div>

                        <!-- Description -->
                        <div>
                            <label
                                for="description"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Description (Optionnel)
                            </label>
                            <textarea
                                id="description"
                                v-model="form.description"
                                rows="3"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                :class="{
                                    'border-red-500': form.errors.description,
                                }"
                            ></textarea>
                            <p
                                v-if="form.errors.description"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ form.errors.description }}
                            </p>
                        </div>

                        <!-- Summary -->
                        <div
                            v-if="
                                form.day_of_week !== null &&
                                form.period &&
                                form.start_date &&
                                form.end_date
                            "
                            class="rounded-md bg-gray-50 p-4"
                        >
                            <h3 class="mb-2 text-sm font-medium text-gray-700">
                                Summary
                            </h3>
                            <p class="text-sm text-gray-600">
                                Cela créera des réservations pour chaque
                                {{ daysOfWeek[form.day_of_week] }}
                                {{ form.period }} du
                                {{ formatDate(form.start_date) }} au
                                {{ formatDate(form.end_date) }}.
                            </p>
                            <p
                                v-if="totalOccurrences > 0"
                                class="mt-2 text-sm font-medium text-indigo-700"
                            >
                                Total des réservations à créer :
                                {{ totalOccurrences }}
                            </p>
                        </div>

                        <!-- Buttons -->
                        <div class="flex justify-end space-x-3 pt-4">
                            <Link
                                :href="route('admin.reservations.index')"
                                class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                :disabled="form.processing || !isFormValid"
                                :class="{
                                    'cursor-not-allowed opacity-50':
                                        form.processing || !isFormValid,
                                }"
                            >
                                <span v-if="form.processing">
                                    <svg
                                        class="mr-2 -ml-1 inline-block h-4 w-4 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Création en cours...
                                </span>
                                <span v-else
                                    >Créer
                                    {{
                                        totalOccurrences > 0
                                            ? `(${totalOccurrences})`
                                            : ''
                                    }}
                                    Réservations</span
                                >
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
import { useForm, Link, router } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';
import { route } from 'ziggy-js';

const breadcrumbs = [
    { title: 'Tableau de bord', href: route('dashboard') },
    { title: 'Réservations', href: route('admin.reservations.index') },
    {
        title: 'Créer une réservation périodique',
        href: route('admin.periodicReservations.create'),
    },
];

const props = defineProps({
    rooms: {
        type: Array as () => Array<{ id: number; name: string }>,
        required: true,
    },
    users: {
        type: Array as () => Array<{ id: number; name: string }>,
        required: true,
    },
});

const daysOfWeek = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
];

const today = new Date();
const minStartDate = today.toISOString().split('T')[0];

const form = useForm({
    room_id: '',
    day_of_week: null as number | null,
    period: 'AM',
    start_date: minStartDate,
    end_date: '',
    user_id: '',
    description: '',
});

// Calculate total occurrences based on the selected date range and day of week
const totalOccurrences = computed(() => {
    if (!form.day_of_week || !form.start_date || !form.end_date) return 0;

    const startDate = new Date(form.start_date);
    const endDate = new Date(form.end_date);

    if (startDate > endDate) return 0;

    // Set to the next occurrence of the selected day
    const currentDate = new Date(startDate);
    const targetDay = parseInt(form.day_of_week as any);

    // Adjust to the next occurrence of the selected day
    const diff = (targetDay - currentDate.getDay() + 7) % 7;
    currentDate.setDate(currentDate.getDate() + diff);

    // If the calculated date is before the start date, add a week
    if (currentDate < startDate) {
        currentDate.setDate(currentDate.getDate() + 7);
    }

    // Count how many times this day occurs in the date range
    let count = 0;
    while (currentDate <= endDate) {
        if (currentDate >= startDate) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 7);
    }

    return count;
});

// Form validation
const isFormValid = computed(() => {
    console.log(totalOccurrences.value);
    return (
        form.room_id &&
        form.day_of_week !== null &&
        form.period &&
        form.start_date &&
        form.end_date &&
        new Date(form.start_date) <= new Date(form.end_date) &&
        totalOccurrences.value > 0
    );
});

// Format date for display
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Submit the form
const submit = () => {
    if (!isFormValid.value) return;

    form.post(route('admin.periodicReservations.store'), {
        onSuccess: () => {
            // Reset form on success
            form.reset();
            form.start_date = minStartDate;
            form.period = 'AM';
        },
        preserveScroll: true,
    });
};
</script>
