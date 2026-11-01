import { id } from '../content/i18n/id'
import type { Question } from '../engine/types'

/**
 * Daftar pilihan jawaban MCQ dengan status warna yang konsisten
 * (benar/salah/terbuka/redup) — dipakai cek pemahaman per stasiun (M1)
 * dan kuis adaptif (M8). Warna selalu disertai teks umpan balik (§9).
 */

type OptionState = 'idle' | 'picked' | 'right' | 'wrong' | 'reveal' | 'dim'

function optionState(
  answered: boolean,
  picked: boolean,
  isAnswer: boolean,
): OptionState {
  if (!answered) return picked ? 'picked' : 'idle'
  if (picked) return isAnswer ? 'right' : 'wrong'
  return isAnswer ? 'reveal' : 'dim'
}

const BORDER: Record<OptionState, string> = {
  idle: 'rgba(255,255,255,0.2)',
  picked: 'rgba(255,255,255,0.2)',
  right: 'var(--mucus)',
  wrong: 'var(--tissue)',
  reveal: 'var(--oxygen)',
  dim: 'rgba(255,255,255,0.2)',
}

const COLOR: Record<OptionState, string> = {
  idle: 'var(--ink)',
  picked: 'var(--ink)',
  right: 'var(--mucus)',
  wrong: 'var(--tissue)',
  reveal: 'var(--oxygen)',
  dim: 'var(--ink-dim)',
}

export type QuestionOptionsProps = {
  question: Question
  choice: string | null
  /** Kunci pilihan setelah dijawab (tanpa hukuman, §8). */
  answered: boolean
  onPick: (optionId: string) => void
  /** Awalan data-testid, mis. "quiz-option" → "quiz-option-0". */
  testIdPrefix?: string
}

export function QuestionOptions(props: QuestionOptionsProps) {
  const { question, choice, answered, onPick, testIdPrefix } = props

  return (
    <ul
      className="flex flex-col gap-2"
      role="group"
      aria-label={id.journey.cek.pilihan}
    >
      {question.options?.map((option, index) => {
        const picked = choice === option.id
        const state = optionState(
          answered,
          picked,
          option.id === question.answer,
        )
        return (
          <li key={option.id}>
            <button
              type="button"
              disabled={answered}
              onClick={() => {
                if (!answered) onPick(option.id)
              }}
              aria-pressed={picked}
              data-testid={
                testIdPrefix ? `${testIdPrefix}-${index}` : undefined
              }
              className="min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm disabled:cursor-default"
              style={{ borderColor: BORDER[state], color: COLOR[state] }}
            >
              {option.text}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
