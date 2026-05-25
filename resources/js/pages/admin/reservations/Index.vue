<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
            <!-- 2x2 Grid Layout for Header -->
            <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <!-- Top Left: Room Selection and Price -->
                <div class="flex flex-col space-y-4">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center space-x-2">
                            <label class="text-sm font-medium text-gray-700"
                                >Salle:</label
                            >
                            <select
                                v-model="selectedRoomId"
                                @change="updateSelectedRoom"
                                class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option
                                    v-for="room in rooms"
                                    :key="room.id"
                                    :value="room.id"
                                >
                                    {{ room.name }}
                                </option>
                            </select>
                        </div>

                        <div v-if="selectedRoom" class="text-sm">
                            <p class="font-medium text-gray-900">
                                {{ selectedRoom.hour_price }}€ / heure
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Top Right: Week Navigation -->
                <div class="flex items-center justify-end space-x-4">
                    <button
                        @click="loadPreviousWeek"
                        class="rounded-full p-2 hover:bg-gray-100"
                        title="Semaine précédente"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>

                    <div class="text-center">
                        <h2 class="text-lg font-semibold">
                            Semaine {{ week }}, {{ year }}
                        </h2>
                        <p class="text-sm text-gray-600">
                            {{ formatDate(weekStartDate) }} -
                            {{ formatDate(weekEndDate) }}
                        </p>
                    </div>

                    <button
                        @click="loadNextWeek"
                        class="rounded-full p-2 hover:bg-gray-100"
                        title="Semaine suivante"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <!-- Bottom Left: Room Image -->
                <div v-if="selectedRoom && selectedRoom.image">
                    <img
                        :src="`${selectedRoom.image}`"
                        :alt="selectedRoom.name"
                        class="h-60 w-full rounded-lg object-cover"
                    />
                </div>
                <div v-else></div>

                <!-- Bottom Right: Action Buttons -->
                <div class="flex flex-col space-y-4 items-end">
                    <Button
                        v-if="can('reservation_create')"
                        @click="router.visit(route('admin.reservations.create'))"
                        rel="noopener"
                        severity="contrast"
                        class="w-full md:w-auto"
                    >
                        Nouvelle réservation
                    </Button>
                    <Button
                        v-if="can('reservation_periodic_create')"
                        @click="
                            router.visit(route('admin.periodicReservations.create'))
                        "
                        rel="noopener"
                        severity="contrast"
                        class="w-full md:w-auto"
                    >
                        Nouvelle réservation périodique
                    </Button>
                </div>
            </div>

            <!-- Schedule Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="border p-2 text-left font-medium">
                                Heure
                            </th>
                            <th
                                v-for="day in days"
                                :key="day"
                                class="border p-2 text-center"
                                :class="{ 'bg-gray-100': isToday(day) }"
                            >
                                <div class="font-medium">
                                    {{ formatDayName(day) }}
                                </div>
                                <div class="text-sm text-gray-600">
                                    {{ formatDay(day) }}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="timeSlot in timeSlots" :key="timeSlot">
                            <td class="border p-2 text-center font-medium">
                                {{ formatTime(timeSlot) }}
                            </td>
                            <td
                                v-for="day in days"
                                :key="`${day}-${timeSlot}`"
                                class="border p-1"
                            >
                                <div
                                    class="flex h-12 items-center justify-center p-2 text-xs"
                                    :class="getTimeSlotClass(day, timeSlot)"
                                    @click="handleTimeSlotClick(day, timeSlot)"
                                >
                                    <span class="text-center">
                                        {{ getReservationInfo(day, timeSlot) }}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import { router, usePage } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItemType } from '@/types';
import { route } from 'ziggy-js';
import { computed, ref } from 'vue';
import { addWeeks, startOfWeek, endOfWeek, format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from 'primevue';
import { usePermissions } from '@/composables/usePermissions';

const props = defineProps({
    week: Number,
    year: Number,
    days: Array,
    rooms: Array,
    reservations: Array,
    vacations: Array,
    timeSlots: Array,
});

const { can } = usePermissions();

// Initialize selected room from localStorage or default to 1
const storedRoomId =
    typeof window !== 'undefined'
        ? localStorage.getItem('selectedRoomId')
        : null;
const selectedRoomId = ref(storedRoomId || 1);

const selectedRoom = computed(() => {
    return props.rooms?.find((room) => room.id == selectedRoomId.value);
});

const updateSelectedRoom = () => {
    // Save selected room to localStorage
    localStorage.setItem('selectedRoomId', selectedRoomId.value);
};

const isSuperAdmin = computed(() => {
    const user = usePage().props.auth?.user;
    return user?.roles?.includes('Super Admin') || false;
});

// Debug: Check if props are being received correctly
console.log('Component props:', {
    reservations: props.reservations?.length || 0,
    rooms: props.rooms?.length || 0,
    timeSlots: props.timeSlots?.length || 0,
    selectedRoomId: selectedRoomId.value,
});

// Format day number (e.g., "01", "15")
const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDate();
};

// Check if a date is today
const isToday = (dateString: string) => {
    const today = new Date().toDateString();
    return new Date(dateString).toDateString() === today;
};

// Format time slot display
const formatTime = (timeSlot: string) => {
    return timeSlot;
};

// Get CSS class for time slot
const getTimeSlotClass = (date: string, timeSlot: string) => {
    const reservation = getReservation(date, timeSlot);
    const vacation = getVacation(date);

    if (vacation) {
        return 'bg-gray-300 hover:bg-gray-400 cursor-not-allowed';
    }
    if (reservation) {
        return 'bg-red-100 hover:bg-red-200 cursor-pointer';
    }
    return 'bg-green-50 hover:bg-green-100 cursor-pointer';
};

