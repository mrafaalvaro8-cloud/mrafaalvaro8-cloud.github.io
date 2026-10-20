import { useState } from 'react'
import { id } from '../../../content/i18n/id'

/**
 * Stasiun Faring & Laring — epiglotis menutup saat menelan, pita suara
 * bergetar saat bersuara (KS M1 huruf a). Tanpa mikrofon di versi awal
 * (mikrofon = M3); getaran dikontrol slider.
 */

const CORD_BASE_Y = 96

export function VocalCords() {
  const t = id.journey.interaksi.vocalCords
  const [swallowing, setSwallowing] = useState(false)
  const [getar, setGetar] = useState(0)

  const vibrating = getar > 30
  const amp = getar / 100
  // Pita suara digambar ulang hanya saat slider berubah (event-driven).
  const wave = (y: number) => {
    const points: string[] = []
    for (let x = 60; x <= 200; x += 7) {
      const dy = Math.sin(x * 0.35) * amp * 8
      points.push(`${x} ${(y + dy).toFixed(1)}`)
    }
    return `M ${points.join(' L ')}`
  }

  const telan = () => {
    setSwallowing(true)
    window.setTimeout(() => setSwallowing(false), 1800)
  }

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <svg viewBox="0 0 260 170" role="img" aria-label={t.judul} className="w-full">
        <title>{t.judul}</title>
        {/* Farings: udara ke bawah, makanan di belakang */}
        <path
          d="M 40 10 Q 56 60 56 110 Q 56 150 70 164"
          fill="none"
          stroke="var(--ink-dim)"
          strokeWidth="4"
        />
        <path
          d="M 96 10 Q 96 50 90 70"
          fill="none"
          stroke="var(--ink-dim)"
          strokeWidth="4"
        />
        {/* Kerongkongan (jalan makanan) */}
        <path
          d="M 150 40 Q 138 100 146 164"
          fill="none"
          stroke="var(--tissue)"
          strokeOpacity="0.7"
          strokeWidth="4"
          strokeDasharray="8 6"
        />
        {/* Laring + pita suara */}
        <rect x="60" y="78" width="140" height="36" rx="10" fill="var(--oxygen)" fillOpacity="0.1" stroke="var(--oxygen)" strokeOpacity="0.5" strokeWidth="2" />
        <path d={wave(CORD_BASE_Y - 6)} fill="none" stroke="var(--tissue)" strokeWidth="5" strokeLinecap="round" />
        <path d={wave(CORD_BASE_Y + 6)} fill="none" stroke="var(--tissue)" strokeWidth="5" strokeLinecap="round" />
        {/* Epiglotis — berputar menutup glotis saat menelan */}
        <line
          x1="96"
          y1="46"
          x2="132"
          y2="46"
          stroke="var(--mucus)"
          strokeWidth="7"
          strokeLinecap="round"
          style={{
            transformOrigin: '96px 46px',
            transform: swallowing ? 'rotate(64deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* Bolus makanan */}
        <circle
          cx="112"
          cy={swallowing ? 130 : 14}
          r="9"
          fill="var(--co2)"
          style={{ transition: 'cy 1.2s ease', opacity: swallowing ? 1 : 0.35 }}
        />
      </svg>

      <div className="mt-3 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={telan}
            className="min-h-11 rounded-lg px-5 text-sm font-semibold text-[var(--bg-deep)]"
            style={{ background: 'var(--mucus)' }}
          >
            {t.telan}
          </button>
          <p className="text-xs" style={{ color: 'var(--ink-dim)' }} role="status">
            {swallowing ? t.statusTutup : t.statusBuka}
          </p>
        </div>
        <label htmlFor="getar-pita" className="text-sm">
          {t.getar}
        </label>
        <input
          id="getar-pita"
          type="range"
          min="0"
          max="100"
          step="1"
          value={getar}
          onChange={(e) => setGetar(Number(e.target.value))}
          className="h-11 w-full accent-[var(--tissue)]"
        />
        <p className="text-xs" style={{ color: 'var(--ink-dim)' }} role="status">
          {vibrating ? t.getarHidup : t.getarMati}
        </p>
      </div>
    </div>
  )
}
