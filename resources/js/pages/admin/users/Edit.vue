<template>
    <Head :title="`Modifier praticien: ${user.name}`" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="py-6 sm:px-6 lg:px-8">
            <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div class="border-b border-gray-200 bg-white p-6">
                    <div class="mb-6 flex items-center justify-between">
                        <h2 class="text-2xl font-semibold text-gray-800">
                            Modifier praticien : {{ user.name }}
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

                            <div>
                                <IftaLabel>
                                    <InputText
                                        id="email"
                                        v-model="form.email"
                                        type="email"
                                        class="w-full"
                                        :class="{
                                            'p-invalid': form.errors.email,
                                        }"
                                        required
                                    />
                                    <label for="email">Email</label>
                                </IftaLabel>
                                <small v-if="form.errors.email" class="p-error">
                                    {{ form.errors.email }}
                                </small>
                            </div>

                            <div>
                                <IftaLabel>
                                    <Password
                                        v-model="form.password"
                                        :feedback="false"
                                        toggleMask
                                        class="w-full"
                                        inputClass="w-full"
                                        :class="{
                                            'p-invalid': form.errors.password,
                                        }"
                                        placeholder="Laisser vide pour garder le mot de passe"
                                    />
                                    <label for="password">Mot de passe</label>
                                </IftaLabel>
                                <small
                                    v-if="form.errors.password"
                                    class="p-error"
                                >
                                    {{ form.errors.password }}
                                </small>
                            </div>

                            <div>
                                <IftaLabel>
                                    <Password
                                        v-model="form.password_confirmation"
                                        :feedback="false"
                                        toggleMask
                                        class="w-full"
                                        inputClass="w-full"
                                        :class="{
                                            'p-invalid':
                                                form.errors
                                                    .password_confirmation,
                                        }"
                                        placeholder="Confirmer le nouveau mot de passe"
                                    />
                                    <label for="password_confirmation">
                                        Confirmer le mot de passe
                                    </label>
                                </IftaLabel>
                                <small
                                    v-if="form.errors.password_confirmation"
                                    class="p-error"
                                >
                                    {{ form.errors.password_confirmation }}
                                </small>
                            </div>
                        </div>

                        <div class="mt-8 flex items-center justify-end">
                            <Button
                                @click="
                                    router.visit(route('admin.users.index'))
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
                                Modifier le praticien
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
import { Head, useForm, router } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import { InputText, Password, IftaLabel, Button, useToast } from 'primevue';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

const toast = useToast();
const props = defineProps<{
    user: User;
}>();

const form = useForm({
    name: props.user.name,
    email: props.user.email,
    password: '',
    password_confirmation: '',
});

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
        title: `Modifier: ${props.user.name}`,
        href: route('admin.users.edit', props.user.id),
    },
];

const submit = () => {
    form.put(route('admin.users.update', props.user.id), {
        onSuccess: () => {
            toast.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Le praticien a été modifié avec succès',
                life: 3000,
            });
        },
        onError: (errors) => {
            if (Object.keys(errors).length === 0) {
                toast.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Le praticien n\'a pas pu être modifié. Veuillez réessayer',
                    life: 3000,
                });
            }
        },
    });
};
</script>
