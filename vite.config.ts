/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NAPAS — Belajar Sistem Pernapasan',
        short_name: 'NAPAS',
        description:
          'Website pembelajaran IPA sistem pernapasan manusia yang interaktif dan immersif.',
        lang: 'id',
        dir: 'ltr',
        id: '.',
        scope: '.',
        categories: ['education'],
        theme_color: '#0A1020',
        background_color: '#0A1020',
        display: 'standalone',
        start_url: '.',
        // Chrome Android butuh raster 192/512px (+ maskable) agar bisa
        // "Tambahkan ke layar utama". Dihasilkan scripts/generate_icons.py.
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
          { src: 'icons/icon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        // Precache shell + konten teks + aset 2D (AGENTS.md §10);
        // aset 3D/audio berat dicache saat pertama dipakai, bukan precache.
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
  },
})
