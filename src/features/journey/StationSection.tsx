import type { Level, Station } from '../../engine/types'
import { id } from '../../content/i18n/id'
import { CheckQuestion } from './CheckQuestion'
import { BranchPicker } from './interactions/BranchPicker'
import { CiliaSweep } from './interactions/CiliaSweep'
import { DiffusionLab } from './interactions/DiffusionLab'
import { DustFilter } from './interactions/DustFilter'
import { HemoglobinCar } from './interactions/HemoglobinCar'
import { JourneyReplay } from './interactions/JourneyReplay'
import { VocalCords } from './interactions/VocalCords'

export type StationSectionProps = {
  station: Station
  index: number
  total: number
  active: boolean
  level: Level
  reduceMotion: boolean
  onRef: (el: HTMLElement | null) => void
}

/** Satu stasiun: penjelasan 3 tingkat + 1 interaksi + cek pemahaman (KS M1). */
export function StationSection(props: StationSectionProps) {
  const { station, index, total, active, level, reduceMotion, onRef } = props
  const t = id.journey

  return (
    <section
      ref={onRef}
      id={`stasiun-${station.id}`}
      aria-labelledby={`judul-${station.id}`}
      data-active={active ? 'true' : undefined}
      className="scroll-mt-24 rounded-xl border p-4 transition-colors"
      style={{
        borderColor: active ? 'var(--oxygen)' : 'rgba(255,255,255,0.12)',
        background: active ? 'rgba(79,209,255,0.05)' : 'rgba(255,255,255,0.03)',
      }}
    >
      <p className="text-xs font-semibold" style={{ color: 'var(--oxygen)' }}>
        {id.umum.stasiun} {index + 1} {t.nav.dariTotal} {total}
      </p>
      <h3 id={`judul-${station.id}`} className="mb-2 text-xl font-bold">
        {station.title}
      </h3>
      <p className="max-w-[70ch] text-sm leading-relaxed">
        {station.layers[level]}
      </p>

      {station.interaction === 'dust-filter' && <DustFilter />}
      {station.interaction === 'vocal-cords' && <VocalCords />}
      {station.interaction === 'cilia' && <CiliaSweep />}
      {station.interaction === 'branching' && <BranchPicker />}
      {station.interaction === 'diffusion' && <DiffusionLab />}
      {station.interaction === 'hemoglobin' && <HemoglobinCar />}
      {station.interaction === 'summary' && (
        <JourneyReplay reduceMotion={reduceMotion} />
      )}

      <CheckQuestion question={station.check} />

      <p className="mt-3 text-xs" style={{ color: 'var(--ink-dim)' }}>
        {id.umum.sumber}: {station.source.join(' · ')}
      </p>
    </section>
  )
}
