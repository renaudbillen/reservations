<!-- resources/js/components/FlashMessages.vue -->
<template>
    <Toast position="top-right" />
    <Toast position="top-right" group="error" severity="error" />
</template>

<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import { useToast } from 'primevue/usetoast';
import { watch } from 'vue';

const page = usePage();
const toast = useToast();

watch(
    () => page.props.flash,
    () => {
        if (page.props.flash?.success) {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: page.props.flash.success,
                life: 3000,
            });
        }

        if (page.props.flash?.error) {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: page.props.flash.error,
                life: 3000,
                group: 'error',
            });
        }
    },
    { deep: true, immediate: true },
);
</script>
