<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="overflow-hidden bg-white p-6 shadow-xl sm:rounded-lg">
            <!-- Week Navigation -->
            <div class="mb-6 flex justify-center">
                <div class="flex items-center space-x-4">
                    <button
                        @click="loadPreviousWeek"
                        class="rounded-full p-2 hover:bg-gray-100"
                        title="Previous week"
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
                            Week {{ week }}, {{ year }}
                        </h2>
                        <p class="text-sm text-gray-600">
                            {{ formatDate(weekStartDate) }} -
                            {{ formatDate(weekEndDate) }}
                        </p>
                    </div>

                    <button
                        @click="loadNextWeek"
                        class="rounded-full p-2 hover:bg-gray-100"
                        title="Next week"
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
            </div>

            <!-- Action Buttons -->
            <div class="mb-6 flex justify-end space-x-4">
                <Button
                    @click="router.visit(route('admin.reservations.create'))"
                    rel="noopener"
                    severity="contrast"
                >
                    New Reservation
                </Button>
                <Button
                    @click="
                        router.visit(route('admin.periodicReservations.create'))
                    "
                    rel="noopener"
                    severity="contrast"
                >
                    New Periodic Reservation
                </Button>
            </div>

            <!-- Schedule Table -->
            <div class="overflow-x-auto">
                <table class="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="border p-2"></th>
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
                        <tr v-for="room in rooms" :key="room.id">
                            <td class="border p-2 font-medium">
                                {{ room.name }}
                            </td>
                            <td
                                v-for="day in days"
                                :key="`${room.id}-${day}`"
                                class="border p-1"
                            >
                                <div class="grid grid-cols-2 gap-1">
                                    <!-- AM Slot -->
                                    <div
                                        class="h-16 p-2 text-xs"
                                        :class="
                                            getTimeSlotClass(room.id, day, 'AM')
                                        "
                                        @click="
                                            handleTimeSlotClick(
                                                room.id,
                                                day,
                                                'AM',
                                            )
                                        "
                                    >
                                        {{
                                            getReservationInfo(
                                                room.id,
                                                day,
                                                'AM',
                                            )
                                        }}
                                    </div>
                                    <!-- PM Slot -->
                                    <div
                                        class="h-16 p-2 text-xs"
                                        :class="
                                            getTimeSlotClass(room.id, day, 'PM')
                                        "
                                        @click="
                                            handleTimeSlotClick(
                                                room.id,
                                                day,
                                                'PM',
                                            )
                                        "
                                    >
                                        {{
                                            getReservationInfo(
                                                room.id,
                                                day,
                                                'PM',
                                            )
                                        }}
                                    </div>
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
import { router } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItemType } from '@/types';
import { route } from 'ziggy-js';
import { computed } from 'vue';
import { addWeeks, startOfWeek, endOfWeek, format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Button } from 'primevue';
import { Plus } from 'lucide-vue-next';

const props = defineProps({
    week: Number,
    year: Number,
    days: Array,
    rooms: Array,
    reservations: Object,
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

// Get CSS class for time slot
const getTimeSlotClass = (
    roomId: number,
    date: string,
    period: 'AM' | 'PM',
) => {
    const reservation = getReservation(roomId, date, period);
    if (reservation) {
        return 'bg-red-100 hover:bg-red-200 cursor-pointer';
    }
    return 'bg-green-50 hover:bg-green-100 cursor-pointer';
};

// Get reservation info for a time slot
const getReservation = (roomId: number, date: string, period: 'AM' | 'PM') => {
    const dayReservations = props.reservations?.[roomId]?.[date];
    if (!dayReservations) return null;

    return dayReservations.find((reservation) => {
        const startHour = new Date(reservation.start_time).getHours();
        const isAM = startHour < 12;
        return (period === 'AM' && isAM) || (period === 'PM' && !isAM);
    });
};

// Get display text for a time slot
const getReservationInfo = (
    roomId: number,
    date: string,
    period: 'AM' | 'PM',
) => {
    const reservation = getReservation(roomId, date, period);
    if (reservation) {
        return reservation.for_user?.name || 'Reserved';
    }
    return 'Available';
};

// Handle time slot click
const handleTimeSlotClick = (
    roomId: number,
    date: string,
    period: 'AM' | 'PM',
) => {
    // Navigate to create page with pre-filled values
    router.get(route('admin.reservations.create'), {
        room_id: roomId,
        date: date,
        period: period,
    });
};

// Navigation functions
const loadPreviousWeek = () => {
    const currentWeek = parseInt(props.week.toString(), 10);
    const currentYear = parseInt(props.year.toString(), 10);

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
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Reservations', href: route('admin.reservations.index') },
];
</script>
