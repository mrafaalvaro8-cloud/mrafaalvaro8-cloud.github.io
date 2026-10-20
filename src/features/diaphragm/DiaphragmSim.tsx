import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { id } from '../../content/i18n/id'
import {
  diaphragmLesson,
  diaphragmSource,
} from '../../content/lessons/diaphragm'
import {
  createBreathState,
  flowDirection,
  stepBreath,
  type BreathState,
} from '../../engine/breathing'
import type { Level } from '../../engine/types'
import { ChestSvg } from './ChestSvg'
import { DataPanel } from './DataPanel'
import { pressureToY, volumeToX } from './plot'
import { PressureGraph } from './PressureGraph'

/** Slider 0–100% dipetakan ke volume relatif; 60% = titik tenang (V = V_ref = 1). */
const MIN_VOLUME = 0.7
const MAX_VOLUME = 1.2
const REST_PERCENT = 60

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const percentToVolume = (pct: number) =>
  MIN_VOLUME + (pct / 100) * (MAX_VOLUME - MIN_VOLUME)

export function DiaphragmSim() {
  const [mode, setMode] = useState<'perut' | 'dada'>('perut')
  const [level, setLevel] = useState<Level>('smp')

  const sliderRef = useRef<HTMLInputElement>(null)
  const targetRef = useRef(percentToVolume(REST_PERCENT))
  const breathRef = useRef<BreathState>(
    createBreathState(percentToVolume(REST_PERCENT)),
  )
  const lastRef = useRef(0)
  const rafRef = useRef(0)
  const modeRef = useRef(mode)

  // Ref elemen (stabil antar render) — dianimasikan langsung per frame (§11).
  const ribsRef = useRef<SVGGElement>(null)
  const lungsRef = useRef<SVGGElement>(null)
  const diaphragmRef = useRef<SVGPathElement>(null)
  const arrowInRef = useRef<SVGGElement>(null)
  const arrowOutRef = useRef<SVGGElement>(null)
  const volumeRef = useRef<HTMLSpanElement>(null)
  const pressureRef = useRef<HTMLSpanElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)
  const flowRef = useRef<HTMLSpanElement>(null)
  const pointRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  // Satu loop untuk semua update per frame: SVG + teks panel disetel langsung
  // lewat ref sehingga React tidak re-render tiap frame (§11).
  useEffect(() => {
    const t = id.diaphragm

    const apply = (state: BreathState) => {
      const frac = (state.volume - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME)
      // Mode menentukan seberapa besar masing-masing bagian bergerak;
      // fisika (engine) tetap sama untuk kedua mode.
      const ampD = modeRef.current === 'perut' ? 1 : 0.45
      const ampR = modeRef.current === 'dada' ? 1 : 0.55
      const tD = 0.5 + (frac - 0.5) * ampD
      const tR = 0.5 + (frac - 0.5) * ampR

      diaphragmRef.current?.setAttribute(
        'd',
        `M 55 252 Q 200 ${lerp(196, 250, tD).toFixed(1)} 345 252`,
      )
      const scale = lerp(0.9, 1.07, frac)
      lungsRef.current?.setAttribute(
        'transform',
        `translate(200 178) scale(${scale.toFixed(3)}) translate(-200 -178)`,
      )
      ribsRef.current?.setAttribute(
        'transform',
        `translate(0 ${lerp(5, -7, tR).toFixed(1)})`,
      )

      const dir = flowDirection(state.flow)
      const mag = Math.min(1, Math.abs(state.flow) * 6)
      arrowInRef.current?.setAttribute(
        'opacity',
        dir === 'masuk' ? (0.35 + 0.65 * mag).toFixed(2) : '0',
      )
      arrowOutRef.current?.setAttribute(
        'opacity',
        dir === 'keluar' ? (0.35 + 0.65 * mag).toFixed(2) : '0',
      )

      if (volumeRef.current) {
        volumeRef.current.textContent = state.volume.toFixed(2)
      }
      if (pressureRef.current) {
        pressureRef.current.textContent = state.pressure.toFixed(2)
      }
      if (statusRef.current) {
        const eps = 0.005
        statusRef.current.textContent =
          Math.abs(state.pressure - 1) < eps
            ? t.tekananStatus.sama
            : state.pressure < 1
              ? t.tekananStatus.bawah
              : t.tekananStatus.atas
      }
      if (flowRef.current) {
        flowRef.current.textContent = t.aliran[dir]
        flowRef.current.style.color =
          dir === 'masuk'
            ? 'var(--oxygen)'
            : dir === 'keluar'
              ? 'var(--co2)'
              : 'var(--ink-dim)'
      }

      if (pointRef.current) {
        pointRef.current.setAttribute('cx', volumeToX(state.volume).toFixed(1))
        pointRef.current.setAttribute(
          'cy',
          pressureToY(state.pressure).toFixed(1),
        )
      }
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000)
      lastRef.current = now
      breathRef.current = stepBreath(breathRef.current, targetRef.current, dt)
      apply(breathRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    if (typeof requestAnimationFrame === 'function') {
      lastRef.current = performance.now()
      rafRef.current = requestAnimationFrame(tick)
    }
    // Isi panel segera saat mount (juga menangani lingkungan tanpa rAF /
    // tab tersembunyi yang menahan frame): jangan biarkan "—" terlalu lama.
    apply(breathRef.current)
    return () => cancelAnimationFrame(rafRef.current)
  }, []) // semua dependensi berupa ref (stabil)

  const handleSlider = (event: ChangeEvent<HTMLInputElement>) => {
    targetRef.current = percentToVolume(Number(event.target.value))
  }
  const pull = () => {
    targetRef.current = percentToVolume(100)
    if (sliderRef.current) sliderRef.current.value = '100'
  }
  const release = () => {
    targetRef.current = percentToVolume(REST_PERCENT)
    if (sliderRef.current) sliderRef.current.value = String(REST_PERCENT)
  }

  const t = id.diaphragm
  return (
    <section aria-labelledby="judul-diafragma" className="w-full max-w-5xl">
      <h2
        id="judul-diafragma"
        className="mb-1 text-2xl font-bold"
        style={{ color: 'var(--oxygen)' }}
      >
        {t.judul}
      </h2>
      <p className="mb-4 text-sm" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <ChestSvg
            ribs={ribsRef}
            lungs={lungsRef}
            diaphragm={diaphragmRef}
            arrowIn={arrowInRef}
            arrowOut={arrowOutRef}
          />

          {/* Kontrol: slider + tahan-tombol (dua cara, §6 M2) */}
          <div className="mt-4 flex flex-col gap-3">
            <label
              htmlFor="slider-diafragma"
              className="text-sm font-semibold"
            >
              {t.kontrol.slider}
            </label>
            <input
              id="slider-diafragma"
              ref={sliderRef}
              type="range"
              min="0"
              max="100"
              step="1"
              defaultValue={REST_PERCENT}
              onChange={handleSlider}
              aria-label={t.kontrol.slider}
              className="h-11 w-full accent-[var(--oxygen)]"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault()
                  pull()
                }}
                onPointerUp={release}
                onPointerLeave={release}
                onPointerCancel={release}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                    pull()
                  }
                }}
                onKeyUp={release}
                className="min-h-11 min-w-11 rounded-lg px-5 py-2 font-semibold text-[var(--bg-deep)]"
                style={{ background: 'var(--oxygen)' }}
              >
                {t.kontrol.tahan}
              </button>
              <span className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                {t.kontrol.lepasHint}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <DataPanel
            volume={volumeRef}
            pressure={pressureRef}
            status={statusRef}
            flow={flowRef}
          />

          {/* Mode pembanding */}
          <fieldset className="rounded-xl border border-white/10 bg-white/5 p-4">
            <legend className="px-1 text-sm font-semibold">
              {t.modeLabel}
            </legend>
            <div className="flex flex-col gap-2">
              {(['perut', 'dada'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={mode === m}
                  onClick={() => setMode(m)}
                  className={`min-h-11 rounded-lg border px-3 py-2 text-left text-sm ${
                    mode === m ? 'font-semibold' : ''
                  }`}
                  style={{
                    borderColor:
                      mode === m ? 'var(--oxygen)' : 'rgba(255,255,255,0.2)',
                    color: mode === m ? 'var(--oxygen)' : 'var(--ink)',
                  }}
                >
                  {t.mode[m]}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Tingkat penjelasan (§2) + penjelasan dari content/ (§4) */}
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
        <div
          className="mb-3 flex flex-wrap items-center gap-2"
          role="group"
          aria-label={t.levelLabel}
        >
          <span className="text-sm font-semibold">{t.levelLabel}:</span>
          {(['sd', 'smp', 'sma'] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              aria-pressed={level === lv}
              onClick={() => setLevel(lv)}
              className={`min-h-11 rounded-full border px-4 text-sm ${
                level === lv ? 'font-semibold' : ''
              }`}
              style={{
                borderColor:
                  level === lv ? 'var(--mucus)' : 'rgba(255,255,255,0.2)',
                color: level === lv ? 'var(--mucus)' : 'var(--ink)',
              }}
            >
              {t.levels[lv]}
            </button>
          ))}
        </div>
        <p className="text-sm leading-relaxed">{diaphragmLesson[level]}</p>
        <p className="mt-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
          {t.sumber}: {diaphragmSource.join(' · ')}
        </p>
      </div>

      {/* Mode SMA: grafik berjalan P × V (§6 M2) */}
      {level === 'sma' && (
        <div className="mt-4">
          <PressureGraph point={pointRef} />
        </div>
      )}
    </section>
  )
}

export default DiaphragmSim
