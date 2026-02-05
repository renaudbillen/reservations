<template>
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <!-- Stats Cards -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-4">
                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">Total Réservations</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.totalReservations }}</p>
                        </div>
                        <div class="rounded-full bg-blue-100 p-3">
                            <Calendar class="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">Réservations du Mois</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.monthlyReservations }}</p>
                        </div>
                        <div class="rounded-full bg-green-100 p-3">
                            <TrendingUp class="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">Utilisateurs Actifs</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.activeUsers }}</p>
                        </div>
                        <div class="rounded-full bg-purple-100 p-3">
                            <Users class="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div class="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <div class="flex items-center">
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-gray-500">Salles Disponibles</h3>
                            <p class="text-2xl font-bold text-gray-900">{{ stats.availableRooms }}</p>
                        </div>
                        <div class="rounded-full bg-orange-100 p-3">
                            <Home class="h-6 w-6 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Future Reservations Table -->
            <div class="relative flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">Réservations à Venir</h3>
                    <Button
                        @click="router.visit(route('admin.reservations.index'))"
                        variant="outline"
                        size="sm"
                    >
                        Voir tout
                    </Button>
                </div>

                <DataTable
                    :value="futureReservations"
                    :paginator="true"
                    :rows="10"
                    class="p-datatable-sm"
                    stripedRows
                >
                    <template #empty>
                        <div class="p-4 text-center text-gray-500">
                            Pas de réservations à venir trouvées.
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

                    <Column field="user.name" header="Réservé par" />

                    <Column field="for_user.name" header="Pour">
                        <template #body="slotProps">
                            {{ slotProps.data.for_user?.name || '-' }}
                        </template>
                    </Column>

                    <Column header="Actions" style="width: 120px">
                        <template #body="slotProps">
                            <div class="flex space-x-2">
                                <Button
                                    @click="confirmDelete(slotProps.data)"
                                    size="sm"
                                    variant="outline"
                                    title="Supprimer"
                                    severity="danger"
                                >
                                    <Trash class="h-4 w-4" />
                                </Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <!-- Quick Actions -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                    <div class="space-y-3">
                        <Button
                            @click="router.visit(route('admin.reservations.create'))"
                            class="w-full justify-start"
                            variant="outline"
                        >
                            <Plus class="h-4 w-4 mr-2" />
                            Nouvelle Réservation
                        </Button>
                        <Button
                            @click="router.visit(route('admin.users.create'))"
                            class="w-full justify-start"
                            variant="outline"
                        >
                            <UserPlus class="h-4 w-4 mr-2" />
                            Ajouter Utilisateur
                        </Button>
                    </div>
                </div>

                <div class="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-white p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
                    <div class="space-y-2">
                        <Button
                            @click="router.visit(route('admin.reservations.index'))"
                            class="w-full justify-start"
                            variant="ghost"
                        >
                            <Calendar class="h-4 w-4 mr-2" />
                            Gestion des Réservations
                        </Button>
                        <Button
                            @click="router.visit(route('admin.users.index'))"
                            class="w-full justify-start"
                            variant="ghost"
                        >
                            <Users class="h-4 w-4 mr-2" />
                            Gestion des Utilisateurs
                        </Button>
                        <Button
                            @click="router.visit(route('admin.vacations.index'))"
                            class="w-full justify-start"
                            variant="ghost"
                        >
                            <CalendarX class="h-4 w-4 mr-2" />
                            Gestion des Vacances
                        </Button>
                    </div>
                </div>
            </div>
        </div>

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
    </AppLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { DataTable, Column, Button, Dialog } from 'primevue';
import {
    Calendar,
    TrendingUp,
    Users,
    Home,
    Plus,
    UserPlus,
    CalendarX,
    Trash
} from 'lucide-vue-next';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/admin/dashboard',
    },
];

const stats = ref({
    totalReservations: 0,
    monthlyReservations: 0,
    activeUsers: 0,
    availableRooms: 0,
});

const futureReservations = ref([]);
const deleteDialogVisible = ref(false);
const reservationToDelete = ref(null);
const deleteLoading = ref(false);

const formatDate = (date: string) => {
    return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
};

const confirmDelete = (reservation: any) => {
    reservationToDelete.value = reservation;
    deleteDialogVisible.value = true;
};

const deleteReservation = async () => {
    if (!reservationToDelete.value) return;

    deleteLoading.value = true;
    try {
        router.delete(route('admin.reservations.destroy', reservationToDelete.value.id), {
            onSuccess: () => {
                deleteDialogVisible.value = false;
                reservationToDelete.value = null;
                fetchDashboardData();
            },
            preserveScroll: true,
        });
    } catch (error) {
        console.error('Error deleting reservation:', error);
    } finally {
        deleteLoading.value = false;
    }
};

const fetchDashboardData = async () => {
    try {
        // Fetch real data from API
        const response = await fetch('/admin/dashboard-data');
        const data = await response.json();

        stats.value = data.stats;
        futureReservations.value = data.futureReservations;
    } catch (error) {
        console.error('Error fetching dashboard data:', error);

        // Fallback to mock data if API fails
        stats.value = {
            totalReservations: 1247,
            monthlyReservations: 89,
            activeUsers: 45,
            availableRooms: 8,
        };
    }
};

onMounted(() => {
    fetchDashboardData();
});
</script>
