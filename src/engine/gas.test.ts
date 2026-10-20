import { describe, expect, it } from 'vitest'
import { diffusionRate, partialGradient } from './gas'

describe('gas (Hukum Fick kualitatif §7.2)', () => {
  it('laju sebanding luas permukaan', () => {
    expect(diffusionRate(2, 1, 1)).toBeCloseTo(2 * diffusionRate(1, 1, 1), 10)
  })

  it('laju sebanding gradien tekanan parsial', () => {
    expect(diffusionRate(1, 3, 1)).toBeCloseTo(3 * diffusionRate(1, 1, 1), 10)
  })

  it('laju berbanding terbalik dengan ketebalan dinding', () => {
    const tipis = diffusionRate(1, 1, 1)
    expect(diffusionRate(1, 1, 2)).toBeCloseTo(tipis / 2, 10)
    expect(diffusionRate(1, 1, 0.5)).toBeCloseTo(tipis * 2, 10)
  })

  it('nilai nol atau negatif tidak menghasilkan difusi', () => {
    expect(diffusionRate(0, 1, 1)).toBe(0)
    expect(diffusionRate(1, 0, 1)).toBe(0)
    expect(diffusionRate(1, 1, 0)).toBe(0)
    expect(diffusionRate(-1, 1, 1)).toBe(0)
  })

  it('gradien tak pernah negatif (gas bergerak menuruni gradien)', () => {
    expect(partialGradient(100, 40)).toBe(60)
    expect(partialGradient(40, 100)).toBe(0)
  })
})
