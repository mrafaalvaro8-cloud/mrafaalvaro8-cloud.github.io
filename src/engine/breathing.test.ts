import { describe, expect, it } from 'vitest'
import {
  clampVolume,
  createBreathState,
  flowDirection,
  flowFromPressure,
  P_ATM,
  pressureFromVolume,
  stepBreath,
  VOLUME_MAX,
  VOLUME_MIN,
  V_REF,
} from './breathing'

describe('breathing (mekanika napas §7.1)', () => {
  it('P₁·V₁ = P₂·V₂ untuk dua volume apa pun', () => {
    const p1 = pressureFromVolume(1.0)
    const p2 = pressureFromVolume(0.6)
    expect(p1 * 1.0).toBeCloseTo(p2 * 0.6, 10)
  })

  it('tekanan selalu berbanding terbalik dengan volume (KS M2)', () => {
    expect(pressureFromVolume(1.2)).toBeLessThan(P_ATM)
    expect(pressureFromVolume(1.0)).toBeCloseTo(P_ATM, 10)
    expect(pressureFromVolume(0.6)).toBeGreaterThan(P_ATM)
    expect(pressureFromVolume(1.2)).toBeLessThan(pressureFromVolume(0.9))
    expect(pressureFromVolume(0.9)).toBeLessThan(pressureFromVolume(0.7))
  })

  it('KS M2: arah aliran tak pernah berlawanan dengan selisih tekanan', () => {
    // Aliran diturunkan dari tekanan → tak bisa menghasilkan arah yang salah.
    for (const v of [0.5, 0.7, 0.85, 0.95, 0.999, 1, 1.001, 1.1, 1.2, 1.5]) {
      const pressure = pressureFromVolume(v)
      const flow = flowFromPressure(pressure)
      if (pressure < P_ATM) expect(flow).toBeGreaterThan(0)
      else if (pressure > P_ATM) expect(flow).toBeLessThan(0)
      else expect(flow).toBe(0)
    }
  })

  it('aliran diam tepat saat tekanan setara atmosfer (titik tenang)', () => {
    expect(flowFromPressure(pressureFromVolume(V_REF))).toBe(0)
    expect(flowDirection(0)).toBe('diam')
    expect(flowDirection(0.1)).toBe('masuk')
    expect(flowDirection(-0.1)).toBe('keluar')
  })

  it('inspirasi (volume membesar) → masuk; ekspirasi (mengecil) → keluar', () => {
    const state = createBreathState(1.0)
    expect(flowDirection(stepBreath(state, 1.2).flow)).toBe('masuk')
    expect(flowDirection(stepBreath(state, 0.7).flow)).toBe('keluar')
  })

  it('clamp volume di batas model', () => {
    expect(clampVolume(-1)).toBe(VOLUME_MIN)
    expect(clampVolume(5)).toBe(VOLUME_MAX)
    expect(clampVolume(0.5)).toBe(0.5)
  })

  it('stepBreath mendekati target volume dan stabil', () => {
    let state = createBreathState(1.0)
    for (let i = 0; i < 300; i++) {
      state = stepBreath(state, 1.2)
    }
    expect(state.volume).toBeCloseTo(1.2, 3)
    expect(state.pressure).toBeCloseTo(pressureFromVolume(1.2), 6)
    // di ekspansi penuh tekanan < atmosfer → aliran masuk (didaktik §7.1)
    expect(state.flow).toBeGreaterThan(0)
  })
})
