import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';

export default defineConfig({
    plugins: [
        electron([
            {
                entry: 'src/app.ts',
                onstart: (options) => {
                    options.startup();
                },
            },
            {
                entry: 'src/preload.ts',
            },
            {
                entry: 'src/renderer.ts'
            }
        ]),
    ],
    build: {
        rollupOptions: {
            input: {
                main: 'src/renderer.ts',
            },
        },
    }
});
