import { id } from '../content/i18n/id'
import { useSettingsStore } from '../app/stores'

/**
 * Pemilih tingkat penjelasan (§2). Dipakai Perjalanan Napas dan Simulator
 * Diafragma; karena pilihan disimpan di store settings (§3), tingkat yang
 * dipilih di satu fitur langsung berlaku di fitur lain.
 */
export function LevelPicker({ className = '' }: { className?: string }) {
  const level = useSettingsStore((s) => s.level)
  const setLevel = useSettingsStore((s) => s.setLevel)

  return (
    <div
      role="group"
      aria-label={id.umum.levelLabel}
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      <span className="text-sm font-semibold">{id.umum.levelLabel}:</span>
      {(['sd', 'smp', 'sma'] as const).map((lv) => (
        <button
          key={lv}
          type="button"
          aria-pressed={level === lv}
          onClick={() => setLevel(lv)}
          className="min-h-11 rounded-full border px-4 text-sm"
          style={{
            borderColor:
              level === lv ? 'var(--mucus)' : 'rgba(255,255,255,0.2)',
            color: level === lv ? 'var(--mucus)' : 'var(--ink)',
            fontWeight: level === lv ? 600 : 400,
          }}
        >
          {id.umum.levels[lv]}
        </button>
      ))}
    </div>
  )
}
