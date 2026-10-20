/**
 * Geometri peta perjalanan (SVG) — dipakai TractMap dan JourneyReplay
 * agar posisi stasiun konsisten. Ruang piksel: viewBox 0 0 300 560.
 */

export type Stop = { x: number; y: number }

/** Urutan stasiun sesuai content/stations.ts. */
export const STOPS: Stop[] = [
  { x: 130, y: 46 }, // 1 hidung
  { x: 130, y: 140 }, // 2 faring & laring
  { x: 130, y: 234 }, // 3 trakea
  { x: 130, y: 328 }, // 4 bronkus
  { x: 74, y: 422 }, // 5 alveolus
  { x: 130, y: 516 }, // 6 sel darah merah
  { x: 216, y: 300 }, // 7 pulang (jalur CO₂ kembali ke atas)
]

/** Jalur turun O₂: hidung → … → alveolus → darah. */
export const DOWN_PATH =
  'M 130 46 L 130 140 L 130 234 L 130 328 C 130 380 74 380 74 422 C 74 470 130 470 130 516'

/** Jalur pulang CO₂: darah → … → keluar lewat hidung. */
export const RETURN_PATH =
  'M 130 516 C 190 516 216 440 216 300 C 216 180 222 100 222 40'

/** Sisi label teks agar tidak menimpa jalur. */
export const LABEL_ANCHOR: Array<'start' | 'end'> = [
  'start',
  'start',
  'start',
  'start',
  'start',
  'start',
  'end',
]
