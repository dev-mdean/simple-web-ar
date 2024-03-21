import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/simple-web-ar/',
  build: {
    outDir: '../dist',
  },
  plugins: [react()],
  root: 'public',
  server: {
    port: 3000,
  },
})
