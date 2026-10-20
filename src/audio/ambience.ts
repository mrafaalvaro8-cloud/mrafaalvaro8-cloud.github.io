/**
 * Suasana audio (M7) — Web Audio API, diproses 100% lokal, tanpa file &
 * tanpa jaringan. Default volume rendah, hanya mulai setelah interaksi
 * pengguna (aturan autoplay §M7). Gaya "ASMR" sederhana: derau berfilter
 * menyerupai arus napas, plus detak jantung lembut di stasiun darah.
 */

export type AmbienceProfile = {
  /** Frekuensi lowpass — semakin rendah, semakin "dalam". */
  cutoff: number
  gain: number
  beat: boolean
}

const DEFAULT_PROFILE: AmbienceProfile = {
  cutoff: 600,
  gain: 0.04,
  beat: false,
}

const PROFILES: Record<string, AmbienceProfile> = {
  hidung: { cutoff: 1000, gain: 0.05, beat: false },
  'faring-laring': { cutoff: 800, gain: 0.045, beat: false },
  trakea: { cutoff: 650, gain: 0.05, beat: false },
  bronkus: { cutoff: 520, gain: 0.05, beat: false },
  alveolus: { cutoff: 420, gain: 0.04, beat: false },
  'sel-darah-merah': { cutoff: 300, gain: 0.04, beat: true },
  pulang: { cutoff: 1100, gain: 0.05, beat: false },
}

export function profileForStation(stationId: string): AmbienceProfile {
  return PROFILES[stationId] ?? DEFAULT_PROFILE
}

export function isAudioSupported(): boolean {
  return (
    typeof window !== 'undefined' && typeof window.AudioContext !== 'undefined'
  )
}

export type AmbienceController = {
  start: (stationId: string) => boolean
  stop: () => void
  setProfile: (stationId: string) => void
  dispose: () => void
}

function makeNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1
  }
  return buffer
}

export function createAmbience(): AmbienceController {
  let ctx: AudioContext | null = null
  let noise: AudioBufferSourceNode | null = null
  let filter: BiquadFilterNode | null = null
  let master: GainNode | null = null
  let beatTimer: ReturnType<typeof setInterval> | null = null

  const ensure = (): AudioContext | null => {
    if (ctx) return ctx
    if (!isAudioSupported()) return null
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = 0
    filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = DEFAULT_PROFILE.cutoff
    noise = ctx.createBufferSource()
    noise.buffer = makeNoiseBuffer(ctx)
    noise.loop = true
    noise.connect(filter)
    filter.connect(master)
    master.connect(ctx.destination)
    noise.start()
    return ctx
  }

  const thump = () => {
    if (!ctx || !master) return
    const activeCtx: AudioContext = ctx
    const output: GainNode = master
    const now = activeCtx.currentTime
    const beat = (at: number, level: number) => {
      const osc = activeCtx.createOscillator()
      const env = activeCtx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 52
      env.gain.setValueAtTime(0, now + at)
      env.gain.linearRampToValueAtTime(level, now + at + 0.04)
      env.gain.exponentialRampToValueAtTime(0.001, now + at + 0.28)
      osc.connect(env)
      env.connect(output)
      osc.start(now + at)
      osc.stop(now + at + 0.32)
    }
    beat(0, 0.09)
    beat(0.3, 0.05)
  }

  const startBeat = () => {
    if (beatTimer !== null) return
    beatTimer = setInterval(thump, 1300)
    thump()
  }

  const stopBeat = () => {
    if (beatTimer !== null) {
      clearInterval(beatTimer)
      beatTimer = null
    }
  }

  return {
    start(stationId) {
      const active = ensure()
      if (!active || !ctx || !master) return false
      if (active.state === 'suspended') void active.resume()
      const profile = profileForStation(stationId)
      master.gain.linearRampToValueAtTime(
        profile.gain,
        ctx.currentTime + 0.5,
      )
      filter?.frequency.linearRampToValueAtTime(
        profile.cutoff,
        ctx.currentTime + 0.5,
      )
      if (profile.beat) startBeat()
      else stopBeat()
      return true
    },
    stop() {
      if (ctx && master) {
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3)
      }
      stopBeat()
    },
    setProfile(stationId) {
      if (!ctx || !master) return
      const profile = profileForStation(stationId)
      if (master.gain.value > 0.001) {
        master.gain.linearRampToValueAtTime(
          profile.gain,
          ctx.currentTime + 0.5,
        )
        filter?.frequency.linearRampToValueAtTime(
          profile.cutoff,
          ctx.currentTime + 0.5,
        )
      }
      if (profile.beat) startBeat()
      else stopBeat()
    },
    dispose() {
      stopBeat()
      try {
        noise?.stop()
      } catch {
        /* sudah berhenti — abaikan */
      }
      noise = null
      filter = null
      master = null
      void ctx?.close()
      ctx = null
    },
  }
}
