import { describe, expect, it } from 'vitest'
import { airLabel, ciliaSpeed, cleaningRate, effectiveSurface } from './smoke'

describe('smoke (skenario kabut asap §7.3)', () => {
  it('udara bersih: silia penuh, pembersihan penuh, permukaan penuh', () => {
    expect(ciliaSpeed(0)).toBe(1)
    expect(cleaningRate(0)).toBe(1)
    expect(effectiveSurface(0)).toBe(1)
  })

  it('kabut pekat: silia nyaris berhenti, pembersihan & pertukaran menurun', () => {
    expect(ciliaSpeed(1)).toBeLessThan(0.3)
    expect(cleaningRate(1)).toBeLessThan(0.2)
    expect(effectiveSurface(1)).toBeLessThan(0.5)
  })

  it('monoton turun saat partikel naik', () => {
    expect(ciliaSpeed(0.5)).toBeGreaterThan(ciliaSpeed(1))
    expect(cleaningRate(0.5)).toBeGreaterThan(cleaningRate(1))
    expect(effectiveSurface(0.5)).toBeGreaterThan(effectiveSurface(1))
  })

  it('nilai di luar rentang di-clamp ke 0–1', () => {
    expect(ciliaSpeed(-1)).toBe(1)
    expect(ciliaSpeed(2)).toBeCloseTo(ciliaSpeed(1), 10)
  })

  it('label kualitas udara mengikuti kadar partikel', () => {
    expect(airLabel(0)).toBe('sehat')
    expect(airLabel(0.5)).toBe('sedang')
    expect(airLabel(1)).toBe('pekat')
  })
})