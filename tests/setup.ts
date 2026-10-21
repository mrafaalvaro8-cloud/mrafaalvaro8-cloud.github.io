import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

/**
 * jsdom memakai satu window bersama, dan berkas tes yang berbeda dapat berjalan
 * di worker berbeda yang memuat setup ini berkali-kali. Tanpa pembersihan,
 * pohon React serta DOM bekas tes sebelumnya bisa tertinggal dan menyebabkan
 * kegagalan sesekali (flaky) — terutama pada tes yang menunggu komponen
 * lazy/async seperti tests/app-smoke.test.tsx.
 */

// Bersihkan penanda khusus yang dipasang komponen & tes.
function bersihkanRootAplikasi() {
  document
    .querySelectorAll('[data-testid="app-root"], #root')
    .forEach((el) => el.remove())
}

beforeEach(() => {
  bersihkanRootAplikasi()
})

afterEach(() => {
  cleanup()
  bersihkanRootAplikasi()
})

