import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";

export default defineConfig({
    plugins: [
        vue(),
    ],
    base: '/',
    root: process.cwd(),
    server: {
        port: 8081,
        proxy: {
            '/afro': {
                target: loadEnv('development', process.cwd()).VITE_TARGET,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/afro/, ''),
            }
        }
    },
    resolve: {
        alias: {
            "/src": path.resolve(__dirname, "src"),
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "/src/assets/styles/element/index.scss" as *;`,
            },
        },
    },
})
