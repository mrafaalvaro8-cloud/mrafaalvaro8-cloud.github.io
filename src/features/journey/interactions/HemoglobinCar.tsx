import { useEffect, useState } from 'react'
import { id } from '../../../content/i18n/id'

/**
 * Stasiun Sel Darah Merah — hemoglobin memuat O₂ di paru dan melepasnya
 * di jaringan (KS M1 huruf a). Empat slot = empat ikatan O₂ per hemoglobin
 * (fakta §6 stasiun 6). Animasi berjenjang lewat timeout yang dibersihkan
 * saat unmount.
 */

const SLOTS = 4
type Gas = 'o2' | 'co2'

export function HemoglobinCar() {
  const t = id.journey.interaksi.hemoglobin
  const [location, setLocation] = useState<'paru' | 'jaringan'>('paru')
  const [slots, setSlots] = useState<Array<Gas | null>>(
    Array(SLOTS).fill('o2'),
  )

  // Pindah lokasi → kosongkan dulu, lalu isi berjenjang (efek dibersihkan
  // saat unmount/bergerak cepat agar tidak ada timeout nyasar, §11).
  useEffect(() => {
    const target: Gas = location === 'paru' ? 'o2' : 'co2'
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setSlots(Array(SLOTS).fill(null)), 150))
    for (let i = 0; i < SLOTS; i++) {
      timers.push(
        setTimeout(() => {
          setSlots((prev) => {
            const next = [...prev]
            next[i] = target
            return next
          })
        }, 400 + i * 260),
      )
    }
    return () => timers.forEach(clearTimeout)
  }, [location])

  const filled = slots.filter(Boolean).length

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {(['paru', 'jaringan'] as const).map((loc) => (
          <button
            key={loc}
            type="button"
            aria-pressed={location === loc}
            onClick={() => setLocation(loc)}
            className="min-h-11 rounded-lg border px-4 text-sm font-semibold"
            style={{
              borderColor:
                location === loc ? 'var(--tissue)' : 'rgba(255,255,255,0.2)',
              color: location === loc ? 'var(--tissue)' : 'var(--ink)',
            }}
          >
            {t[loc === 'paru' ? 'diParu' : 'diJaringan']}
          </button>
        ))}
      </div>

      {/* Sel darah merah berbentuk cakram dengan hemoglobin */}
      <svg
        viewBox="0 0 260 130"
        role="img"
        aria-label={`${t.slot}: ${filled} ${filled === 1 ? 'ikatan' : 'ikatan'} terisi`}
        className="w-full"
      >
        <title>{t.slot}</title>
        <ellipse
          cx="130"
          cy="65"
          rx="120"
          ry="52"
          fill="var(--tissue)"
          fillOpacity="0.3"
          stroke="var(--tissue)"
          strokeWidth="3"
        />
        {slots.map((gas, i) => {
          const cx = 60 + (i % 2) * 140
          const cy = 44 + Math.floor(i / 2) * 42
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="21"
                fill={
                  gas === 'o2'
                    ? 'var(--oxygen)'
                    : gas === 'co2'
                      ? 'var(--co2)'
                      : 'transparent'
                }
                fillOpacity={gas ? 0.9 : 0}
                stroke={gas ? 'var(--ink)' : 'var(--ink-dim)'}
                strokeWidth="2"
                strokeDasharray={gas ? undefined : '4 4'}
                style={{ transition: 'fill 0.3s ease, fill-opacity 0.3s ease' }}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={gas ? 'var(--bg-deep)' : 'var(--ink-dim)'}
              >
                {gas === 'o2' ? 'O₂' : gas === 'co2' ? 'CO₂' : ''}
              </text>
            </g>
          )
        })}
      </svg>

      <p className="mt-3 text-sm" role="status">
        {location === 'paru' ? t.statusParu : t.statusJaringan}
      </p>
    </div>
  )
}
