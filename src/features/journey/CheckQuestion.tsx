import { useState } from 'react'
import { id } from '../../content/i18n/id'
import { useProgressStore } from '../../app/stores'
import type { Question } from '../../engine/types'
import { QuestionFeedback } from '../../components/QuestionFeedback'
import { QuestionOptions } from '../../components/QuestionOptions'

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

      <QuestionOptions
        question={question}
        choice={choice}
        answered={answered}
        onPick={answer}
      />

      {answered && choice !== null && (
        <QuestionFeedback
          question={question}
          choice={choice}
          showHint={!correct && Boolean(question.hint)}
        >
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
        </QuestionFeedback>
      )}
    </section>
  )
}
