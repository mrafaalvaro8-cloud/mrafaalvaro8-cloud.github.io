import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createStore, del, get, set as idbSet } from 'idb-keyval'
import type { Level } from '../engine/types'
import { applyAnswer } from '../engine/quiz'

/**
 * Store terpisah sesuai §3: progress, settings (store `sim` menyusul saat
 * dibutuhkan lintas fitur). Semua data lokal di perangkat lewat IndexedDB
 * (idb-keyval, §3) — tanpa akun, tanpa unggah (§9). Progres dan pilihan
 * murid bertahan walau halaman ditutup atau internet putus.
 */

const idbStore = createStore('napas', 'zustand')

// Jalur alternatif (§10): peramban tanpa IndexedDB (mode pribadi, WebView
// lama) tetap menyimpan progres lewat localStorage.
const idbJSON = createJSONStorage(() =>
  typeof indexedDB === 'undefined'
    ? window.localStorage
    : {
        getItem: (name: string) =>
          get<string>(name, idbStore).then((value) => value ?? null),
        setItem: (name: string, value: string) => idbSet(name, value, idbStore),
        removeItem: (name: string) => del(name, idbStore),
      },
)

type SettingsState = {
  level: Level
  reduceMotion: boolean
  setLevel: (level: Level) => void
  setReduceMotion: (value: boolean) => void
}

// Hormati preferensi sistem saat pertama kali dibuka (§9), lalu pilihan
// murid yang tersimpan (atau tombol "Kurangi gerak") yang berlaku.
const prefersReducedMotion =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      level: 'smp',
      reduceMotion: prefersReducedMotion,
      setLevel: (level) => set({ level }),
      setReduceMotion: (reduceMotion) => set({ reduceMotion }),
    }),
    { name: 'settings', storage: idbJSON },
  ),
)

type ProgressState = {
  /** questionId → pilihan murid, jawaban pertama (§8) */
  answers: Record<string, string>
  /** conceptId → penguasaan 0–1 (§8) */
  mastery: Record<string, number>
  recordAnswer: (
    questionId: string,
    optionId: string,
    conceptId: string,
    correct: boolean,
  ) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      answers: {},
      mastery: {},
      recordAnswer: (questionId, optionId, conceptId, correct) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: optionId },
          mastery: {
            ...state.mastery,
            [conceptId]: applyAnswer(state.mastery[conceptId] ?? 0, correct),
          },
        })),
    }),
    { name: 'progress', storage: idbJSON },
  ),
)
