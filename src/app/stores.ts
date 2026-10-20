import { create } from 'zustand'
import type { Level } from '../engine/types'
import { applyAnswer } from '../engine/quiz'

/**
 * Store terpisah sesuai §3: progress, settings (store `sim` menyusul saat
 * dibutuhkan lintas fitur). Semua data lokal di perangkat — tanpa akun,
 * tanpa unggah (§9).
 */

type SettingsState = {
  level: Level
  reduceMotion: boolean
  setLevel: (level: Level) => void
  setReduceMotion: (value: boolean) => void
}

// Hormati preferensi sistem sebagai nilai awal (§9), lalu murid bisa
// mengubahnya lewat tombol "Kurangi gerak".
const prefersReducedMotion =
  typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

export const useSettingsStore = create<SettingsState>()((set) => ({
  level: 'smp',
  reduceMotion: prefersReducedMotion,
  setLevel: (level) => set({ level }),
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
}))

type ProgressState = {
  /** questionId → jawaban benar? */
  answers: Record<string, boolean>
  /** conceptId → penguasaan 0–1 (§8) */
  mastery: Record<string, number>
  recordAnswer: (
    questionId: string,
    conceptId: string,
    correct: boolean,
  ) => void
}

export const useProgressStore = create<ProgressState>()((set) => ({
  answers: {},
  mastery: {},
  recordAnswer: (questionId, conceptId, correct) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: correct },
      mastery: {
        ...state.mastery,
        [conceptId]: applyAnswer(state.mastery[conceptId] ?? 0, correct),
      },
    })),
}))
