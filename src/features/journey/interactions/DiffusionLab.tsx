import { useEffect, useRef, useState } from 'react'
import { id } from '../../../content/i18n/id'
import { diffusionRate } from '../../../engine/gas'

/**
 * Stasiun Alveolus — slider ketebalan dinding memengaruhi laju difusi
 * (Hukum Fick kualitatif §7.2). Angka difusi dihitung engine/ (diuji unit).
 * O₂ (biru) menyeberang ke kanan, CO₂ (kuning) ke kiri — keduanya
 * dianimasikan lewat ref per frame (§11).
 */

const PARTICLES = 8

export function DiffusionLab() {
  const t = id.journey.interaksi.diffusion
  const [thickness, setThickness] = useState(2)
  const thicknessRef = useRef(thickness)
  const o2Refs = useRef<(SVGCircleElement | null)[]>([])
  const co2Refs = useRef<(SVGCircleElement | null)[]>([])
  const posRef = useRef(
    Array.from({ length: PARTICLES }, (_, i) => ({
      x: 20 + (i % 4) * 16,
      y: 66 + Math.floor(i / 4) * 22,
      dir: i % 2 === 0 ? 1 : -1,
    })),
  )
  const rafRef = useRef(0)

  useEffect(() => {
    thicknessRef.current = thickness
  }, [thickness])

  const rate = diffusionRate(1, 1, thickness)

  useEffect(() => {
    const tick = () => {
      // Kecepatan partikel = laju difusi dari engine (diperlambat tebal dinding)
      const speed = 0.3 + rate * 1.6
      for (let i = 0; i < PARTICLES; i++) {
        const p = posRef.current[i]
        const isO2 = i % 2 === 0
        p.x += (isO2 ? speed : -speed)
        if (p.x > 236 || p.x < 14) {
          p.x = isO2 ? 14 : 236
          p.y = 62 + Math.random() * 34
        }
        const el = (isO2 ? o2Refs : co2Refs).current[i]
        el?.setAttribute('cx', p.x.toFixed(1))
        el?.setAttribute('cy', p.y.toFixed(1))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // rate berubah hanya saat slider berubah; loop membaca nilai terbaru lewat closure ini
  }, [rate])

  const wallWidth = Math.max(3, thickness * 3)
  const thin = thickness <= 4

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <svg viewBox="0 0 260 140" role="img" aria-label={t.judul} className="w-full">
        <title>{t.judul}</title>
        {/* Alveolus (kiri) */}
        <path
          d="M 10 34 Q 44 24 62 60 Q 74 96 52 122 Q 24 136 10 108 Z"
          fill="var(--oxygen)"
          fillOpacity="0.14"
          stroke="var(--oxygen)"
          strokeWidth="2.5"
        />
        {/* Dinding yang bisa menebal (slider) */}
        <rect
          x={110 - wallWidth / 2}
          y="20"
          width={wallWidth}
          height="100"
          rx="4"
          fill="var(--tissue)"
          fillOpacity="0.55"
        />
        {/* Kapiler (kanan) */}
        <rect x="176" y="40" width="76" height="60" rx="18" fill="var(--tissue)" fillOpacity="0.25" stroke="var(--tissue)" strokeWidth="2.5" />
        {/* Partikel (dianimasikan lewat ref) */}
        {Array.from({ length: PARTICLES }, (_, i) =>
          i % 2 === 0 ? (
            <circle
              key={`o2-${i}`}
              ref={(el) => {
                o2Refs.current[i] = el
              }}
              r="5"
              fill="var(--oxygen)"
            />
          ) : (
            <circle
              key={`co2-${i}`}
              ref={(el) => {
                co2Refs.current[i] = el
              }}
              r="5"
              fill="var(--co2)"
            />
          ),
        )}
        <text x="34" y="136" fontSize="10" fill="var(--oxygen)">Alveolus (O₂ tinggi)</text>
        <text x="188" y="136" fontSize="10" fill="var(--tissue)">Kapiler darah</text>
      </svg>

      <label htmlFor="tebal-dinding" className="mt-2 block text-sm">
        {t.tebal}: <strong>{thickness}</strong>
      </label>
      <input
        id="tebal-dinding"
        type="range"
        min="1"
        max="10"
        step="1"
        value={thickness}
        onChange={(e) => setThickness(Number(e.target.value))}
        className="h-11 w-full accent-[var(--oxygen)]"
      />
      <p className="mt-1 flex items-baseline gap-2 text-sm">
        {t.laju}: <strong>{rate.toFixed(2)}</strong>
        <span className="text-xs" style={{ color: 'var(--ink-dim)' }}>
          ({id.umum.modelCatatan})
        </span>
      </p>
      <p className="mt-2 text-xs" style={{ color: 'var(--ink-dim)' }} role="status">
        {thin ? t.catatanTipis : t.catatanTebal}
      </p>
    </div>
  )
}
