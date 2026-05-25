const props = defineProps({
    rooms: {
        type: Array,
        required: true,
    },
    users: {
        type: Array,
        required: true,
    },
    timeSlots: {
        type: Array,
        required: true,
    },
});
