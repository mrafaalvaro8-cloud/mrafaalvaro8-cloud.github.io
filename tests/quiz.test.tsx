import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { QuizPage } from '../src/features/quiz/QuizPage'
import { questions } from '../src/content/quiz'
import { useProgressStore } from '../src/app/stores'

describe('QuizPage (M8 kuis adaptif)', () => {
  beforeEach(() => {
    useProgressStore.setState({ answers: {}, mastery: {} })
    void useProgressStore.persist.clearStorage()
  })

  it('merender ringkasan penguasaan per topik dan tombol mulai', () => {
    render(<QuizPage />)
    expect(
      screen.getByRole('heading', { name: 'Kuis Adaptif' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Penguasaan per topik/)).toBeInTheDocument()
    // Setiap konsep harus punya bar penguasaan
    const konsepIds = new Set(questions.map((q) => q.conceptId))
    for (const id of konsepIds) {
      // label di-render sebagai camelCase → title case
      const label = id
        .replace(/-co2$/, '-CO₂')
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      expect(screen.getByText(label)).toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: 'Mulai kuis' })).toBeInTheDocument()
  })

  it('tombol "Mulai kuis" masuk ke mode soal', async () => {
    render(<QuizPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Mulai kuis' }))
    // Tunggu soal muncul
    await screen.findByText(/Soal berikutnya/)
    // Setiap opsi rendered (minimal 2 opsi, semua soal mcq 4 pilihan)
    const optionButtons = screen.getAllByRole('button', { name: /./ }).filter((b) =>
      b.closest('ul[aria-label="Pilihan jawaban"]'),
    )
    expect(optionButtons.length).toBeGreaterThanOrEqual(2)
    // Pencet opsi pertama — apapun soalnya, status harus muncul
    fireEvent.click(optionButtons[0])
    // Check the status message - "Tepat sekali!" (benar) atau "Belum tepat" (salah)
    const status = await screen.findByRole('status')
    expect(status.textContent ?? '').match(/Tepat|Belum/)
    // Setelah jawaban, tombol "Soal berikutnya" muncul
    expect(screen.getByRole('button', { name: /Soal berikutnya/ })).toBeInTheDocument()
  })

  it('jawaban benar & salah memperbarui store progress', () => {
    render(<QuizPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Mulai kuis' }))
    const q = questions[0]
    const correctOpt = (q.options ?? []).find((o) => o.id === q.answer)
    if (!correctOpt) throw new Error('soal tanpa jawaban')
    fireEvent.click(screen.getByRole('button', { name: correctOpt.text }))

    const state = useProgressStore.getState()
    expect(state.answers[q.id]).toBe(q.answer)
    expect(typeof state.mastery[q.conceptId]).toBe('number')
  })
})
