import path from "path"
import {defineConfig} from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    // Для PDF файлов сохраняем оригинальное имя
                    if (assetInfo.name?.endsWith('.pdf')) {
                        return 'assets/[name][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    base: "/",
    resolve: {
        alias: {
            "@/": `${path.resolve(__dirname, "src")}/`,
        },
    },
})
