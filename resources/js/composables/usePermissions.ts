import { usePage } from '@inertiajs/vue3';

export function usePermissions() {
    const page = usePage();

    const can = (permission: string | string[]): boolean => {
        if (!page.props.auth?.can) return false;

        const permissions = Array.isArray(permission) ? permission : [permission];
        return permissions.some(
            (perm) => page.props.auth?.can?.[perm],
        );
    };

    return { can };
}
