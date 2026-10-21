import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { VocalCords } from '../src/features/journey/interactions/VocalCords'

/**
 * Interaksi epiglotis & pita suara di stasiun Faring-Laring (M1).
 *
 * jsdom tidak punya Web Audio maupun pemutaran media, jadi kita pasang tiruan
 * `HTMLMediaElement.prototype.play` / `pause` untuk memeriksa volume dan
 * status putar. Ini mengunci perilaku penting:
 *  1. Suara mengikuti posisi slider — makin jauh digeser, makin besar volume.
 *     (Versi awal hanya bunyi tepat di 100%; di Android jempol sering berhenti
 *     di 99% sehingga terdengar "tidak ada suara".)
 *  2. Menyentuh slider menyiapkan audio lebih awal (preload) agar tidak ada
 *     jeda unduh di jaringan lambat.
 *
 * Catatan: kita memakai vi.spyOn(window, 'Audio') — bukan vi.stubGlobal —
 * karena stubGlobal menambah property baru yang bisa bocor ke berkas tes lain
 * dan membuat tests/app-smoke.test.tsx gagal saat seluruh suite dijalankan.
 * Elemen audio ditangkap dari objek yang dikembalikan (jsdom tidak memasukkan
 * elemen Audio ke DOM).
 */

let tiruan: {
  play: ReturnType<typeof vi.fn<() => Promise<void>>>
  pause: ReturnType<typeof vi.fn<() => void>>
}
let dibuat: HTMLAudioElement[]

beforeEach(() => {
  dibuat = []
  tiruan = {
    play: vi.fn<() => Promise<void>>(() => Promise.resolve()),
    pause: vi.fn<() => void>(),
  }
  HTMLMediaElement.prototype.play = tiruan.play
  HTMLMediaElement.prototype.pause = tiruan.pause
  // Bungkus konstruktor Audio supaya elemen yang dibuat bisa diperiksa.
  // Harus bisa dipanggil dengan `new` — komponen memakai `new Audio(...)`.
  function AudioTiruan(this: unknown, src?: string) {
    const audio = document.createElement('audio')
    if (src) audio.src = src
    dibuat.push(audio)
    return audio
  }
  vi.spyOn(window, 'Audio').mockImplementation(
    AudioTiruan as unknown as typeof Audio,
  )
})

afterEach(() => {
  vi.restoreAllMocks()
})

const slider = () => screen.getByRole('slider') as HTMLInputElement

function geserKe(nilai: number) {
  fireEvent.change(slider(), { target: { value: String(nilai) } })
}

/** Elemen audio buatan komponen. */
function audioTerakhir(): HTMLAudioElement | undefined {
  return dibuat[dibuat.length - 1]
}

function jumlahAudio(): number {
  return dibuat.length
}

describe('VocalCords — epiglotis dan suara pita suara', () => {
  it('menampilkan kontrol epiglotis dan slider getaran', () => {
    render(<VocalCords />)
    expect(
      screen.getByRole('heading', { name: 'Epiglotis dan pita suara' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Telan' })).toBeInTheDocument()
    expect(slider()).toBeInTheDocument()
    expect(screen.getByText('Pita suara diam.')).toBeInTheDocument()
  })

  it('suara mengikuti slider: makin besar geseran, makin besar volume', () => {
    render(<VocalCords />)

    geserKe(30)
    const audio30 = audioTerakhir()
    expect(tiruan.play).toHaveBeenCalled()
    expect(audio30?.volume).toBeCloseTo(0.3, 5)

    geserKe(70)
    expect(audio30?.volume).toBeCloseTo(0.7, 5)

    geserKe(100)
    expect(audio30?.volume).toBeCloseTo(1, 5)

    // Satu elemen audio saja dipakai ulang sepanjang interaksi.
    expect(jumlahAudio()).toBe(1)
  })

  it('slider kembali ke 0 mencoba menghentikan suara', () => {
    render(<VocalCords />)

    fireEvent.pointerDown(slider())
    const audio = audioTerakhir()!
    // Tiru kondisi "sedang bersuara" supaya cabang pause() benar-benar diuji.
    Object.defineProperty(audio, 'paused', {
      configurable: true,
      get: () => false,
    })

    geserKe(80)
    expect(audio.volume).toBeCloseTo(0.8, 5)

    geserKe(0)
    expect(tiruan.pause).toHaveBeenCalled()
    // jsdom tidak punya backend media: currentTime tidak bisa disetel dan
    // volume tidak direset, jadi keduanya tidak diuji di sini —
    // sudah diverifikasi di browser sungguhan.
  })

  it('status teks berubah dari diam → bergetar → penuh (KS M1 huruf c)', () => {
    render(<VocalCords />)

    geserKe(10)
    expect(screen.getByText('Pita suara diam.')).toBeInTheDocument()

    geserKe(50)
    expect(
      screen.getByText('Pita suara bergetar — suara sedang dibuat.'),
    ).toBeInTheDocument()

    geserKe(100)
    expect(
      screen.getByText('Slider penuh — getaran maksimal, suara khas terdengar!'),
    ).toBeInTheDocument()
  })

  it('menyentuh slider menyiapkan audio (preload) untuk HP', () => {
    render(<VocalCords />)
    const sebelum = jumlahAudio()

    fireEvent.pointerDown(slider())
    expect(jumlahAudio()).toBe(sebelum + 1)
    expect(audioTerakhir()?.preload).toBe('auto')
  })

  it('suara tetap jalan meski play() diblokir browser (fallback, §10)', () => {
    tiruan.play.mockImplementation(() => Promise.reject(new Error('diblokir')))
    render(<VocalCords />)

    expect(() => geserKe(60)).not.toThrow()
    expect(audioTerakhir()?.volume).toBeCloseTo(0.6, 5)
  })
})
