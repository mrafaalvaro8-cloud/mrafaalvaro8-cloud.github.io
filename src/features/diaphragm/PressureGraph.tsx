import type { RefObject } from 'react'
import { id } from '../../content/i18n/id'
import { boyleCurvePath, pressureToY, volumeToX } from './plot'

export type PressureGraphProps = {
  point: RefObject<SVGCircleElement>
}

/**
 * Mode SMA (M2): grafik berjalan P × V = konstan. Titik berwarna biru
 * (O₂) menunjukkan kondisi terkini dari engine. Selalu menampilkan label
 * "Model sederhana untuk belajar" (§7.3, §9) dan teks status — jangan
 * hanya warna.
 */
export function PressureGraph(props: PressureGraphProps) {
  const t = id.diaphragm.grafik
  return (
    <figure className="rounded-xl border border-white/10 bg-white/5 p-4">
      <figcaption className="mb-2 text-sm font-semibold">
        {t.judul} {t.pelajaranCatatan}
      </figcaption>
      <svg
        viewBox="0 0 330 200"
        role="img"
        aria-label={t.aria}
        className="w-full"
      >
        <title>{t.aria}</title>
        {/* Sumbu */}
        <line x1="40" y1="170" x2="315" y2="170" stroke="var(--ink-dim)" strokeWidth="2" />
        <line x1="40" y1="170" x2="40" y2="14" stroke="var(--ink-dim)" strokeWidth="2" />
        {/* Kurva Boyle */}
        <path d={boyleCurvePath} fill="none" stroke="var(--co2)" strokeWidth="2.5" />
        {/* Titik kondisi saat ini */}
        <circle
          ref={props.point}
          cx={volumeToX(1)}
          cy={pressureToY(1)}
          r="7"
          fill="var(--oxygen)"
          stroke="var(--bg-deep)"
          strokeWidth="2"
        />
        {/* Label "Model sederhana untuk belajar" */}
        <text
          x="165"
          y="30"
          textAnchor="middle"
          fontSize="10"
          fill="var(--ink-dim)"
        >
          Model sederhana untuk belajar
        </text>
        {/* Label sumbu */}
        <text x="177" y="194" textAnchor="middle" fontSize="12" fill="var(--ink-dim)">
          {t.x}
        </text>
        <text
          x="16"
          y="95"
          textAnchor="middle"
          fontSize="12"
          fill="var(--ink-dim)"
          transform="rotate(-90 16 95)"
        >
          {t.y}
        </text>
      </svg>
    </figure>
  )
}
