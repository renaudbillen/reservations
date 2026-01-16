<template>
    <Head title="Create User" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="py-6 sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200 bg-white p-6">
                    <h2 class="mb-6 text-2xl font-semibold text-gray-800">
                        Ajouter un nouveau praticien
                    </h2>

                    <form @submit.prevent="submit" autocomplete="off">
                        <div class="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-2">
                            <div>
                                <IftaLabel>
                                    <InputText
                                        id="name"
                                        type="text"
                                        v-model="form.name"
                                        class="w-full"
                                        required
                                    />
                                    <label for="name">Nom</label>
                                </IftaLabel>
                                <div
                                    v-if="form.errors.name"
                                    class="mt-1 text-xs text-red-500"
                                >
                                    {{ form.errors.name }}
                                </div>
                            </div>

                            <div>
                                <IftaLabel>
                                    <InputText
                                        id="email"
                                        type="email"
                                        v-model="form.email"
                                        class="w-full"
                                        required
                                    />
                                    <label for="email">Email</label>
                                </IftaLabel>
                                <div
                                    v-if="form.errors.email"
                                    class="mt-1 text-xs text-red-500"
                                >
                                    {{ form.errors.email }}
                                </div>
                            </div>

                            <div>
                                <IftaLabel>
                                    <Password
                                        id="password"
                                        v-model="form.password"
                                        class="w-full"
                                        inputClass="w-full"
                                        toggleMask
                                        required
                                    />
                                    <label for="password">Mot de passe</label>
                                </IftaLabel>
                                <div
                                    v-if="form.errors.password"
                                    class="mt-1 text-xs text-red-500"
                                >
                                    {{ form.errors.password }}
                                </div>
                            </div>

                            <div>
                                <IftaLabel>
                                    <Password
                                        id="password_confirmation"
                                        v-model="form.password_confirmation"
                                        class="w-full"
                                        inputClass="w-full"
                                        toggleMask
                                        required
                                    />
                                    <label for="password_confirmation"
                                        >Confirmer le mot de passe</label
                                    >
                                </IftaLabel>
                            </div>
                        </div>

                        <div class="mt-8 flex items-center justify-end">
                            <Button
                                @click="router.visit(route('admin.users.index'))"
                                rel="noopener"
                                severity="secondary"
                            >
                                Annuler
                            </Button>

                            <Button
                                type="submit"
                                :disabled="form.processing"
                                severity="contrast"
                                class="ml-1"
                            >
                                <Plus /> Ajouter
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import {
    InputText,
    Password,
    IftaLabel,
    Button,
    useToast,
} from 'primevue';
import { Plus } from 'lucide-vue-next';

interface BreadcrumbItem {
    title: string;
    href: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: route('dashboard'),
    },
    {
        title: 'Praticiens',
        href: route('admin.users.index'),
    },
    {
        title: 'Ajouter un praticien',
        href: route('admin.users.create'),
    },
];

const toast = useToast();

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('admin.users.store'), {
        onSuccess: () => {
            toast.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Praticien créé avec succès',
                life: 3000,
            });
        },
        onError: (errors) => {
            if (Object.keys(errors).length === 0) {
                toast.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Le praticien n\'a pas pu être créé. Veuillez réessayer.',
                    life: 3000,
                });
            }
        },
    });
};
</script>
