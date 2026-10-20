import type { RefObject } from 'react'
import { id } from '../../content/i18n/id'

/**
 * Diagram rongga dada (M2, visual SVG dulu — jalur 2D adalah fallback
 * wajib §10). Posisi awal = titik tenang (volume relatif 1.0).
 * Warna sains tetap: O₂ biru, CO₂ kuning (§5).
 * Elemen dianimasikan per frame lewat ref oleh induk (§11).
 */
export type ChestProps = {
  ribs: RefObject<SVGGElement>
  lungs: RefObject<SVGGElement>
  diaphragm: RefObject<SVGPathElement>
  arrowIn: RefObject<SVGGElement>
  arrowOut: RefObject<SVGGElement>
}

export function ChestSvg(props: ChestProps) {
  const t = id.diaphragm
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={t.diagram.aria}
      className="w-full"
    >
      <title>{t.diagram.aria}</title>

      {/* Trakea dan percabangan bronkus */}
      <path
        d="M 200 26 L 200 95 M 200 95 L 162 132 M 200 95 L 238 132"
        stroke="var(--ink-dim)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cincin tulang rawan trakea */}
      {[42, 58, 74].map((y) => (
        <line
          key={y}
          x1="192"
          y1={y}
          x2="208"
          y2={y}
          stroke="var(--bg-deep)"
          strokeWidth="3"
        />
      ))}

      {/* O₂ masuk (panah biru ke bawah) dan CO₂ keluar (panah kuning ke atas) */}
      <g ref={props.arrowIn} opacity="0">
        <path d="M 164 14 L 176 34 L 188 14 Z" fill="var(--oxygen)" />
      </g>
      <g ref={props.arrowOut} opacity="0">
        <path d="M 212 34 L 224 14 L 236 34 Z" fill="var(--co2)" />
      </g>

      {/* Paru-paru (dibesarkan/dikecilkan per frame) */}
      <g ref={props.lungs}>
        <path
          d="M 168 108 C 130 112 108 150 106 195 C 105 232 128 252 158 246 C 176 242 184 220 186 190 C 188 158 184 124 168 108 Z"
          fill="var(--oxygen)"
          fillOpacity="0.16"
          stroke="var(--oxygen)"
          strokeWidth="3"
        />
        <path
          d="M 232 108 C 270 112 292 150 294 195 C 295 232 272 252 242 246 C 224 242 216 220 214 190 C 212 158 216 124 232 108 Z"
          fill="var(--oxygen)"
          fillOpacity="0.16"
          stroke="var(--oxygen)"
          strokeWidth="3"
        />
      </g>

      {/* Tulang rusuk (bergeser naik saat inspirasi) */}
      <g
        ref={props.ribs}
        stroke="var(--tissue)"
        strokeOpacity="0.75"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <path d="M 112 138 Q 200 120 288 138" />
        <path d="M 104 172 Q 200 154 296 172" />
        <path d="M 104 206 Q 200 188 296 206" />
        <path d="M 112 238 Q 200 222 288 238" />
      </g>

      {/* Diafragma: kubah saat rileks → datar saat tertarik (dianimasikan) */}
      <path
        ref={props.diaphragm}
        d="M 55 252 Q 200 210 345 252"
        fill="var(--tissue)"
        fillOpacity="0.18"
        stroke="var(--tissue)"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  )
}
