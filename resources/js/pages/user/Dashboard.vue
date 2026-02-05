<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- User Stats -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">Mes Réservations</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ userStats.totalReservations }}</p>
                        </div>
                        <div class="rounded-full bg-blue-100 p-3">
                            <Calendar class="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">À Venir</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ userStats.upcomingReservations }}</p>
                        </div>
                        <div class="rounded-full bg-green-100 p-3">
                            <Clock class="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">Passées</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ userStats.pastReservations }}</p>
                        </div>
                        <div class="rounded-full bg-gray-100 p-3">
                            <History class="h-6 w-6 text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white">
                <div class="border-b border-gray-200">
                    <nav class="flex -mb-px">
                        <button
                            @click="activeTab = 'upcoming'"
                            :class="[
                                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                                activeTab === 'upcoming'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            ]"
                        >
                            Réservations à Venir
                        </button>
                        <button
                            @click="activeTab = 'past'"
                            :class="[
                                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                                activeTab === 'past'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            ]"
                        >
                            Réservations Passées
                        </button>
                    </nav>
                </div>

                <!-- Upcoming Reservations -->
                <div v-if="activeTab === 'upcoming'" class="p-6">
                    <DataTable
                        :value="upcomingReservations"
                        :paginator="true"
                        :rows="10"
                        class="p-datatable-sm"
                        stripedRows
                        :loading="loading"
                    >
                        <template #empty>
                            <div class="p-4 text-center text-gray-500">
                                Vous n'avez aucune réservation à venir.
                            </div>
                        </template>

                        <Column field="reservation_date" header="Date de réservation">
                            <template #body="slotProps">
                                {{ formatDate(slotProps.data.reservation_date) }}
                            </template>
                        </Column>

                        <Column field="reservation_period" header="Période">
                            <template #body="slotProps">
                                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                      :class="slotProps.data.reservation_period === 'AM' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'">
                                    {{ slotProps.data.reservation_period === 'AM' ? 'Matin' : 'Après-midi' }}
                                </span>
                            </template>
                        </Column>

                        <Column field="room.name" header="Nom de la salle" />

                        <Column field="user.name" header="Réservé par">
                            <template #body="slotProps">
                                {{ slotProps.data.user?.name || 'Moi' }}
                            </template>
                        </Column>

                        <Column header="Actions" style="width: 120px">
                            <template #body="slotProps">
                                <div class="flex space-x-2">
                                    <Button
                                        @click="confirmDelete(slotProps.data)"
                                        size="sm"
                                        variant="outline"
                                        :disabled="!canDelete(slotProps.data)"
                                        :title="!canDelete(slotProps.data) ? 'Suppression impossible (moins de 24h)' : 'Supprimer'"
                                        severity="danger"
                                    >
                                        <Trash class="h-4 w-4" />
                                    </Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>

                <!-- Past Reservations -->
                <div v-if="activeTab === 'past'" class="p-6">
                    <div class="mb-4">
                        <h3 class="text-lg font-semibold text-gray-900">Mes réservations passées</h3>
                        <p class="text-sm text-gray-600 mt-1">Consultation uniquement - les réservations passées ne peuvent être modifiées</p>
                    </div>

                    <DataTable
                        :value="pastReservations"
                        :paginator="true"
                        :rows="10"
                        class="p-datatable-sm"
                        stripedRows
                        :loading="loading"
                    >
                        <template #empty>
                            <div class="p-4 text-center text-gray-500">
                                Vous n'avez aucune réservation passée.
                            </div>
                        </template>

                        <Column field="reservation_date" header="Date de réservation">
                            <template #body="slotProps">
                                {{ formatDate(slotProps.data.reservation_date) }}
                            </template>
                        </Column>

                        <Column field="reservation_period" header="Période">
                            <template #body="slotProps">
                                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                                    {{ slotProps.data.reservation_period === 'AM' ? 'Matin' : 'Après-midi' }}
                                </span>
                            </template>
                        </Column>

                        <Column field="room.name" header="Nom de la salle" />

                        <Column field="user.name" header="Réservé par">
                            <template #body="slotProps">
                                {{ slotProps.data.user?.name || 'Moi' }}
                            </template>
                        </Column>

                        <Column field="status" header="Statut">
                            <template #body="slotProps">
                                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                                    Terminée
                                </span>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

        </div>
    </AppLayout>

    <!-- Delete Confirmation Dialog -->
    <Dialog
        v-model:visible="deleteDialogVisible"
        modal
        :style="{ width: '450px' }"
        header="Confirmer la suppression"
        :closable="!deleteLoading"
    >
        <div class="flex items-center">
            <i class="pi pi-exclamation-triangle mr-3 text-2xl text-orange-500" />
            <span v-if="reservationToDelete">
                Êtes-vous sûr de vouloir supprimer cette réservation du {{ formatDate(reservationToDelete.reservation_date) }} ?
            </span>
        </div>
        <template #footer>
            <div class="flex justify-end gap-2">
                <Button
                    label="Non"
                    variant="outline"
                    :disabled="deleteLoading"
                    @click="deleteDialogVisible = false"
                />
                <Button
                    label="Oui"
                    severity="danger"
                    :loading="deleteLoading"
                    @click="deleteReservation"
                />
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import { format, subDays, isBefore, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { DataTable, Column, Button, Dialog } from 'primevue';
import {
    Calendar,
    Clock,
    History,
    Plus,
    SquarePen,
    Trash,
    User,
    Info,
    AlertCircle
} from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mon Tableau de bord',
        href: '/dashboard',
    },
];