// Get reservation for a date and time slot
const getReservation = (date: string, timeSlot: string) => {
    return props.reservations?.find((reservation) => {
        const reservationDate = new Date(reservation.reservation_date);

        return (
            reservationDate.toISOString().split('T')[0] === date &&
            reservation.reservation_time === timeSlot + ':00' &&
            reservation.room_id == selectedRoomId.value
        );
    });
};

// Get vacation for a date
const getVacation = (date: string) => {
    return props.vacations?.find((vacation) => {
        const vacationStart = new Date(vacation.start_date);
        const vacationEnd = new Date(vacation.end_date);
        const currentDate = new Date(date);
        return currentDate >= vacationStart && currentDate <= vacationEnd;
    });
};

// Get display text for a time slot
const getReservationInfo = (date: string, timeSlot: string) => {
    const reservation = getReservation(date, timeSlot);
    const vacation = getVacation(date);

    if (vacation) {
        return vacation.name;
    }

    if (reservation) {
        const page = usePage();
        const currentUserId = page.props.auth?.user?.id;
        const isAdmin = can('reservation_view_all');
        const isReservationOwner = currentUserId === reservation.by_user_id;

        // Show user name only if admin or reservation owner
        if (isAdmin || isReservationOwner) {
            return reservation.for_user?.name || 'Réservé';
        }

        // Otherwise show generic "Reservé"
        return 'Réservé';
    }
    return 'Disponible';
};

// Handle time slot click
const handleTimeSlotClick = (date: string, timeSlot: string) => {
    const reservation = getReservation(date, timeSlot);
    const vacation = getVacation(date);

    if (vacation) {
        // Time slot is blocked by vacation - do nothing
        return;
    }

    if (reservation) {
        // Time slot is reserved
        const isAdmin = can('reservation_view_all');

        if (isAdmin) {
            // Admin can edit the reservation
            router.get(route('admin.reservations.edit', reservation.id));
        } else {
            // Regular user - do nothing
            return;
        }
    } else {
        // Time slot is available - navigate to create page with pre-filled values
        router.get(route('admin.reservations.create'), {
            reservation_date: date,
            reservation_time: timeSlot,
            room_id: selectedRoomId.value,
        });
    }
};

// Helper function to get the current week number and year
const getCurrentWeekAndYear = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
    const currentWeek =
        Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7) - 1;
    return { currentWeek, currentYear: now.getFullYear() };
};

// Check if the current view is in the past compared to the current week
const isPastWeek = (week: number, year: number) => {
    const { currentWeek, currentYear } = getCurrentWeekAndYear();
    return year < currentYear || (year === currentYear && week < currentWeek);
};

// Check if we've reached the 3-week limit
const isThreeWeeksAhead = (week: number, year: number) => {
    if (isSuperAdmin.value) {
        return false;
    }

    const { currentWeek, currentYear } = getCurrentWeekAndYear();
    if (year > currentYear) {
        return week > 2;
    }

    return week >= currentWeek + 3;
};

// Navigation functions
const loadPreviousWeek = () => {
    const currentWeek = parseInt(props.week.toString(), 10);
    const currentYear = parseInt(props.year.toString(), 10);

    // Don't allow going to previous weeks from the current week
    if (isPastWeek(currentWeek - 1, currentYear)) {
        return;
    }

    let prevWeek = currentWeek - 1;
    let prevYear = currentYear;

    if (prevWeek < 1) {
        prevWeek = 52;
        prevYear--;
    }

    router.get(route('admin.reservations.index'), {
        week: prevWeek,
        year: prevYear,
    });
};

const loadNextWeek = () => {
    const currentWeek = parseInt(props.week.toString(), 10);
    const currentYear = parseInt(props.year.toString(), 10);

    // Don't allow going more than 3 weeks ahead
    if (isThreeWeeksAhead(currentWeek, currentYear)) {
        return;
    }

    let nextWeek = currentWeek + 1;
    let nextYear = currentYear;

    if (nextWeek > 52) {
        nextWeek = 1;
        nextYear++;
    }

    router.get(route('admin.reservations.index'), {
        week: nextWeek,
        year: nextYear,
    });
};

// Calculate start and end of week for display
const weekStartDate = computed(() => {
    // Create a date in the current year
    const date = new Date(props.year, 0, 1);
    // Set to the first day of the week (Monday)
    const firstDayOfYear = startOfWeek(date, {
        weekStartsOn: 1,
        locale: fr,
    });
    // Add (week number - 1) weeks to get to the start of the target week
    const targetDate = addWeeks(firstDayOfYear, props.week - 1);
    return format(targetDate, 'yyyy-MM-dd');
});

const weekEndDate = computed(() => {
    const start = parseISO(weekStartDate.value);
    const end = endOfWeek(start, { weekStartsOn: 1, locale: fr });
    return format(end, 'yyyy-MM-dd');
});

// Update the formatDate function to use date-fns
const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'dd/MM/yyyy', { locale: fr });
};

// Update the formatDayName function
const formatDayName = (dateString: string) => {
    return format(parseISO(dateString), 'EEE', { locale: fr });
};

const breadcrumbs: BreadcrumbItemType[] = [
    { title: 'Tableau de bord', href: route('dashboard') },
    { title: 'Réservations', href: route('admin.reservations.index') },
];
</script>
