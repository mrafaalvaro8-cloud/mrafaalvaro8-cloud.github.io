import { useState } from 'react'
import { id } from '../../content/i18n/id'
import { questions } from '../../content/quiz'
import { useProgressStore } from '../../app/stores'
import { QuestionFeedback } from '../../components/QuestionFeedback'
import { QuestionOptions } from '../../components/QuestionOptions'

/**
 * M8 — Kuis adaptif. Menampilkan ringkasan penguasaan per topik,
 * kemudian satu soal setiap kali (diprioritaskan dari konsep terlemah).
 * Jawaban dan skor tersimpan lokal lewat IndexedDB (tanpa akun, §9).
 */

type QuizState = 'ringkasan' | 'soal'

/** Label topik dari conceptId: 'difusi-alveolus' → 'Difusi Alveolus'. */
function conceptLabel(conceptId: string): string {
  return conceptId
    .replace(/-co2$/, '-CO₂')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

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
  const showHint =
    !answered &&
    choice !== null &&
    choice !== question?.answer &&
    Boolean(question?.hint)
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

  const pick = (optionId: string) => {
    if (!question) return
    setChoice(optionId)
    if (!answers[question.id]) {
      recordAnswer(
        question.id,
        optionId,
        question.conceptId,
        optionId === question.answer,
      )
    }
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
            return (
              <div key={conceptId} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <dt className="text-xs font-medium" style={{ color: 'var(--ink-dim)' }}>
                  {conceptLabel(conceptId)}
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

          <QuestionOptions
            question={question}
            choice={choice}
            answered={answered}
            onPick={pick}
            testIdPrefix="quiz-option"
          />

          {choice !== null && (
            <QuestionFeedback
              question={question}
              choice={choice}
              showHint={showHint}
            >
              <button
                type="button"
                onClick={nextQuestion}
                className="mt-2 min-h-11 rounded-lg border px-4 text-sm font-semibold"
                style={{
                  borderColor: 'var(--oxygen)',
                  color: 'var(--bg-deep)',
                  background: 'var(--oxygen)',
                }}
              >
                {idx < sorted.length - 1 ? t.nextLabel : t.selesai}
              </button>
            </QuestionFeedback>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setState('ringkasan')}
        className="mt-3 text-xs"
        style={{ color: 'var(--ink-dim)' }}
      >
        {t.kembali}
      </button>
    </section>
  )
}
