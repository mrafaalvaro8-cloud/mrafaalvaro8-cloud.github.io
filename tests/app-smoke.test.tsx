import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../src/app/App'

describe('App (asap Fase 0 + navigasi fitur)', { retry: 2 }, () => {
  // jsdom memakai satu window untuk seluruh file: state history yang ditulis
  // test sebelumnya (tab) harus dibersihkan agar tiap test mulai dari awal.
  beforeEach(() => {
    window.history.replaceState(null, '', window.location.href)
  })

  it('merender beranda dengan judul NAPAS dan perjalanan (lazy)', async () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'NAPAS' })).toBeInTheDocument()
    expect(
      await screen.findByRole('heading', {
        name: 'Perjalanan Satu Tarikan Napas',
      }),
    ).toBeInTheDocument()
  })

  it('tab Simulator Diafragma memuat fitur M2 (lazy)', async () => {
    render(<App />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Simulator Diafragma' }),
    )
    expect(
      await screen.findByRole('heading', {
        name: 'Simulator Diafragma dan Hukum Boyle',
      }),
    ).toBeInTheDocument()
  })

  it('kembali (tombol/gestur Android) mengembalikan tab sebelumnya', async () => {
    render(<App />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Simulator Diafragma' }),
    )
    expect(
      await screen.findByRole('heading', {
        name: 'Simulator Diafragma dan Hukum Boyle',
      }),
    ).toBeInTheDocument()

    // Kembali ke entri history pertama (tanpa state tab) → harus ke perjalanan
    fireEvent.popState(window)
    expect(
      await screen.findByRole('heading', {
        name: 'Perjalanan Satu Tarikan Napas',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Perjalanan Napas' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })

  it('tab terpilih bertahan saat halaman dimuat ulang (dari history.state)', () => {
    window.history.replaceState({ tab: 'diaphragm' }, '', window.location.href)
    render(<App />)
    expect(
      screen.getByRole('button', { name: 'Simulator Diafragma' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })
})
