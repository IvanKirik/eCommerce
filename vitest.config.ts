import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest-setup.ts',
        include: ['**/*.test.?(c|m)[jt]s?(x)'],
        typecheck: {
            enabled: true,
        },
        coverage: {
            provider: "v8",
        },
    }
})



