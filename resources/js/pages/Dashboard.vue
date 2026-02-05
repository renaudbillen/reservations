<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { router } from '@inertiajs/vue3';

const page = usePage();

// Check if current user is Super Admin
const isSuperAdmin = computed(() => {
    const user = page.props.auth?.user;
    return user?.roles?.includes('Super Admin') || false;
});

// Redirect to appropriate dashboard based on role
const redirectToDashboard = () => {
    if (isSuperAdmin.value) {
        router.visit('/admin/dashboard');
    } else {
        router.visit('/user/dashboard');
    }
};

onMounted(() => {
    redirectToDashboard();
});
</script>

<template>
    <Head :title="isSuperAdmin ? 'Tableau de bord Super Admin' : 'Mon Tableau de bord'" />

    <div class="flex items-center justify-center min-h-screen">
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">Redirection vers votre tableau de bord...</p>
        </div>
    </div>
</template>
