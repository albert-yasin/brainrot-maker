// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'

// Configs File
import configs from './src/configs/configs'
const publicPath =
  process.env.NODE_ENV == 'production' ? configs.PATHWEBAPP : configs.PATHWEBAPP

export default defineConfig({
  plugins: [vue()],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 8080,
  },
  base: publicPath,
  build: {
    // Increase chunk size warning limit (in KB, default is 500 KB)
    chunkSizeWarningLimit: 5000, // 1 MB
  },
})
