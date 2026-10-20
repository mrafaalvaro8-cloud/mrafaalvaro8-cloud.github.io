import { id } from '../../content/i18n/id'
import { stations } from '../../content/stations'
import { DOWN_PATH, LABEL_ANCHOR, RETURN_PATH, STOPS } from './tract'

export type TractMapProps = {
  active: number
  reduceMotion: boolean
}

/**
 * "Kamera terjun" versi 2D (fallback wajib §10): tabung saluran napas
 * vertikal dengan 7 perhentian. Molekul O₂ (titik biru) berpindah ke
 * stasiun aktif — posisi scroll = posisi molekul (§6 M1).
 */
export function TractMap({ active, reduceMotion }: TractMapProps) {
  const stop = STOPS[active] ?? STOPS[0]
  const transition = reduceMotion ? 'none' : 'cx 0.6s ease, cy 0.6s ease'

  return (
    <svg
      viewBox="0 0 300 560"
      role="img"
      aria-label={`${id.journey.nav.posisiAktif}: ${stations[active]?.title ?? ''}`}
      className="h-auto w-full"
    >
      <title>{id.journey.nav.posisiAktif}</title>

      {/* Jalur turun (O₂) dan jalur pulang (CO₂) */}
      <path
        d={DOWN_PATH}
        fill="none"
        stroke="var(--oxygen)"
        strokeOpacity="0.35"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d={RETURN_PATH}
        fill="none"
        stroke="var(--co2)"
        strokeOpacity="0.35"
        strokeWidth="8"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      {/* Legenda warna tanpa mengandalkan warna saja: label teks */}
      <text x="130" y="548" textAnchor="middle" fontSize="11" fill="var(--oxygen)">
        O₂ ↓ turun ke paru
      </text>
      <text x="236" y="60" fontSize="11" fill="var(--co2)">
        CO₂ ↑ keluar
      </text>

      {/* Perhentian stasiun */}
      {STOPS.map((s, i) => {
        const isActive = i === active
        const anchor = LABEL_ANCHOR[i]
        const dx = anchor === 'start' ? 16 : -16
        return (
          <g key={stations[i]?.id ?? i} aria-hidden="true">
            <circle
              cx={s.x}
              cy={s.y}
              r={isActive ? 11 : 7}
              fill={isActive ? 'var(--oxygen)' : 'var(--bg-deep)'}
              stroke={isActive ? 'var(--ink)' : 'var(--oxygen)'}
              strokeWidth={isActive ? 3 : 2.5}
            />
            <text
              x={s.x + dx}
              y={s.y + 4}
              textAnchor={anchor}
              fontSize={isActive ? 13 : 12}
              fontWeight={isActive ? 700 : 400}
              fill={isActive ? 'var(--ink)' : 'var(--ink-dim)'}
            >
              {stations[i]?.title.split(':')[0] ?? ''}
            </text>
          </g>
        )
      })}

      {/* Molekul O₂ — posisi mengikuti stasiun aktif */}
      <circle
        cx={stop.x}
        cy={stop.y}
        r="9"
        fill="var(--oxygen)"
        stroke="var(--ink)"
        strokeWidth="2"
        style={{ transition }}
        aria-hidden="true"
      >
        <title>O₂</title>
      </circle>
    </svg>
  )
}
