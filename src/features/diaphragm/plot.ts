/** Pemetaan nilai engine → piksel area plot grafik P × V (mode SMA). */

/** V ∈ [0.55, 1.35] → x ∈ [40, 310]; P ∈ [0.7, 1.9] → y ∈ [170, 16]. */
export function volumeToX(v: number): number {
  return 40 + ((v - 0.55) / 0.8) * 270
}

export function pressureToY(p: number): number {
  return 170 - ((p - 0.7) / 1.2) * 154
}

/** Kurva P = P_atm·(V_ref / V) — hiperbola Boyle, V_ref = 1. */
export const boyleCurvePath = (() => {
  const points: string[] = []
  const steps = 64
  for (let i = 0; i <= steps; i++) {
    const v = 0.55 + (i / steps) * 0.8
    const p = 1 / v
    points.push(`${volumeToX(v).toFixed(1)} ${pressureToY(p).toFixed(1)}`)
  }
  return `M ${points.join(' L ')}`
})()
