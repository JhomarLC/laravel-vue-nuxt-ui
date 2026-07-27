import inertia from '@inertiajs/vite';
import ui from '@nuxt/ui/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.ts'],
            refresh: true,
            fonts: [
                bunny('Public Sans', {
                    weights: [400, 500, 600, 700],
                }),
            ],
        }),
        inertia(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        ui({
            router: 'inertia',
            components: {
                dirs: ['resources/js/components'],
            },
            ui: {
                colors: {
                    primary: 'blue',
                    neutral: 'zinc',
                },
            },
        }),
        wayfinder({
            formVariants: true,
        }),
    ],
});
