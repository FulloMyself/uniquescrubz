import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'your-repo-name' with your actual repository name
  base: '/uniquescrubz/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // Ensure assets are properly resolved
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})