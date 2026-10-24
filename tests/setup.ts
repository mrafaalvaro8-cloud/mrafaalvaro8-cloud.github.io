import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { useProgressStore, useSettingsStore } from '../src/app/stores'

/**
 * jsdom memakai satu window bersama, dan berkas tes yang berbeda dapat berjalan
 * di worker berbeda yang memuat setup ini berkali-kali. Tanpa pembersihan,
 * pohon React serta DOM bekas tes sebelumnya bisa tertinggal dan menyebabkan
 * kegagalan sesekali (flaky) — terutama pada tes yang menunggu komponen
 * lazy/async di berbagai berkas tes.
 */

// Bersihkan penanda khusus yang dipasang komponen & tes.
function bersihkanRootAplikasi() {
  document
    .querySelectorAll('[data-testid="app-root"], #root')
    .forEach((el) => el.remove())
}

beforeEach(async () => {
  bersihkanRootAplikasi()
  // Store di-persist ke IndexedDB (bersama antar berkas tes), jadi jawab
  // satu soal di satu berkas tidak boleh mengunci soal itu di berkas lain.
  // clearStorage() dipanggil lebih dulu agar hydration susulan tidak
  // mengembalikan state berkas tes sebelumnya.
  useProgressStore.setState({ answers: {}, mastery: {} })
  await useProgressStore.persist.clearStorage()
  await useSettingsStore.persist.clearStorage()
  useSettingsStore.setState({ level: 'smp' })
})

afterEach(() => {
  cleanup()
  bersihkanRootAplikasi()
})
