import { AliasOptions, defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
const root = path.resolve(__dirname, 'src');

import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8989',
    //             changeOrigin: true
    //         }
    //     }
    // },
    resolve: {
        alias: {
            '@': root
        } as AliasOptions
    }
});
