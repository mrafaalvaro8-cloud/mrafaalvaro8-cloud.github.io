import { describe, expect, it } from 'vitest'
import { applyAnswer, pickNextConcept } from './quiz'

describe('quiz (sistem penguasaan §8)', () => {
  it('benar menaikkan mastery sesuai rumus 0.15·(1−m)', () => {
    expect(applyAnswer(0, true)).toBeCloseTo(0.15, 10)
    expect(applyAnswer(0.5, true)).toBeCloseTo(0.575, 10)
    // mastery mendekati 1 tapi tak pernah melebihi 1
    expect(applyAnswer(0.99, true)).toBeLessThanOrEqual(1)
    expect(applyAnswer(0.99, true)).toBeGreaterThan(0.99)
  })

  it('salah menurunkan mastery sesuai rumus 0.2·m', () => {
    expect(applyAnswer(0.5, false)).toBeCloseTo(0.4, 10)
    expect(applyAnswer(1, false)).toBeCloseTo(0.8, 10)
    expect(applyAnswer(0, false)).toBe(0)
  })

  it('mastery selalu berada di [0, 1]', () => {
    expect(applyAnswer(-1, true)).toBeGreaterThanOrEqual(0)
    expect(applyAnswer(5, false)).toBeLessThanOrEqual(1)
    // NaN diperlakukan sebagai 0: benar menaikkan ke 0.15, salah tetap 0
    expect(applyAnswer(Number.NaN, true)).toBeCloseTo(0.15, 10)
    expect(applyAnswer(Number.NaN, false)).toBe(0)
  })

  it('pemilihan konsep berikutnya = penguasaan terendah', () => {
    expect(pickNextConcept({ a: 0.8, b: 0.2, c: 0.5 }, ['a', 'b', 'c'])).toBe('b')
    expect(pickNextConcept({}, ['x', 'y'])).toBe('x')
    expect(pickNextConcept({ a: 1 }, [])).toBe(null)
  })
})
