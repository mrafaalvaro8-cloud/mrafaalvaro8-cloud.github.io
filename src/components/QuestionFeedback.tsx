import type { ReactNode } from 'react'
import { id } from '../content/i18n/id'
import type { Question } from '../engine/types'

/**
 * Umpan balik setelah menjawab: benar/salah, petunjuk (bila salah), dan
 * penjelasan — selalu muncul tanpa "game over" (§8). Tombol lanjutan
 * (coba lagi / soal berikutnya) diisi lewat children oleh pemanggil.
 */

export type QuestionFeedbackProps = {
  question: Question
  choice: string
  showHint: boolean
  children?: ReactNode
}

export function QuestionFeedback(props: QuestionFeedbackProps) {
  const { question, choice, showHint, children } = props
  const t = id.journey.cek
  const correct = choice === question.answer

  return (
    <div className="mt-3 space-y-2">
      <p
        className="text-sm font-semibold"
        style={{ color: correct ? 'var(--mucus)' : 'var(--tissue)' }}
        role="status"
      >
        {correct ? t.benar : t.salah}
      </p>
      {showHint && question.hint && (
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
      {children}
    </div>
  )
}
