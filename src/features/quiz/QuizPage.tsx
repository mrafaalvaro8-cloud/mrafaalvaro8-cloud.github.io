import { useState } from 'react'
import { id } from '../../content/i18n/id'
import { questions } from '../../content/quiz'
import { useProgressStore } from '../../app/stores'

/**
 * M8 — Kuis adaptif. Menampilkan ringkasan penguasaan per topik,
 * kemudian satu soal setiap kali (diprioritaskan dari konsep terlemah).
 * Jawaban dan skor tersimpan lokal lewat IndexedDB (tanpa akun, §9).
 */

type QuizState = 'ringkasan' | 'soal'

export function QuizPage() {
  const t = id.quiz
  const answers = useProgressStore((s) => s.answers)
  const mastery = useProgressStore((s) => s.mastery)
  const recordAnswer = useProgressStore((s) => s.recordAnswer)

  const [state, setState] = useState<QuizState>('ringkasan')
  const [idx, setIdx] = useState(0)
  const [choice, setChoice] = useState<string | null>(null)

  // Susun urutan soal: konsep terlemah dulu, yang belum dijawab di awal.
  // Sort stabil untuk deterministik di test.
  const sorted = [...questions].sort((a, b) => {
    const ma = mastery[a.conceptId] ?? 0
    const mb = mastery[b.conceptId] ?? 0
    const alreadyA = a.id in answers
    const alreadyB = b.id in answers
    if (alreadyA !== alreadyB) return alreadyA ? 1 : -1
    return ma - mb
  })

  const question = sorted[idx]
  const answered = question ? question.id in answers : false
  const correct = choice === question?.answer
  const showHint = !answered && choice !== null && choice !== question?.answer && question?.hint
  const isAllDone = idx >= sorted.length

  const nextQuestion = () => {
    setChoice(null)
    setIdx((i) => i + 1)
  }

  const resetAll = () => {
    useProgressStore.setState({ answers: {}, mastery: {} })
    void useProgressStore.persist.clearStorage()
    setChoice(null)
    setIdx(0)
    setState('ringkasan')
  }

  if (isAllDone) {
    return (
      <section aria-labelledby="judul-kuis" className="w-full max-w-2xl">
        <h2
          id="judul-kuis"
          className="mb-2 text-2xl font-bold"
          style={{ color: 'var(--oxygen)' }}
        >
          {t.judul}
        </h2>
        <p className="mb-4 text-sm" style={{ color: 'var(--ink-dim)' }}>
          {t.selesai}
        </p>
        <button
          type="button"
          onClick={resetAll}
          className="min-h-11 rounded-lg border px-4 text-sm font-semibold"
          style={{ borderColor: 'var(--mucus)', color: 'var(--mucus)' }}
        >
          {t.ulangSemua}
        </button>
      </section>
    )
  }

  if (state === 'ringkasan') {
    return (
      <section aria-labelledby="judul-kuis" className="w-full max-w-2xl">
        <h2
          id="judul-kuis"
          className="mb-2 text-2xl font-bold"
          style={{ color: 'var(--oxygen)' }}
        >
          {t.judul}
        </h2>
        <p className="mb-4 max-w-[70ch] text-sm" style={{ color: 'var(--ink-dim)' }}>
          {t.petunjuk}
        </p>

        <h3 className="mb-2 text-base font-semibold" style={{ color: 'var(--mucus)' }}>
          {t.ringkasan}
        </h3>
        <dl className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from(new Set(questions.map((q) => q.conceptId))).map((conceptId) => {
            const m = mastery[conceptId] ?? 0
            const label = conceptId
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
            return (
              <div key={conceptId} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <dt className="text-xs font-medium" style={{ color: 'var(--ink-dim)' }}>
                  {label}
                </dt>
                <dd className="mt-1 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.round(m * 100)}%`,
                        background:
                          m >= 0.75
                            ? 'var(--mucus)'
                            : m >= 0.4
                              ? 'var(--co2)'
                              : 'var(--tissue)',
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold">{Math.round(m * 100)}%</span>
                </dd>
              </div>
            )
          })}
        </dl>

        <button
          type="button"
          onClick={() => setState('soal')}
          className="min-h-11 rounded-lg border px-5 font-semibold"
          style={{ borderColor: 'var(--oxygen)', color: 'var(--bg-deep)', background: 'var(--oxygen)' }}
        >
          {t.jalan}
        </button>
      </section>
    )
  }

  // state === 'soal'
  return (
    <section aria-labelledby="judul-kuis" className="w-full max-w-2xl">
      <h2
        id="judul-kuis"
        className="mb-1 text-2xl font-bold"
        style={{ color: 'var(--oxygen)' }}
      >
        {t.judul}
      </h2>
      <p className="mb-3 text-sm" style={{ color: 'var(--ink-dim)' }}>
        {t.nextLabel}: {idx + 1} / {sorted.length}
      </p>

      {question && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-sm font-medium">{question.prompt}</p>

          <ul className="flex flex-col gap-2" role="group" aria-label={id.journey.cek.pilihan}>
            {question.options?.map((option, optIdx) => {
              const picked = choice === option.id
              const isAnswer = option.id === question.answer
              const done = question.id in answers
              const state2 = done
                ? picked
                  ? isAnswer
                    ? 'right'
                    : 'wrong'
                  : isAnswer
                    ? 'reveal'
                    : 'dim'
                : picked
                  ? 'picked'
                  : 'idle'
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    disabled={done}
                    onClick={() => {
                      if (done) return
                      setChoice(option.id)
                      const correct2 = option.id === question.answer
                      if (!answers[question.id]) {
                        recordAnswer(question.id, option.id, question.conceptId, correct2)
                      }
                    }}
                    aria-pressed={picked}
                    data-testid={`quiz-option-${optIdx}`}
                    className="min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm disabled:cursor-default"
                    style={{
                      borderColor:
                        state2 === 'right'
                          ? 'var(--mucus)'
                          : state2 === 'wrong'
                            ? 'var(--tissue)'
                            : state2 === 'reveal'
                              ? 'var(--oxygen)'
                              : 'rgba(255,255,255,0.2)',
                      color:
                        state2 === 'right'
                          ? 'var(--mucus)'
                          : state2 === 'wrong'
                            ? 'var(--tissue)'
                            : state2 === 'reveal'
                              ? 'var(--oxygen)'
                              : state2 === 'picked'
                                ? 'var(--ink)'
                                : 'var(--ink)',
                    }}
                  >
                    {option.text}
                  </button>
                </li>
              )
            })}
          </ul>

          {choice !== null && (
            <div className="mt-3 space-y-2">
              <p
                className="text-sm font-semibold"
                style={{ color: correct ? 'var(--mucus)' : 'var(--tissue)' }}
                role="status"
              >
                {correct ? id.journey.cek.benar : id.journey.cek.salah}
              </p>
              {showHint && (
                <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                  {id.journey.cek.hint}: {question.hint}
                </p>
              )}
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--ink-dim)' }}>
                  {id.journey.cek.penjelasan}
                </p>
                <p className="text-sm leading-relaxed">{question.explanation}</p>
              </div>
              <button
                type="button"
                onClick={nextQuestion}
                className="mt-2 min-h-11 rounded-lg border px-4 text-sm font-semibold"
                style={{ borderColor: 'var(--oxygen)', color: 'var(--bg-deep)', background: 'var(--oxygen)' }}
              >
                {idx < sorted.length - 1 ? t.nextLabel : t.selesai}
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setState('ringkasan')}
        className="mt-3 text-xs"
        style={{ color: 'var(--ink-dim)' }}
      >
        Kembali ke ringkasan
      </button>
    </section>
  )
}
