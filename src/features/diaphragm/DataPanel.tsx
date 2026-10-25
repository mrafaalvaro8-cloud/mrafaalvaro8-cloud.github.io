import type { RefObject } from 'react'
import { id } from '../../content/i18n/id'

/** Nilai yang diperbarui per frame tanpa re-render React (§11). */
export type DataPanelProps = {
  volume: RefObject<HTMLSpanElement>
  pressure: RefObject<HTMLSpanElement>
  status: RefObject<HTMLSpanElement>
  flow: RefObject<HTMLSpanElement>
}

/**
 * Panel data sains M2: volume relatif, tekanan relatif terhadap atmosfer,
 * dan arah aliran. Selalu tampilkan label "Model sederhana untuk belajar"
 * (§7.3) dan status tekanan secara teks — jangan hanya warna (§9).
 */
export function DataPanel(props: DataPanelProps) {
  const t = id.diaphragm
  return (
    <aside
      aria-label={t.panel.judul}
      className="rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <h3 className="mb-3 text-sm font-semibold">{t.panel.judul}</h3>
      <p className="text-xs mb-3" style={{ color: 'var(--ink-dim)' }}>
        {t.panel.catatan}
      </p>
      <dl className="grid gap-3">
        <div>
          <dt className="text-xs" style={{ color: 'var(--ink-dim)' }}>
            {t.panel.volume}
          </dt>
          <dd className="text-lg font-semibold tabular-nums">
            <span ref={props.volume}>—</span>
          </dd>
        </div>
        <div>
          <dt className="text-xs" style={{ color: 'var(--ink-dim)' }}>
            {t.panel.tekanan}
          </dt>
          <dd className="text-lg font-semibold tabular-nums">
            <span ref={props.pressure}>—</span> atm{' '}
            <span ref={props.status} className="text-sm font-normal" />
          </dd>
        </div>
        <div>
          <dt className="text-xs" style={{ color: 'var(--ink-dim)' }}>
            {t.panel.aliran}
          </dt>
          <dd className="text-lg font-semibold">
            <span ref={props.flow}>—</span>
          </dd>
        </div>
      </dl>
      <p className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {t.panel.catatan}
      </p>
    </aside>
  )
}
