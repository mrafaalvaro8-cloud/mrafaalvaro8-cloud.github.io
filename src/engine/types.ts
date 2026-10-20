/** Level kedalaman penjelasan (§2): ringkas=SD, standar=SMP, mendalam=SMA. */
export type Level = 'sd' | 'smp' | 'sma'

/** Soal kuis adaptif (skema §8). */
export type Question = {
  id: string
  conceptId: string
  level: Level
  type: 'mcq' | 'order' | 'label' | 'cause-effect'
  prompt: string
  options?: { id: string; text: string }[]
  answer: string | string[]
  explanation: string
  hint?: string
  source?: string
}

/** Stasiun scrollytelling "Perjalanan Satu Tarikan Napas" (M1, skema §8). */
export type Station = {
  id: string
  title: string
  layers: { sd: string; smp: string; sma: string }
  interaction:
    | 'dust-filter'
    | 'vocal-cords'
    | 'cilia'
    | 'branching'
    | 'diffusion'
    | 'hemoglobin'
    // 'summary' untuk stasiun "Pulang" (ringkasan jalur) — skema §8 asli
    // hanya memuat 6 interaksi padahal ada 7 stasiun.
    | 'summary'
  check: Question
  audio?: string
  model3d?: string
  source: string[]
}

/** Skenario "Hidup Nyata" (M5). */
export type Scenario = {
  id: string
  title: string
  /** Tujuan belajar tertulis — wajib ada (KS M5). */
  learningGoal: string
  source: string[]
}
