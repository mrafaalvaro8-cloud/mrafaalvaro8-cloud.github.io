/**
 * Pertukaran gas (§7.2) — Hukum Fick secara kualitatif:
 * laju difusi sebanding luas permukaan dan gradien tekanan parsial,
 * berbanding terbalik dengan ketebalan dinding. Angka bersifat didaktik
 * (relatif), bukan klinis.
 */

export function diffusionRate(
  surface: number,
  gradient: number,
  thickness: number,
): number {
  if (surface <= 0 || gradient <= 0 || thickness <= 0) return 0
  return (surface * gradient) / thickness
}

/** Tekanan parsial yang "tersedia" untuk berdifusi (didaktik). */
export function partialGradient(high: number, low: number): number {
  return Math.max(0, high - low)
}
