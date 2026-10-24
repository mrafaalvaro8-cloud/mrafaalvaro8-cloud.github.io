/**
 * Skenario "Hari berkabut asap" (§7.3): partikel PM2.5 memperlambat silia
 * dan menurunkan pertukaran gas. Angka didaktik (relatif 0–1), bukan klinis.
 * `particle` = kadar partikel 0 (udara bersih) s.d. 1 (kabut asap pekat).
 */

/** Faktor kecepatan sapuan silia: 1 = sehat, meluruh ke 0 saat pekat. */
export function ciliaSpeed(particle: number): number {
  const p = clampParticle(particle)
  return 1 - 0.8 * p
}

/** Fraksi lendir berdebu yang berhasil dikeluarkan (0–1). */
export function cleaningRate(particle: number): number {
  const p = clampParticle(particle)
  return 1 - 0.9 * p
}

/**
 * Efektivitas pertukaran gas di alveolus. Asap merusak silia (lendir menumpuk)
 * dan mengiritasi dinding (menebal) sehingga ruang gas efektif menyusut (§7.3).
 * Dipakai lewat `diffusionRate` — luas permukaan efektif turun.
 */
export function effectiveSurface(particle: number): number {
  const p = clampParticle(particle)
  return 1 - 0.6 * p
}

/** Label kualitas udara didaktik sesuai kadar partikel. */
export function airLabel(particle: number): 'sehat' | 'sedang' | 'pekat' {
  const p = clampParticle(particle)
  if (p < 0.34) return 'sehat'
  if (p < 0.67) return 'sedang'
  return 'pekat'
}

function clampParticle(particle: number): number {
  return Math.min(1, Math.max(0, particle))
}