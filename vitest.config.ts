// @ts-nocheck
import * as path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    root: 'src',
    environment: 'happy-dom',
    setupFiles: './src/setupTest.ts',
    coverage: {
      exclude: ['__mocks__', '**/types.ts', './vite-env.d.ts', './setupTest.d.ts', './main.tsx'],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../build/coverage',
    },
  },
})
