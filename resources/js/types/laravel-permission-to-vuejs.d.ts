declare module 'laravel-permission-to-vuejs' {
    import { PluginObject } from 'vue';
    
    interface LaravelPermissionToVuejsOptions {
        store: any; // Replace 'any' with your store type if you have it defined
        router: any; // Replace 'any' with your router type if you have it defined
    }

    const LaravelPermissionToVuejs: PluginObject<LaravelPermissionToVuejsOptions>;
    
    export default LaravelPermissionToVuejs;
}
