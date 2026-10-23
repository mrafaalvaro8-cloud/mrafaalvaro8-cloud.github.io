import type { Level } from '../../engine/types'

/**
 * Teks pelajaran Simulator Diafragma (M2) — tiga tingkat §2:
 * ringkas (SD), standar (SMP), mendalam (SMA).
 * Bukan string UI: boleh diedit guru tanpa menyentuh komponen (§4).
 */
export const diaphragmLesson: Record<Level, string> = {
  sd: 'Saat kamu menarik napas, diafragma yang berbentuk kubah bergerak ke bawah dan mendorong paru agar mengembang. Paru jadi lebih besar, udara pun masuk. Saat kamu membuang napas, diafragma mengendur kembali seperti kubah, ruang dada mengecil, dan udara keluar.',
  sma: 'Menarik diafragma memperbesar volume rongga dada. Karena tekanan berbanding terbalik dengan volume (Hukum Boyle, P × V = konstan pada suhu tetap), tekanan intrapulmoner turun di bawah tekanan atmosfer sehingga udara terdorong masuk (inspirasi). Saat diafragma mengendur, volume mengecil dan tekanan naik di atas atmosfer → udara keluar (ekspirasi). Perhatikan grafik: titik bergerak sepanjang hiperbola.',
  smp: 'Saat diafragma tertarik ke bawah, ruang dada membesar. Tekanan udara di dalam paru menjadi lebih kecil daripada tekanan udara di luar, sehingga udara masuk. Saat diafragma mengendur, ruang dada mengecil, tekanan di dalam membesar, dan udara keluar. Begitulah cara paru-paru mengisi dan mengosongkan diri.',
}

export const diaphragmSource: string[] = [
  'Buku IPA SMP — sistem pernapasan, mekanisme pernapasan dada dan perut (Kurikulum Merdeka)',
  'Hukum Boyle, fisika gas — buku pelajaran SMA',
]
