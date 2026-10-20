import { describe, expect, it } from 'vitest'
import { stations } from '../src/content/stations'

/**
 * Validasi data stasiun (M1): setiap stasiun wajib memenuhi KS —
 * 3 tingkat penjelasan, 1 interaksi, dan 1 cek pemahaman lengkap (§7.4).
 */
describe('content/stations (M1)', () => {
  it('memuat 7 stasiun berurutan sesuai alur napas', () => {
    expect(stations).toHaveLength(7)
    expect(stations.map((s) => s.id)).toEqual([
      'hidung',
      'faring-laring',
      'trakea',
      'bronkus',
      'alveolus',
      'sel-darah-merah',
      'pulang',
    ])
  })

  it('id unik dan judul tidak kosong', () => {
    const ids = new Set(stations.map((s) => s.id))
    expect(ids.size).toBe(stations.length)
    for (const s of stations) expect(s.title.trim().length).toBeGreaterThan(0)
  })

  it('setiap stasiun punya penjelasan 3 tingkat yang terisi', () => {
    for (const s of stations) {
      expect(s.layers.sd.trim()).not.toBe('')
      expect(s.layers.smp.trim()).not.toBe('')
      expect(s.layers.sma.trim()).not.toBe('')
    }
  })

  it('setiap stasiun punya cek pemahaman lengkap (KS M1 huruf c)', () => {
    for (const s of stations) {
      const q = s.check
      expect(q.type).toBe('mcq')
      expect(q.prompt.trim()).not.toBe('')
      expect(q.explanation.trim()).not.toBe('')
      expect(q.options?.length ?? 0).toBeGreaterThanOrEqual(2)
      // jawaban harus benar-benar salah satu pilihan
      const optionIds = (q.options ?? []).map((o) => o.id)
      expect(optionIds).toContain(q.answer)
      // konsep dicatat untuk sistem penguasaan §8
      expect(q.conceptId.trim()).not.toBe('')
    }
  })

  it('interaksi tiap stasiun tergabung valid dan sumber tercantum', () => {
    const valid = new Set([
      'dust-filter',
      'vocal-cords',
      'cilia',
      'branching',
      'diffusion',
      'hemoglobin',
      'summary',
    ])
    for (const s of stations) {
      expect(valid.has(s.interaction)).toBe(true)
      expect(s.source.length).toBeGreaterThan(0)
    }
    // sesuai rancangan §6: interaksi khas per stasiun
    expect(stations[0].interaction).toBe('dust-filter')
    expect(stations[4].interaction).toBe('diffusion')
    expect(stations[6].interaction).toBe('summary')
  })
})
