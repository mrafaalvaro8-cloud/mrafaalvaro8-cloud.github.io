import { useEffect, useState } from 'react'
import { id } from '../../../content/i18n/id'
import { stations } from '../../../content/stations'
import { DOWN_PATH, RETURN_PATH, STOPS } from '../tract'

/**
 * Stasiun Pulang — putar ulang ringkasan jalur (KS M1 huruf a).
 * Molekul berjalan melewati tujuh perhentian; jeda antar langkah dihormati
 * oleh "Kurangi gerak" (gerak dihentikan, teks ringkasan tetap muncul).
 */

export function JourneyReplay({ reduceMotion }: { reduceMotion: boolean }) {
  const t = id.journey.interaksi.summary
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!playing || reduceMotion) return undefined
    const timer = setInterval(() => {
      setStep((s) => {
        if (s >= STOPS.length - 1) {
          setPlaying(false)
          return s
        }
        return s + 1
      })
    }, 850)
    return () => clearInterval(timer)
  }, [playing, reduceMotion])

  const start = () => {
    if (reduceMotion) {
      // Tanpa gerak: langsung tampilkan akhir rangkuman perjalanan.
      setStep(STOPS.length - 1)
      return
    }
    setStep(0)
    setPlaying(true)
  }

  const stop = STOPS[step] ?? STOPS[0]
  const returnMode = step === 6

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <svg viewBox="0 0 300 560" role="img" aria-label={t.judul} className="mx-auto h-48 w-auto md:h-64">
        <title>{t.judul}</title>
        <path d={DOWN_PATH} fill="none" stroke="var(--oxygen)" strokeOpacity="0.4" strokeWidth="9" strokeLinecap="round" />
        <path d={RETURN_PATH} fill="none" stroke="var(--co2)" strokeOpacity="0.4" strokeWidth="7" strokeDasharray="9 7" strokeLinecap="round" />
        {STOPS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={i === step ? 10 : 6}
            fill={i === step ? 'var(--mucus)' : 'var(--bg-deep)'}
            stroke={i === step ? 'var(--ink)' : 'var(--oxygen)'}
            strokeWidth="2.5"
          />
        ))}
        <circle
          cx={stop.x}
          cy={stop.y}
          r="9"
          fill={returnMode ? 'var(--co2)' : 'var(--oxygen)'}
          stroke="var(--ink)"
          strokeWidth="2"
          style={{ transition: reduceMotion ? 'none' : 'cx 0.7s ease, cy 0.7s ease, fill 0.3s ease' }}
        />
      </svg>

      <p className="mt-2 text-sm" role="status" aria-live="polite">
        {t.langkah} {step + 1}/{STOPS.length}: <strong>{stations[step]?.title}</strong>
        {returnMode ? ' — CO₂ kembali keluar lewat hidung' : ''}
      </p>

      <button
        type="button"
        onClick={() => (playing ? setPlaying(false) : start())}
        className="mt-2 min-h-11 rounded-lg px-5 text-sm font-semibold text-[var(--bg-deep)]"
        style={{ background: returnMode ? 'var(--co2)' : 'var(--oxygen)' }}
      >
        {playing ? t.hentikan : t.putar}
      </button>
    </div>
  )
}
