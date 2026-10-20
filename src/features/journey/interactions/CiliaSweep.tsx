import { useEffect, useRef, useState } from 'react'
import { id } from '../../../content/i18n/id'

/**
 * Stasiun Trakea — sapuan silia yang diperlambat oleh asap rokok
 * (KS M1 huruf a). Toggle membandingkan kondisi sehat vs asap;
 * sapuan & lendir dianimasikan per frame lewat ref (§11).
 */

const CILIA = 16

export function CiliaSweep() {
  const t = id.journey.interaksi.cilia
  const [asap, setAsap] = useState(false)
  const asapRef = useRef(asap)
  const ciliaRefs = useRef<(SVGLineElement | null)[]>([])
  const blobRef = useRef<SVGEllipseElement>(null)
  const blobXRef = useRef(24)
  const frameRef = useRef(0)
  const rafRef = useRef(0)
  const [keluar, setKeluar] = useState(0)
  const [tertahan, setTertahan] = useState(0)

  useEffect(() => {
    asapRef.current = asap
  }, [asap])

  useEffect(() => {
    const tick = () => {
      frameRef.current += 1
      const smoky = asapRef.current
      const freq = smoky ? 0.03 : 0.14
      const amp = smoky ? 5 : 22

      // Sapuan silia: garis-garis kecil berayam di dasar trakea
      for (let i = 0; i < CILIA; i++) {
        const line = ciliaRefs.current[i]
        if (!line) continue
        const baseX = 20 + i * 15
        const sway = Math.sin(frameRef.current * freq + i * 0.6) * amp
        line.setAttribute('x2', String(baseX + sway))
      }

      // Lendir berdebu bergerak ke luar; asap membuatnya nyaris macet
      const blob = blobRef.current
      if (blob) {
        const speed = smoky ? 0.07 : 0.6
        blobXRef.current += speed
        if (blobXRef.current > 236) {
          blobXRef.current = 24
          if (smoky) setTertahan((n) => n + 1)
          else setKeluar((n) => n + 1)
        }
        blob.setAttribute('cx', blobXRef.current.toFixed(1))
        blob.setAttribute('cy', String(118 + Math.sin(frameRef.current * freq) * 3))
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const speedLabel = asap ? '20%' : '100%'

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <svg viewBox="0 0 260 150" role="img" aria-label={t.judul} className="w-full">
        <title>{t.judul}</title>
        {/* Dinding trakea dengan cincin tulang rawan */}
        <rect x="8" y="34" width="244" height="80" rx="18" fill="var(--oxygen)" fillOpacity="0.08" stroke="var(--ink-dim)" strokeWidth="3" />
        {[36, 76, 116, 156, 196, 236].map((x) => (
          <line key={x} x1={x} y1="34" x2={x} y2="114" stroke="var(--ink-dim)" strokeOpacity="0.45" strokeWidth="3" />
        ))}
        {/* Silia (dianimasikan lewat ref) */}
        <g stroke="var(--mucus)" strokeWidth="3" strokeLinecap="round">
          {Array.from({ length: CILIA }, (_, i) => (
            <line
              key={i}
              ref={(el) => {
                ciliaRefs.current[i] = el
              }}
              x1={20 + i * 15}
              y1="108"
              x2={20 + i * 15}
              y2="96"
            />
          ))}
        </g>
        {/* Lendir berdebu */}
        <ellipse
          ref={blobRef}
          cx="24"
          cy="118"
          rx="14"
          ry="7"
          fill="var(--mucus)"
          fillOpacity="0.85"
          stroke="var(--tissue)"
          strokeWidth="2"
        />
        {/* Arah keluar */}
        <path d="M 240 130 L 250 130 L 246 124 M 250 130 L 246 136" fill="none" stroke="var(--ink-dim)" strokeWidth="2.5" />
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={asap}
          onClick={() => setAsap((v) => !v)}
          className="min-h-11 rounded-lg border px-4 text-sm font-semibold"
          style={{
            borderColor: asap ? 'var(--tissue)' : 'var(--mucus)',
            color: asap ? 'var(--tissue)' : 'var(--mucus)',
          }}
        >
          {asap ? t.asap : t.sehat}
        </button>
        <p className="text-sm">
          {t.kecepatan}: <strong>{speedLabel}</strong>
        </p>
      </div>
      <p className="mt-2 text-xs" style={{ color: 'var(--ink-dim)' }} role="status">
        {asap ? t.keteranganAsap : t.keteranganSehat}
      </p>
      <p className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.lendirKeluar}: <strong>{keluar}</strong> · {t.lendirTertahan}:{' '}
        <strong>{tertahan}</strong>
      </p>
    </div>
  )
}
