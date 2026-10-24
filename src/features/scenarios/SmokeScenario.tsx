import { useEffect, useRef, useState } from 'react'
import { id } from '../../content/i18n/id'
import {
  airLabel,
  ciliaSpeed,
  cleaningRate,
  effectiveSurface,
} from '../../engine/smoke'

/**
 * M5 butir 4 — "Hari Berkabut Asap": murid menggeser kadar partikel PM2.5,
 * lalu membandingkan paru sehat vs terpapar asap (§7.3). Silia melambat,
 * lendir menumpuk, pertukaran gas menurun. Diakhiri panel tindakan nyata
 * (masker, di dalam ruangan, cek kualitas udara, kapan ke fasilitas kesehatan).
 * Animasi silia memakai rAF + ref agar tidak re-render per frame (§11).
 */

const SWEEPS = 18
const PARTICLE_DOTS = 14

export function SmokeScenario() {
  const t = id.scenarios.asap
  const [particle, setParticle] = useState(0)
  const particleRef = useRef(0)
  const frameRef = useRef(0)
  const rafRef = useRef(0)

  // Silia di paru sehat (kiri) — dianimasikan lewat ref.
  const sehatCiliaRefs = useRef<Array<SVGLineElement | null>>([])
  // Silia di paru terpapar (kanan) — kecepatan mengikuti engine.
  const asapCiliaRefs = useRef<Array<SVGLineElement | null>>([])

  useEffect(() => {
    particleRef.current = particle
  }, [particle])

  useEffect(() => {
    const tick = () => {
      frameRef.current += 1
      const p = particleRef.current
      const sehatSpeed = 0.16
      const asapSpeed = ciliaSpeed(p) * 0.16

      const sway = (lines: Array<SVGLineElement | null>, speed: number) => {
        for (let i = 0; i < SWEEPS; i++) {
          const line = lines[i]
          if (!line) continue
          const baseX = 24 + i * 14
          const sway = Math.sin(frameRef.current * speed * 10 + i * 0.6) * 9
          line.setAttribute('x2', String(baseX + sway))
        }
      }
      sway(sehatCiliaRefs.current, sehatSpeed)
      sway(asapCiliaRefs.current, asapSpeed)

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const label = airLabel(particle)
  const speedPct = Math.round(ciliaSpeed(particle) * 100)
  const cleanPct = Math.round(cleaningRate(particle) * 100)
  const gasPct = Math.round(effectiveSurface(particle) * 100)
  const keterangan =
    label === 'sehat'
      ? t.keteranganSehat
      : label === 'sedang'
        ? t.keteranganSedang
        : t.keteranganPekat

  return (
    <section aria-labelledby="judul-asap" className="w-full max-w-6xl">
      <h2
        id="judul-asap"
        className="mb-1 text-2xl font-bold"
        style={{ color: 'var(--co2)' }}
      >
        {t.judul}
      </h2>
      <p className="mb-4 max-w-[70ch] text-sm" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Paru sehat */}
        <Lung
          judul={t.kondisiSehat}
          particle={0}
          registerRef={(el, i) => {
            sehatCiliaRefs.current[i] = el
          }}
          aria="Paru sehat dengan silia bergerak lancar"
        />
        {/* Paru terpapar asap */}
        <Lung
          judul={t.kondisiAsap}
          particle={particle}
          registerRef={(el, i) => {
            asapCiliaRefs.current[i] = el
          }}
          aria={`Paru terpapar asap dengan kadar partikel ${speedPct} persen`}
        />
      </div>

      {/* Slider kadar partikel */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <label
          htmlFor="kadar-partikel"
          className="mb-2 flex items-center justify-between gap-2 text-sm font-semibold"
        >
          {t.slider}
          <span style={{ color: 'var(--co2)' }}>{t.label[label]}</span>
        </label>
        <input
          id="kadar-partikel"
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(particle * 100)}
          onChange={(e) => setParticle(Number(e.target.value) / 100)}
          className="w-full"
          style={{ accentColor: 'var(--co2)' }}
        />
        <p className="mt-3 text-sm leading-relaxed">{keterangan}</p>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Meter label={t.panelData.kecepatanSilia} value={speedPct} color="var(--co2)" />
          <Meter label={t.panelData.lendirKeluar} value={cleanPct} color="var(--mucus)" />
          <Meter label={t.panelData.pertukaranGas} value={gasPct} color="var(--oxygen)" />
        </dl>
        <p className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
          {t.panelData.catatan}
        </p>
      </div>

      {/* Panel tindakan nyata */}
      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <h3 className="mb-2 text-base font-semibold" style={{ color: 'var(--mucus)' }}>
          {t.tindakan.judul}
        </h3>
        <ul className="flex flex-col gap-2 text-sm leading-relaxed">
          {t.tindakan.poin.map((poin) => (
            <li key={poin} className="flex gap-2">
              <span aria-hidden="true" style={{ color: 'var(--mucus)' }}>
                ✓
              </span>
              <span>{poin}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
          {t.tindakan.peringatan}
        </p>
      </div>
    </section>
  )
}

/** Satu panel paru: kantong alveolus + silia (kiri) atau partikel (kanan). */
function Lung({
  judul,
  particle,
  registerRef,
  aria,
}: {
  judul: string
  particle: number
  registerRef: (el: SVGLineElement | null, i: number) => void
  aria: string
}) {
  return (
    <figure className="rounded-xl border border-white/10 bg-white/5 p-4">
      <figcaption className="mb-2 text-sm font-semibold" style={{ color: 'var(--ink)' }}>
        {judul}
      </figcaption>
      <svg viewBox="0 0 300 170" role="img" aria-label={aria} className="w-full">
        <title>{aria}</title>
        {/* Dua paru dalam dada — bentuk anatomi (apex di atas, dasar di bawah) */}
        <path
          d="M 118 22 C 90 22 58 46 50 78 C 42 112 48 146 74 152 C 92 156 104 148 108 128 C 116 100 122 46 118 22 Z"
          fill="var(--oxygen)" fillOpacity="0.10" stroke="var(--oxygen)" strokeWidth="2"
        />
        <path
          d="M 182 22 C 210 22 242 46 250 78 C 258 112 252 146 226 152 C 208 156 196 148 192 128 C 184 100 178 46 182 22 Z"
          fill="var(--oxygen)" fillOpacity="0.10" stroke="var(--oxygen)" strokeWidth="2"
        />
        {/* Trakea + percabangan bronkus */}
        <path
          d="M150 6 L150 40 M150 40 L108 58 M150 40 L192 58"
          fill="none" stroke="var(--ink-dim)" strokeWidth="6" strokeLinecap="round"
        />
        {/* Cabang bronkiolus kecil */}
        <path
          d="M108 58 L92 78 M108 58 L124 84 M192 58 L208 78 M192 58 L176 84"
          fill="none" stroke="var(--oxygen)" strokeWidth="2.5" strokeLinecap="round"
        />
        {/* Silia di sepanjang dinding bronkus (kiri) — asap memperlambat */}
        <g stroke="var(--mucus)" strokeWidth="2.5" strokeLinecap="round">
          {Array.from({ length: SWEEPS }, (_, i) => {
            const baseX = 60 + i * 6
            const y = 66 + i * 2
            return (
              <line
                key={i}
                ref={(el) => registerRef(el, i)}
                x1={baseX}
                y1={y}
                x2={baseX}
                y2={y - 8}
              />
            )
          })}
        </g>
        {/* Partikel asap — jumlah sebanding kadar */}
        {particle > 0 &&
          Array.from({ length: Math.round(PARTICLE_DOTS * particle) }, (_, i) => (
            <circle
              key={i}
              cx={30 + ((i * 37) % 250)}
              cy={20 + ((i * 53) % 90)}
              r={3.5}
              fill="var(--tissue)"
              fillOpacity={0.6}
            />
          ))}
      </svg>
    </figure>
  )
}

/** Bar pengukur sederhana (0–100%). */
function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <dt className="text-xs" style={{ color: 'var(--ink-dim)' }}>
        {label}
      </dt>
      <dd className="mt-1 flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full"
            style={{ width: `${value}%`, background: color }}
          />
        </div>
        <strong className="text-sm">{value}%</strong>
      </dd>
    </div>
  )
}