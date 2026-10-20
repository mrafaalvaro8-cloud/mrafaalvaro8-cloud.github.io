import { useState } from 'react'
import { id } from '../../../content/i18n/id'

/**
 * Stasiun Bronkus — murid memilih cabang kiri/kanan (KS M1 huruf a).
 * Fakta wajib §7.4: paru kanan 3 lobus, kiri 2 lobus (ruang jantung).
 */

export function BranchPicker() {
  const t = id.journey.interaksi.branching
  const [side, setSide] = useState<'kanan' | 'kiri'>('kanan')

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <h4 className="mb-1 text-sm font-semibold">{t.judul}</h4>
      <p className="mb-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      <div className="mb-3 flex flex-wrap gap-2">
        {(['kanan', 'kiri'] as const).map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={side === s}
            onClick={() => setSide(s)}
            className="min-h-11 rounded-lg border px-4 text-sm font-semibold"
            style={{
              borderColor: side === s ? 'var(--oxygen)' : 'rgba(255,255,255,0.2)',
              color: side === s ? 'var(--oxygen)' : 'var(--ink)',
            }}
          >
            {t[s]}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 260 170" role="img" aria-label={t.judul} className="w-full">
        <title>{t.judul}</title>
        {/* Trakea */}
        <line x1="130" y1="8" x2="130" y2="56" stroke="var(--ink-dim)" strokeWidth="12" strokeLinecap="round" />
        {/* Bronkus kanan (viewer kiri = pasien kanan) */}
        <path
          d="M 130 56 L 86 84"
          fill="none"
          stroke="var(--oxygen)"
          strokeWidth={side === 'kanan' ? 10 : 5}
          strokeOpacity={side === 'kanan' ? 1 : 0.35}
          strokeLinecap="round"
        />
        {/* Bronkus kiri */}
        <path
          d="M 130 56 L 174 84"
          fill="none"
          stroke="var(--oxygen)"
          strokeWidth={side === 'kiri' ? 10 : 5}
          strokeOpacity={side === 'kiri' ? 1 : 0.35}
          strokeLinecap="round"
        />
        {/* Paru kanan: 3 lobus (tampak kiri pada gambar) */}
        <g stroke="var(--tissue)" strokeWidth="2.5" fill="var(--tissue)" fillOpacity={side === 'kanan' ? 0.35 : 0.12}>
          <path d="M 86 76 Q 34 88 26 130 Q 24 158 52 160 L 74 138 Z" />
          <path d="M 86 80 Q 52 104 46 134 L 78 134 Q 88 108 92 86 Z" />
          <path d="M 92 82 Q 74 112 76 138 L 100 128 Q 106 100 104 84 Z" />
        </g>
        {/* Paru kiri: 2 lobus + takik jantung (tampak kanan) */}
        <g stroke="var(--tissue)" strokeWidth="2.5" fill="var(--tissue)" fillOpacity={side === 'kiri' ? 0.35 : 0.12}>
          <path d="M 174 76 Q 226 88 234 130 Q 236 158 208 160 L 186 138 Z" />
          <path d="M 174 80 Q 210 104 216 136 L 184 134 Q 174 108 170 86 Z" />
        </g>
        {/* Jantung (ruang di paru kiri) */}
        <path
          d="M 150 118 Q 138 106 130 118 Q 124 130 142 144 Q 160 130 154 118 Z"
          fill="var(--tissue)"
          stroke="var(--bg-deep)"
          strokeWidth="2"
        />
        <text x="130" y="166" textAnchor="middle" fontSize="10" fill="var(--ink-dim)">
          {side === 'kanan' ? `3 ${'lobus'}` : `2 ${'lobus'}`}
        </text>
      </svg>

      <p className="mt-3 text-sm" role="status">
        {side === 'kanan' ? t.infoKanan : t.infoKiri}
      </p>
      <p className="mt-1 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.jumlahLobus}: {side === 'kanan' ? 3 : 2}
      </p>
    </div>
  )
}
