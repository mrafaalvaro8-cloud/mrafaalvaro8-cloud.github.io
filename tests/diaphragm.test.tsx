import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DiaphragmSim from '../src/features/diaphragm/DiaphragmSim'

describe('DiaphragmSim (M2)', () => {
  it('menampilkan kontrol, panel data, dan catatan model', () => {
    render(<DiaphragmSim />)
    expect(
      screen.getByRole('heading', { name: 'Simulator Diafragma dan Hukum Boyle' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
    expect(screen.getByLabelText('Tarik diafragma')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Tahan untuk menarik diafragma' }),
    ).toBeInTheDocument()
    // Panel data wajib (KS M2): volume, tekanan, arah aliran
    expect(screen.getByText('Volume rongga dada (relatif)')).toBeInTheDocument()
    expect(
      screen.getByText('Tekanan intrapulmoner (relatif terhadap atmosfer)'),
    ).toBeInTheDocument()
    expect(screen.getByText('Arah aliran udara')).toBeInTheDocument()
    // Label wajib (§7.3)
    expect(screen.getByText('Model sederhana untuk belajar')).toBeInTheDocument()
  })

  it('tiga tingkat penjelasan bisa dipilih dan mengubah teks', async () => {
    render(<DiaphragmSim />)
    const sma = screen.getByRole('button', { name: 'SMA' })
    fireEvent.click(sma)
    expect(sma).toHaveAttribute('aria-pressed', 'true')
    // Grafik P × V hanya muncul di level SMA (§6 M2)
    expect(screen.getByText('Grafik P × V (mode SMA)')).toBeInTheDocument()
    // Teks penjelasan berganti ke level SMA
    expect(screen.getByText(/bergerak sepanjang hiperbola/)).toBeInTheDocument()
  })

  it('mode pernapasan bisa ditukar (perut ↔ dada)', () => {
    render(<DiaphragmSim />)
    const dada = screen.getByRole('button', {
      name: 'Pernapasan dada (otot antartulang rusuk)',
    })
    fireEvent.click(dada)
    expect(dada).toHaveAttribute('aria-pressed', 'true')
  })

  it('panel terisi angka saat mount (bukan "—")', () => {
    render(<DiaphragmSim />)
    const dt = screen.getByText('Volume rongga dada (relatif)')
    const span = dt.parentElement?.querySelector('dd span')
    expect(span).toHaveTextContent(/^\d+\.\d{2}$/)
    const tekanan = screen.getByText(
      'Tekanan intrapulmoner (relatif terhadap atmosfer)',
    )
    const spanTekanan = tekanan.parentElement?.querySelector('dd span')
    expect(spanTekanan).toHaveTextContent(/^\d+\.\d{2}$/)
  })

  it('slider menggerakkan target volume tanpa error', () => {
    render(<DiaphragmSim />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '100' } })
    fireEvent.change(screen.getByRole('slider'), { target: { value: '0' } })
  })
})
