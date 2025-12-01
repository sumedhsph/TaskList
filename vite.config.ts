/// <reference types="vitest/config" />  // ← Yeh line add karo – yeh magic hai!

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',  // optional
    coverage: { 
      provider: 'v8',
      reporter: ['text', 'html']  // better reports ke liye
    }
  },
})