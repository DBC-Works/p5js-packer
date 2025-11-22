// @ts-nocheck
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  test: {
    environment: 'happy-dom',
    globals: true,
    root: '',
    setupFiles: 'src/setupTest.ts',
    coverage: {
      exclude: [
        '__mocks__',
        '**/types.ts',
        'src/vite-env.d.ts',
        'src/setupTest.d.ts',
        'src/main.tsx',
        'src/views/GlobalStyles.tsx',
        'src/views/atoms/P5JsSandBox.tsx',
        'src/views/molecules/CodeEditor.tsx',
      ],
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'build/coverage',
    },
  },
})
