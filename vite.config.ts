import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/simple-web-ar/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [react()],
  publicDir: './assets',
  root: 'src',
  server: {
    port: 3000,
  },
})
