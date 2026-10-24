import { lazy, Suspense, useEffect, useState } from 'react'
import { id } from '../content/i18n/id'

// Satu fitur = satu folder = bisa dimuat lazy (AGENTS.md §4).
// Import berupa literal statis agar Vite yakin memecah bundelnya.
const JourneyPage = lazy(() =>
  import('../features/journey/JourneyPage').then((m) => ({
    default: m.JourneyPage,
  })),
)
const DiaphragmSim = lazy(() =>
  import('../features/diaphragm/DiaphragmSim').then((m) => ({
    default: m.DiaphragmSim,
  })),
)
const SmokeScenario = lazy(() =>
  import('../features/scenarios/SmokeScenario').then((m) => ({
    default: m.SmokeScenario,
  })),
)

type Tab = 'journey' | 'diaphragm' | 'asap'

/** Bentuk state history yang kita simpan (null saat entri pertama). */
type TabHistoryState = { tab?: Tab } | null

const isTab = (value: unknown): value is Tab =>
  value === 'journey' || value === 'diaphragm' || value === 'asap'

/**
 * Halaman utama (Fase 0) + navigasi dua fitur awal:
 * M1 perjalanan napas (inti) dan M2 simulator diafragma.
 * Konten pelajaran diambil dari src/content/, bukan ditulis di sini (§4).
 *
 * Tab juga dicatat di history browser agar gestur/tombol kembali Android
 * berpindah ke tab sebelumnya dulu, bukan langsung keluar dari situs (§5).
 */
export function App() {
  const [tab, setTabState] = useState<Tab>(() => {
    const saved =
      typeof window === 'undefined'
        ? null
        : (window.history.state as TabHistoryState)
    return isTab(saved?.tab) ? saved.tab : 'journey'
  })

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const state = event.state as TabHistoryState
      setTabState(isTab(state?.tab) ? state.tab : 'journey')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const setTab = (next: Tab) => {
    if (next === tab) return
    setTabState(next)
    // Entri history baru per perpindahan tab: "kembali" = tab sebelumnya (§5).
    window.history.pushState({ ...window.history.state, tab: next }, '')
  }

  return (
    <main
      data-testid="app-root"
      className="app-shell flex flex-col items-center gap-4"
    >
      <header className="flex w-full max-w-6xl flex-col items-start gap-2 text-center">
        <h1
          className="text-4xl font-bold tracking-tight"
          style={{ color: 'var(--oxygen)' }}
        >
          {id.app.judul}
        </h1>
        <p
          className="mx-auto max-w-[70ch] text-base"
          style={{ color: 'var(--ink-dim)' }}
        >
          {id.app.tagline}
        </p>
        <nav
          aria-label={id.app.pilihFitur}
          className="tabbar-android mx-auto mt-2 flex flex-wrap justify-center gap-2"
        >
          {(['journey', 'diaphragm', 'asap'] as const).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={tab === key}
              onClick={() => setTab(key)}
              className="min-h-11 min-w-11 rounded-full border px-5 text-sm font-semibold"
              style={{
                borderColor: tab === key ? 'var(--oxygen)' : 'rgba(255,255,255,0.25)',
                color: tab === key ? 'var(--bg-deep)' : 'var(--ink)',
                background: tab === key ? 'var(--oxygen)' : 'transparent',
              }}
            >
              {id.app.tabs[key]}
            </button>
          ))}
        </nav>
      </header>

      <Suspense
        fallback={
          <p className="text-sm" style={{ color: 'var(--ink-dim)' }}>
            {id.app.memuat}
          </p>
        }
      >
        {tab === 'journey' ? (
          <JourneyPage />
        ) : tab === 'diaphragm' ? (
          <DiaphragmSim />
        ) : (
          <SmokeScenario />
        )}
      </Suspense>
    </main>
  )
}
