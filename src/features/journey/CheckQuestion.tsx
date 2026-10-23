import { useState } from 'react'
import { id } from '../../content/i18n/id'
import { useProgressStore } from '../../app/stores'
import type { Question } from '../../engine/types'

/**
 * Cek pemahaman per stasiun (KS M1 huruf c). MCQ: umpan balik + penjelasan
 * selalu muncul setelah menjawab — tanpa hukuman, tanpa "game over" (§8).
 * Jawaban & penguasaan dicatat lokal lewat store progress (IndexedDB), jadi
 * halaman dimuat ulang pun jawaban pertama tetap terkunci (§8).
 */
export function CheckQuestion({ question }: { question: Question }) {
  const t = id.journey.cek
  const recordAnswer = useProgressStore((s) => s.recordAnswer)
  const storedChoice = useProgressStore((s) => s.answers[question.id])
  const [choice, setChoice] = useState<string | null>(storedChoice ?? null)

  const answered = choice !== null
  const correct = answered && choice === question.answer
  const showHint = answered && !correct && question.hint

  const answer = (optionId: string) => {
    if (answered) return
    setChoice(optionId)
    // Catat hanya sekali per soal — jawaban pertama yang menentukan (§8).
    if (storedChoice === undefined) {
      recordAnswer(
        question.id,
        optionId,
        question.conceptId,
        optionId === question.answer,
      )
    }
  }

  const retry = () => setChoice(null)

  return (
    <section
      aria-labelledby={`cek-${question.id}`}
      className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <h4
        id={`cek-${question.id}`}
        className="mb-2 text-sm font-semibold"
        style={{ color: 'var(--mucus)' }}
      >
        {t.judul}
      </h4>
      <p className="mb-3 text-sm font-medium">{question.prompt}</p>

      <ul
        className="flex flex-col gap-2"
        role="group"
        aria-label={t.pilihan}
      >
        {question.options?.map((option) => {
          const picked = choice === option.id
          const isAnswer = option.id === question.answer
          const state = !answered
            ? 'idle'
            : picked
              ? isAnswer
                ? 'right'
                : 'wrong'
              : isAnswer
                ? 'reveal'
                : 'dim'
          return (
            <li key={option.id}>
              <button
                type="button"
                disabled={answered}
                onClick={() => answer(option.id)}
                aria-pressed={picked}
                className="min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm disabled:cursor-default"
                style={{
                  borderColor:
                    state === 'right'
                      ? 'var(--mucus)'
                      : state === 'wrong'
                        ? 'var(--tissue)'
                        : state === 'reveal'
                          ? 'var(--oxygen)'
                          : 'rgba(255,255,255,0.2)',
                  color:
                    state === 'right'
                      ? 'var(--mucus)'
                      : state === 'wrong'
                        ? 'var(--tissue)'
                        : state === 'reveal'
                          ? 'var(--oxygen)'
                          : state === 'dim'
                            ? 'var(--ink-dim)'
                            : 'var(--ink)',
                }}
              >
                {option.text}
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <div className="mt-3 space-y-2">
          <p
            className="text-sm font-semibold"
            style={{ color: correct ? 'var(--mucus)' : 'var(--tissue)' }}
            role="status"
          >
            {correct ? t.benar : t.salah}
          </p>
          {showHint && (
            <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>
              {t.hint}: {question.hint}
            </p>
          )}
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--ink-dim)' }}>
              {t.penjelasan}
            </p>
            <p className="text-sm leading-relaxed">{question.explanation}</p>
          </div>
          <p className="text-xs" style={{ color: 'var(--ink-dim)' }}>
            {t.tercatat}
          </p>
          {!correct && (
            <button
              type="button"
              onClick={retry}
              className="min-h-11 rounded-lg border px-4 text-sm"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              {t.ulangi}
            </button>
          )}
        </div>
      )}
    </section>
  )
}
