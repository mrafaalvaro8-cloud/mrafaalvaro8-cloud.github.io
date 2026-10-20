/**
 * Sistem penguasaan konsep (§8) — murni tanpa DOM.
 * Benar  → mastery += 0.15 · (1 − mastery)
 * Salah  → mastery −= 0.2 · mastery
 * Nilai selalu dijaga di [0, 1]; tidak ada hukuman keluar permainan.
 */

function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0
  return Math.min(1, Math.max(0, value))
}

export function applyAnswer(mastery: number, correct: boolean): number {
  const current = clamp01(mastery)
  const next = correct
    ? current + 0.15 * (1 - current)
    : current - 0.2 * current
  return clamp01(next)
}

/**
 * Pemilihan konsep berikutnya (§8): prioritaskan konsep dengan penguasaan
 * terendah. Mengembalikan conceptId atau null bila daftar kosong.
 */
export function pickNextConcept(
  mastery: Record<string, number>,
  conceptIds: readonly string[],
): string | null {
  let best: string | null = null
  let bestScore = Number.POSITIVE_INFINITY
  for (const id of conceptIds) {
    const score = clamp01(mastery[id] ?? 0)
    if (score < bestScore) {
      bestScore = score
      best = id
    }
  }
  return best
}
