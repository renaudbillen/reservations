<template>
    <AppLayout :title="`Modifier la réservation #${reservation.id}`">
        <template #header>
            <h2 class="text-xl leading-tight font-semibold text-gray-800">
                Modifier la réservation #{{ reservation.id }}
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
                                >Salle</label
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
                                    :selected="room.id === form.room_id"
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
                                        'border-red-300':
                                            form.errors.reservation_date,
                                    }"
                                    min="2026-01-01"
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
                                    class="mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                                    :class="{
                                        'border-red-300':
                                            form.errors.reservation_period,
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

                        <div class="flex items-center justify-between">
                            <div>
                                <button
                                    type="button"
                                    @click="confirmDelete"
                                    class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Supprimer la réservation
                                </button>
                            </div>
                            <div class="flex space-x-3">
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
                                        >Mise à jour...</span
                                    >
                                    <span v-else>Mettre à jour</span>
                                </button>
                            </div>
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
import { router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

const props = defineProps({
    reservation: {
        type: Array,
    },
});

const form = useForm({
    room_id: props.reservation.room_id,
    reservation_date: props.reservation.reservation_date,
    reservation_period: props.reservation.reservation_period,
    for_user_id: props.reservation.for_user_id,
});

const submit = () => {
    form.post(route('admin.reservations.update', props.reservation.id));
};

const confirmDelete = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
        router.delete(
            route('admin.reservations.destroy', props.reservation.id),
        );
    }
};
</script>
