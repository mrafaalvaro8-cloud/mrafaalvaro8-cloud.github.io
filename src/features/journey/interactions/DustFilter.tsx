import { useEffect, useRef, useState } from 'react'
import { id } from '../../../content/i18n/id'

/**
 * Stasiun Hidung — "menembakkan" partikel debu ke lendir (KS M1 huruf a).
 * Klik/tap debu untuk menjebaknya; jalur keyboard = tombol "Semprot lendir".
 * Update posisi per frame lewat ref (tanpa re-render per frame, §11).
 */

const SLOTS = 12
const MUCUS_Y = 148
const FLOOR_Y = 196
// Radius area sentuh (koordinat viewBox 260×200): ±18 unit ≈ 45px di layar
// 360px — jari anak harus bisa mengenai debu, bukan cuma titik 4px (§5).
const HIT_RADIUS = 18
const VISUAL_RADIUS = 4

type DustState = {
  active: boolean
  caught: boolean
  x: number
  y: number
  vy: number
  glow: number
}

const makeDust = (): DustState => ({
  active: false,
  caught: false,
  x: 0,
  y: 0,
  vy: 0,
  glow: 0,
})

export function DustFilter() {
  const t = id.journey.interaksi.dustFilter
  const groupRefs = useRef<(SVGGElement | null)[]>([])
  const circleRefs = useRef<(SVGCircleElement | null)[]>([])
  const slotsRef = useRef<DustState[]>(Array.from({ length: SLOTS }, makeDust))
  const spawnRef = useRef(0)
  const rafRef = useRef(0)
  const [caught, setCaught] = useState(0)
  const [escaped, setEscaped] = useState(0)

  useEffect(() => {
    const slots = slotsRef.current
    const spawn = () => {
      const free = slots.find((s) => !s.active)
      if (!free) return
      free.active = true
      free.caught = false
      free.glow = 0
      free.x = 26 + Math.random() * 208
      free.y = -8
      free.vy = 0.45 + Math.random() * 0.5
    }

    const tick = () => {
      spawnRef.current += 1
      if (spawnRef.current % 42 === 0) spawn()

      for (let i = 0; i < slots.length; i++) {
        const s = slots[i]
        const group = groupRefs.current[i]
        const visual = circleRefs.current[i]
        if (!s.active || !group || !visual) continue
        if (s.caught) {
          // Terbang ke lendir, berkilau hijau, lalu hilang tersapu
          s.y += (MUCUS_Y - s.y) * 0.12
          s.glow += 1
          if (s.glow > 55) {
            s.active = false
            group.setAttribute('display', 'none')
            continue
          }
          visual.setAttribute('fill', 'var(--mucus)')
          visual.setAttribute('r', String(VISUAL_RADIUS + Math.sin(s.glow * 0.4) * 1.5))
        } else {
          s.y += s.vy
          if (s.y > FLOOR_Y) {
            s.active = false
            group.setAttribute('display', 'none')
            setEscaped((n) => n + 1)
            continue
          }
        }
        // Posisi lewat transform pada <g>: satu setel per frame untuk seluruh
        // grup (visual + area sentuh), tetap tanpa re-render React (§11).
        group.setAttribute('transform', `translate(${s.x.toFixed(1)} ${s.y.toFixed(1)})`)
        group.setAttribute('display', '')
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    spawn()
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const catchOne = (index: number) => {
    const s = slotsRef.current[index]
    if (s?.active && !s.caught) {
      s.caught = true
      setCaught((n) => n + 1)
    }
  }

  const sprayMucus = () => {
    for (const s of slotsRef.current) {
      if (s.active && !s.caught) {
        s.caught = true
        setCaught((n) => n + 1)
      }
    }
  }

  const perfect = caught >= 4 && escaped === 0

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <svg
        viewBox="0 0 260 200"
        role="img"
        aria-label={t.judul}
        className="interaktif w-full"
      >
        <title>{t.judul}</title>
        {/* Rongga hidung (penampang sederhana) */}
        <path
          d="M 8 8 Q 60 20 70 70 Q 76 110 60 140 L 46 196"
          fill="none"
          stroke="var(--ink-dim)"
          strokeWidth="4"
        />
        <path
          d="M 252 8 Q 200 20 190 70 Q 184 110 200 140 L 214 196"
          fill="none"
          stroke="var(--ink-dim)"
          strokeWidth="4"
        />
        {/* Lapisan lendir penyaring */}
        <rect
          x="40"
          y={MUCUS_Y - 7}
          width="180"
          height="14"
          rx="7"
          fill="var(--mucus)"
          fillOpacity="0.55"
        />
        {/* Lubang masuk tenggorokan */}
        <path
          d="M 96 196 Q 130 178 164 196"
          fill="none"
          stroke="var(--tissue)"
          strokeWidth="4"
        />
        {/* Kuota debu (dianimasikan lewat ref): lingkaran besar tak terlihat
            sebagai area sentuh + lingkaran kecil sebagai visualnya */}
        {Array.from({ length: SLOTS }, (_, i) => (
          <g
            key={i}
            ref={(el) => {
              groupRefs.current[i] = el
            }}
            display="none"
            className="interaktif"
            onClick={() => catchOne(i)}
            aria-hidden="true"
          >
            <circle r={HIT_RADIUS} fill="none" pointerEvents="all" />
            <circle
              ref={(el) => {
                circleRefs.current[i] = el
              }}
              r={VISUAL_RADIUS}
              fill="var(--ink-dim)"
            />
          </g>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={sprayMucus}
          className="min-h-11 rounded-lg px-4 text-sm font-semibold text-[var(--bg-deep)]"
          style={{ background: 'var(--mucus)' }}
        >
          {t.semprot}
        </button>
        <p className="text-sm">
          {t.tertangkap}: <strong>{caught}</strong> · {t.lolos}:{' '}
          <strong>{escaped}</strong>
        </p>
        <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>
          {t.modelCatatan}
        </p>
      </div>
      <p className="mt-2 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {perfect ? t.keteranganSehat : escaped > 0 ? t.keteranganBocor : ''}
      </p>
    </div>
  )
}
