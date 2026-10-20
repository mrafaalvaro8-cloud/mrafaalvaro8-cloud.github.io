import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import JourneyPage from '../src/features/journey/JourneyPage'
import { stations } from '../src/content/stations'

describe('JourneyPage (M1 scrollytelling)', () => {
  it('menampilkan judul, ketujuh stasiun, dan indikator posisi', () => {
    render(<JourneyPage />)
    expect(
      screen.getByRole('heading', { name: 'Perjalanan Satu Tarikan Napas' }),
    ).toBeInTheDocument()
    for (const station of stations) {
      expect(
        screen.getByRole('heading', { name: station.title }),
      ).toBeInTheDocument()
    }
    expect(
      screen.getByTestId('posisi-stasiun').textContent,
    ).toContain('Stasiun 1 dari 7')
  })

  it('navigasi maju-mundur mengubah stasiun aktif (KS M1)', () => {
    render(<JourneyPage />)
    fireEvent.click(screen.getByRole('button', { name: /Stasiun berikutnya/ }))
    expect(
      screen.getByTestId('posisi-stasiun').textContent,
    ).toContain('Stasiun 2 dari 7')
    fireEvent.click(screen.getByRole('button', { name: /Stasiun sebelumnya/ }))
    expect(
      screen.getByTestId('posisi-stasiun').textContent,
    ).toContain('Stasiun 1 dari 7')
  })

  it('cek pemahaman memberi umpan balik dan penjelasan setelah dijawab', () => {
    render(<JourneyPage />)
    const region = screen.getByRole('region', { name: 'Hidung: Pintu Penyaring' })
    fireEvent.click(
      within(region).getByRole('button', {
        name: 'Menyaring debu dan kotoran dari udara',
      }),
    )
    expect(within(region).getByText('Tepat sekali!')).toBeInTheDocument()
    expect(within(region).getByText(/Penjelasan/)).toBeInTheDocument()
    // jawaban tak bisa diulang setelah benar (tetap tanpa hukuman §8)
    expect(
      within(region).getByRole('button', {
        name: 'Menyaring debu dan kotoran dari udara',
      }),
    ).toBeDisabled()
  })

  it('ganti tingkat ke SMA mengubah teks penjelasan stasiun aktif', () => {
    render(<JourneyPage />)
    const region = screen.getByRole('region', { name: 'Hidung: Pintu Penyaring' })
    expect(within(region).getByText(/rambut hidung dan lendir, dihangatkan/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'SMA' }))
    expect(within(region).getByText(/21% O₂/)).toBeInTheDocument()
  })

  it('tombol "Kurangi gerak" bekerja dan suasana disembunyikan tanpa Web Audio', () => {
    render(<JourneyPage />)
    const toggle = screen.getByRole('button', { name: 'Kurangi gerak' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    // jsdom tanpa AudioContext → tombol suasana tidak ditawarkan (§M7 tetap aman)
    expect(
      screen.queryByRole('button', { name: 'Putar suasana napas' }),
    ).toBeNull()
  })
})
