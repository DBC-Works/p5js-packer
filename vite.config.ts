import react from '@vitejs/plugin-react-swc'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.BASE_PATH ?? '/',
    plugins: [react({ jsxImportSource: '@emotion/react' }), tsconfigPaths()],
    build: {
      minify: 'terser',
    },
    server: {
      open: true,
    },
  }
})