const activeTab = ref('upcoming');
const loading = ref(false);
const deleteDialogVisible = ref(false);
const reservationToDelete = ref(null);
const deleteLoading = ref(false);

const userStats = ref({
    totalReservations: 0,
    upcomingReservations: 0,
    pastReservations: 0,
});

const upcomingReservations = ref([]);
const pastReservations = ref([]);

const formatDate = (date: string) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
};

const canDelete = (reservation: any) => {
    const reservationDate = startOfDay(new Date(reservation.reservation_date));
    const yesterday = subDays(new Date(), 1);
    return isBefore(yesterday, reservationDate);
};

const editReservation = (reservation: any) => {
    router.visit(route('reservations.edit', reservation.id));
};

const confirmDelete = (reservation: any) => {
    if (!canDelete(reservation)) return;
    reservationToDelete.value = reservation;
    deleteDialogVisible.value = true;
};

const deleteReservation = async () => {
    if (!reservationToDelete.value) return;

    deleteLoading.value = true;
    try {
        router.delete(route('reservations.destroy', reservationToDelete.value.id), {
            onSuccess: () => {
                deleteDialogVisible.value = false;
                reservationToDelete.value = null;
                fetchUserReservations();
            },
            preserveScroll: true,
        });
    } catch (error) {
        console.error('Error deleting reservation:', error);
    } finally {
        deleteLoading.value = false;
    }
};

const fetchUserReservations = async () => {
    try {
        loading.value = true;

        // Mock data - in real app, this would be API calls
        const mockUpcoming = [
            {
                id: 1,
                reservation_date: '2026-02-10',
                reservation_period: 'AM',
                room: { name: 'Cabinet A' },
                user: { name: 'Moi' },
            },
            {
                id: 2,
                reservation_date: '2026-02-12',
                reservation_period: 'PM',
                room: { name: 'Cabinet B' },
                user: { name: 'Moi' },
            },
            {
                id: 3,
                reservation_date: '2026-02-15',
                reservation_period: 'AM',
                room: { name: 'Cabinet C' },
                user: { name: 'Dr. Martin' },
            },
        ];

        const mockPast = [
            {
                id: 4,
                reservation_date: '2026-01-28',
                reservation_period: 'PM',
                room: { name: 'Cabinet A' },
                user: { name: 'Moi' },
                status: 'completed',
            },
            {
                id: 5,
                reservation_date: '2026-01-25',
                reservation_period: 'AM',
                room: { name: 'Cabinet B' },
                user: { name: 'Moi' },
                status: 'completed',
            },
        ];

        upcomingReservations.value = mockUpcoming;
        pastReservations.value = mockPast;

        userStats.value = {
            totalReservations: mockUpcoming.length + mockPast.length,
            upcomingReservations: mockUpcoming.length,
            pastReservations: mockPast.length,
        };
    } catch (error) {
        console.error('Error fetching user reservations:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchUserReservations();
});
</script>
