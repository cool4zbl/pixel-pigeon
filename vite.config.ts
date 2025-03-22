import { defineConfig } from 'vite';
export default defineConfig({
    root: '.',
    server: {
        port: 3333
    },
    build: {
        outDir: 'dist',
        lib: {
            entry: 'src/main.ts',
            formats: ['es'],
        },
        rollupOptions: {
            input: 'index.html'
        }
    }
});
