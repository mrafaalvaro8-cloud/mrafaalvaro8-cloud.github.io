/**
 * Mekanika napas didaktik berbasis Hukum Boyle (AGENTS.md §7.1).
 *
 * Semua nilai RELATIF terhadap atmosfer (P_atm = 1) dan volume rujukan
 * paru penuh (V_ref = 1). Model sederhana untuk belajar — bukan klinis.
 *
 * Konvensi tanda aliran: flow > 0 = udara MASUK (inspirasi),
 * flow < 0 = udara KELUAR (ekspirasi).
 */

export const P_ATM = 1.0
export const V_REF = 1.0

/** Batas volume relatif agar model tetap stabil (§7.1: "batasi dan haluskan"). */
export const VOLUME_MIN = 0.2
export const VOLUME_MAX = 1.2

export type BreathState = {
  /** Volume rongga dada relatif terhadap volume rujukan (0–1+). */
  volume: number
  /** Tekanan intrapulmoner relatif terhadap atmosfer. */
  pressure: number
  /** Aliran udara: > 0 masuk, < 0 keluar. */
  flow: number
}

export function clampVolume(volume: number): number {
  return Math.min(VOLUME_MAX, Math.max(VOLUME_MIN, volume))
}

/** Hukum Boyle: P = P_atm · (V_ref / V) pada suhu tetap. */
export function pressureFromVolume(
  volume: number,
  vRef: number = V_REF,
  pAtm: number = P_ATM,
): number {
  return pAtm * (vRef / clampVolume(volume))
}

/** Aliran berbanding lurus dengan selisih tekanan (§7.1). */
export function flowFromPressure(
  pressure: number,
  pAtm: number = P_ATM,
  k = 1,
): number {
  return k * (pAtm - pressure)
}

/**
 * Arah aliran untuk ditampilkan: masuk jika tekanan di bawah atmosfer,
 * keluar jika di atas, diam jika setara. ε mencegah jitter di sekitar
 * titik tenang.
 */
export function flowDirection(
  flow: number,
  epsilon = 0.005,
): 'masuk' | 'keluar' | 'diam' {
  if (flow > epsilon) return 'masuk'
  if (flow < -epsilon) return 'keluar'
  return 'diam'
}

export function createBreathState(volume: number = V_REF): BreathState {
  const v = clampVolume(volume)
  const pressure = pressureFromVolume(v)
  return { volume: v, pressure, flow: flowFromPressure(pressure) }
}

/**
 * Majukan simulasi satu langkah menuju volume tujuan (mis. posisi slider
 * diafragma). Smoothing deterministik agar angka mudah diuji.
 */
export function stepBreath(
  state: BreathState,
  targetVolume: number,
  dt = 1 / 60,
  rate = 8,
): BreathState {
  const target = clampVolume(targetVolume)
  const smoothing = Math.min(1, rate * dt)
  const volume = state.volume + (target - state.volume) * smoothing
  const pressure = pressureFromVolume(volume)
  // Turunkan aliran dari selisih tekanan (§7.1): arah aliran SELALU
  // konsisten dengan status tekanan yang ditampilkan (KS M2).
  const flow = flowFromPressure(pressure)
  return { volume, pressure, flow }
}
