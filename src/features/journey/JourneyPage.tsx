import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { id } from '../../content/i18n/id'
import { stations } from '../../content/stations'
import { useSettingsStore } from '../../app/stores'
import { createAmbience, isAudioSupported } from '../../audio/ambience'
import type { AmbienceController } from '../../audio/ambience'
import { StationSection } from './StationSection'
import { TractMap } from './TractMap'

/**
 * M1 — Scrollytelling "Perjalanan Satu Tarikan Napas" (versi 2D).
 * Posisi scroll menentukan stasiun aktif (GSAP ScrollTrigger); molekul O₂
 * di peta jalur mengikuti stasiun aktif. Semua interaksi, teks 3 tingkat,
 * dan cek pemahaman ada di dalam tiap stasiun — bisa dituju maju-mundur
 * lewat scroll maupun tombol/navigasi keyboard (KS M1).
 */
export function JourneyPage() {
  const t = id.journey
  const level = useSettingsStore((s) => s.level)
  const setLevel = useSettingsStore((s) => s.setLevel)
  const reduceMotion = useSettingsStore((s) => s.reduceMotion)
  const setReduceMotion = useSettingsStore((s) => s.setReduceMotion)

  const [active, setActive] = useState(0)
  const sectionRefs = useRef<Array<HTMLElement | null>>([])
  const [soundOn, setSoundOn] = useState(false)
  const ambienceRef = useRef<AmbienceController | null>(null)
  const audioSupported = isAudioSupported()

  // ScrollTrigger: posisi scroll → stasiun aktif. Dipasang sekali dan
  // dibersihkan saat unmount; gagal = tetap jalan tanpa deteksi scroll
  // (navigasi tombol tetap berfungsi — degradasi anggun, §10).
  useEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger)
      const triggers = sectionRefs.current.flatMap((el, i) => {
        if (!el) return []
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
        return [trigger]
      })
      return () => triggers.forEach((trigger) => trigger.kill())
    } catch {
      return undefined
    }
  }, [])

  // Suasana audio: mulai hanya setelah klik pengguna (aturan autoplay §M7);
  // dibersihkan saat unmount.
  useEffect(
    () => () => {
      ambienceRef.current?.dispose()
      ambienceRef.current = null
    },
    [],
  )
  useEffect(() => {
    if (soundOn) ambienceRef.current?.setProfile(stations[active]?.id ?? '')
  }, [active, soundOn])

  const toggleSound = () => {
    if (soundOn) {
      ambienceRef.current?.stop()
      setSoundOn(false)
      return
    }
    if (!ambienceRef.current) ambienceRef.current = createAmbience()
    const started = ambienceRef.current.start(stations[active]?.id ?? '')
    setSoundOn(started)
  }

  const goTo = (index: number) => {
    const target = Math.min(stations.length - 1, Math.max(0, index))
    setActive(target)
    sectionRefs.current[target]?.scrollIntoView?.({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section aria-labelledby="judul-perjalanan" className="w-full max-w-6xl">
      <h2
        id="judul-perjalanan"
        className="mb-1 text-2xl font-bold"
        style={{ color: 'var(--oxygen)' }}
      >
        {t.judul}
      </h2>
      <p className="mb-4 max-w-[70ch] text-sm" style={{ color: 'var(--ink-dim)' }}>
        {t.petunjuk}
      </p>

      {/* Kontrol halaman: tingkat, gerak, suasana */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div role="group" aria-label={id.umum.levelLabel} className="flex items-center gap-2">
          <span className="text-sm font-semibold">{id.umum.levelLabel}:</span>
          {(['sd', 'smp', 'sma'] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              aria-pressed={level === lv}
              onClick={() => setLevel(lv)}
              className="min-h-11 rounded-full border px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oxygen)]"
              style={{
                borderColor: level === lv ? 'var(--mucus)' : 'rgba(255,255,255,0.2)',
                color: level === lv ? 'var(--mucus)' : 'var(--ink)',
                fontWeight: level === lv ? 600 : 400,
              }}
            >
              {id.umum.levels[lv]}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-pressed={reduceMotion}
          onClick={() => setReduceMotion(!reduceMotion)}
          className="min-h-11 rounded-full border px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--co2)]"
          style={{
            borderColor: reduceMotion ? 'var(--co2)' : 'rgba(255,255,255,0.2)',
            color: reduceMotion ? 'var(--co2)' : 'var(--ink)',
          }}
        >
          {id.umum.kurangiGerak}
        </button>

        {audioSupported && (
          <button
            type="button"
            aria-pressed={soundOn}
            onClick={toggleSound}
            className="min-h-11 rounded-full border px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oxygen)]"
            style={{
              borderColor: soundOn ? 'var(--oxygen)' : 'rgba(255,255,255,0.2)',
              color: soundOn ? 'var(--oxygen)' : 'var(--ink)',
            }}
          >
            {soundOn ? t.ambience.matikan : t.ambience.nyalakan}
          </button>
        )}
      </div>

      {/* Indikator posisi + navigasi keyboard (majumundur) */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p
          data-testid="posisi-stasiun"
          aria-live="polite"
          className="text-sm font-semibold"
        >
          {id.umum.stasiun} {active + 1} {t.nav.dariTotal} {stations.length}
          <span className="ml-2 font-normal" style={{ color: 'var(--ink-dim)' }}>
            — {stations[active]?.title}
          </span>
        </p>
        <div role="group" aria-label={t.nav.label} className="flex gap-2">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="min-h-11 rounded-lg border px-4 text-sm disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oxygen)]"
            style={{ borderColor: 'rgba(255,255,255,0.25)' }}
          >
            ← {t.nav.sebelumnya}
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === stations.length - 1}
            className="min-h-11 rounded-lg border px-4 text-sm disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--oxygen)]"
            style={{ borderColor: 'rgba(255,255,255,0.25)' }}
          >
            {t.nav.berikutnya} →
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[260px_1fr]">
        {/* Peta jalur lengket di sisi kiri (desktop) */}
        <div className="hidden md:block">
          <div className="sticky top-4 rounded-xl border border-white/10 bg-white/5 p-3">
            <TractMap active={active} reduceMotion={reduceMotion} />
            <nav aria-label={t.nav.daftarStasiun} className="mt-3 flex flex-col gap-1">
              {stations.map((station, i) => (
                <button
                  key={station.id}
                  type="button"
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => goTo(i)}
                  className="min-h-11 rounded-lg px-2 text-left text-xs"
                  style={{
                    color: i === active ? 'var(--oxygen)' : 'var(--ink-dim)',
                    fontWeight: i === active ? 600 : 400,
                    background: i === active ? 'rgba(79,209,255,0.08)' : 'transparent',
                  }}
                >
                  {i + 1}. {station.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Stasiun berurutan — digulir maju-mundur */}
        <div className="flex flex-col gap-4">
          {stations.map((station, i) => (
            <StationSection
              key={station.id}
              station={station}
              index={i}
              total={stations.length}
              active={active === i}
              level={level}
              reduceMotion={reduceMotion}
              onRef={(el) => {
                sectionRefs.current[i] = el
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default JourneyPage
