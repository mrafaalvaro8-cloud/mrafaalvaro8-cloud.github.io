import type { Question } from '../../engine/types'

/**
 * Bank soal kuis adaptif — selaras dengan 7 stasiun Perjalanan Napas (M1)
 * dan Simulator Diafragma (M2).
 * Setiap conceptId harus ada di stations.ts atau di diaphragm sim.
 * Setiap soal wajib punya `explanation` (mengapa benar & mengapa pengecoh salah)
 * dan `level`.
 */
export const questions: Question[] = [
  // Stasiun 1: Hidung → pertahanan-hidung
  {
    id: 'quiz-pertahanan-hidung',
    conceptId: 'pertahanan-hidung',
    level: 'smp',
    type: 'mcq',
    prompt: 'Apa fungsi rambut halus dan lendir di dalam hidung?',
    options: [
      { id: 'a', text: 'Menyaring debu dan kotoran dari udara' },
      { id: 'b', text: 'Mendinginkan udara agar tubuh kedinginan' },
      { id: 'c', text: 'Menyerap oksigen langsung ke darah' },
      { id: 'd', text: 'Membuat suara saat kita bersuara' },
    ],
    answer: 'a',
    explanation:
      'Benar! Rambut dan lendir menjebak debu serta kotoran supaya tidak masuk ke paru-paru. Pilihan lain salah: udara justru dihangatkan, oksigen baru masuk darah di alveolus, dan suara dibuat pita suara di laring.',
    hint: 'Fungsinya seperti "penyaring" di pintu masuk.',
    source: 'Buku IPA — sistem pernapasan manusia (Kurikulum Merdeka)',
  },
  // Stasiun 2: Faring & Laring → epiglotis
  {
    id: 'quiz-epiglotis',
    conceptId: 'epiglotis',
    level: 'smp',
    type: 'mcq',
    prompt: 'Apa yang terjadi pada epiglotis saat kita menelan?',
    options: [
      { id: 'a', text: 'Membuka lebar agar udara masuk lebih banyak' },
      { id: 'b', text: 'Menutup jalan napas agar makanan tidak masuk trakea' },
      { id: 'c', text: 'Bergetar untuk menghasilkan suara' },
      { id: 'd', text: 'Meleleh lalu tumbuh lagi setelah menelan' },
    ],
    answer: 'b',
    explanation:
      'Tepat! Epiglotis menutup pembukaan laring saat menelan, jadi makanan langsung ke kerongkongan. Pilihan lain salah: yang bergetar adalah pita suara, epiglotis justru harus tertutup — bukan terbuka — saat menelan.',
    hint: 'Bayangkan epiglotis seperti tutup panci kecil.',
    source: 'Buku Biologi SMA — sistem pernapasan dan anatomi laring',
  },
  // Stasiun 3: Trakea → silia-rokok
  {
    id: 'quiz-silia-rokok',
    conceptId: 'silia-rokok',
    level: 'smp',
    type: 'mcq',
    prompt: 'Mengapa perokok sering batuk berdahak?',
    options: [
      { id: 'a', text: 'Paru-peru perokok menjadi terlalu dingin' },
      { id: 'b', text: 'Gerak silia melambat sehingga lendir berdebu menumpuk' },
      { id: 'c', text: 'Cincin tulang rawan trakea patah menahan asap' },
      { id: 'd', text: 'Lendir perokok berwarna hijau dan berat ditahan' },
    ],
    answer: 'b',
    explanation:
      'Benar! Asap rokok memperlambat sapuan silia, sehingga lendir berdebu tidak tersapu keluar dan menumpuk. Batuk berdahak adalah cara tubuh membersihkan penumpukan itu. Pilihan lain tidak tepat: masalah utamanya pada silia, bukan suhu atau patahnya tulang rawan.',
    hint: 'Ingat sapuan silia di trakea — siapa yang menyapu lendir?',
    source: 'WHO — bahaya rokok bagi sistem pernapasan',
  },
  // Stasiun 4: Bronkus → lobus-paru
  {
    id: 'quiz-lobus-paru',
    conceptId: 'lobus-paru',
    level: 'smp',
    type: 'mcq',
    prompt: 'Mengapa paru kiri hanya memiliki 2 lobus?',
    options: [
      { id: 'a', text: 'Memberi ruang bagi jantung' },
      { id: 'b', text: 'Paru kiri sedang tumbuh dan belum lengkap' },
      { id: 'c', text: 'Karena paru kiri bekerja lebih ringan' },
      { id: 'd', text: 'Agar udara masuk hanya ke paru kanan' },
    ],
    answer: 'a',
    explanation:
      'Tepat! Jantung sedikit bersandar ke kiri, sehingga paru kiri hanya berisi 2 lobus agar ada ruang untuk jantung. Paru kanan tetap 3 lobus. Pilihan lain salah — kedua paru sama-sama bekerja, tidak ada yang "menganggur".',
    hint: 'Di mana posisi jantung kamu?',
    source: 'Buku Biologi SMA — anatomi paru-paru',
  },
  // Stasiun 5: Alveolus → difusi-alveolus
  {
    id: 'quiz-difusi-alveolus',
    conceptId: 'difusi-alveolus',
    level: 'smp',
    type: 'mcq',
    prompt: 'Bagaimana arah gerak O₂ dan CO₂ di alveolus?',
    options: [
      { id: 'a', text: 'O₂ ke darah dan CO₂ ke alveolus, keduanya menuruni gradien tekanan' },
      { id: 'b', text: 'O₂ dan CO₂ sama-sama masuk ke darah' },
      { id: 'c', text: 'Keduanya didorong pompa jantung langsung di alveolus' },
      { id: 'd', text: 'CO₂ masuk ke alveolus karena tertarik O₂' },
    ],
    answer: 'a',
    explanation:
      'Benar! O₂ bergerak dari alveolus (pO₂ tinggi) ke darah (pO₂ rendah), sedangkan CO₂ bergerak ke arah berlawanan. Keduanya menuruni gradien tekanan parsial — tidak ada "pompa" di sana, hanya perbedaan tekanan.',
    hint: 'Zat selalu bergerak dari yang banyak ke yang sedikit.',
    source: 'Buku Biologi SMA — pertukaran gas dan Hukum Fick',
  },
  // Stasiun 6: Sel Darah Merah → transpor-gas
  {
    id: 'quiz-transpor-gas',
    conceptId: 'transpor-gas',
    level: 'smp',
    type: 'mcq',
    prompt: 'Apa yang terjadi pada hemoglobin saat darah melewati jaringan otot yang aktif?',
    options: [
      { id: 'a', text: 'Hemoglobin mengikat lebih banyak O₂ karena otot butuh oksigen' },
      { id: 'b', text: 'Hemoglobin melepaskan O₂ karena pO₂ di jaringan lebih rendah daripada di paru' },
      { id: 'c', text: 'Hemoglobin berubah menjadi protein lain untuk menyimpan CO₂' },
      { id: 'd', text: 'Hemoglobin tidak berubah, O₂ tetap terikat sampai kembali ke paru' },
    ],
    answer: 'b',
    explanation:
      'Tepat! Di jaringan aktif, pO₂ rendah dan pCO₂ tinggi (efek Bohr), sehingga hemoglobin melepas O₂. Di paru, sebaliknya — hemoglobin memuat O₂. Pilihan lain salah karena menganggap hemoglobin bersifat statis atau berubah jenis protein.',
    hint: 'Hemoglobin itu kurir: ia menyerahkan paket saat sampai tujuan.',
    source: 'Buku Biologi SMA — transpor gas dan hemoglobin',
  },
  // Stasiun 7: Pulang → ekspirasi-co2
  {
    id: 'quiz-ekspirasi-co2',
    conceptId: 'ekspirasi-co2',
    level: 'sd',
    type: 'mcq',
    prompt: 'Apa yang terjadi pada volume dan tekanan saat kita menghembuskan napas (ekspirasi)?',
    options: [
      { id: 'a', text: 'Volume paru membesar, tekanan turun, udara masuk' },
      { id: 'b', text: 'Diafragma turun, volume bertambah, tekanan sama' },
      { id: 'c', text: 'Volume rongga dada mengecil, tekanan naik di atas atmosfer, udara keluar' },
      { id: 'd', text: 'Otot dinding perut relaks, udara keluar karena gravitasi' },
    ],
    answer: 'c',
    explanation:
      'Tepat! Ekspirasi: diafragma relaks (naik), rusuk turun → volume ↓ → tekanan ↑ → udara terdorong keluar. Pilihan a adalah inspirasi, b dan d menjelaskan mekanisme yang salah.',
    hint: 'Inspirasi = tarik napas (volume ↑), ekspirasi = hembuskan (volume ↓).',
    source: 'Buku IPA SD–SMP — mekanisme pernapasan (Kurikulum Merdeka)',
  },
  // M2 Simulator Diafragma → hukum-boyle
  {
    id: 'quiz-hukum-boyle',
    conceptId: 'hukum-boyle',
    level: 'sma',
    type: 'mcq',
    prompt: 'Saat diafragma berkontraksi turun, apa yang terjadi pada tekanan intrapulmoner?',
    options: [
      { id: 'a', text: 'Tekanan naik di atas atmosfer → udara masuk' },
      { id: 'b', text: 'Volume paru mengecil → tekanan turun → udara masuk' },
      { id: 'c', text: 'Volume rongga dada membesar → tekanan turun di bawah atmosfer → udara masuk' },
      { id: 'd', text: 'Tekanan tetap sama dengan atmosfer, tapi otot menghisap udara' },
    ],
    answer: 'c',
    explanation:
      'Benar! Hukum Boyle: P × V = konstan. Saat volume rongga dada membesar (diafragma turun, rusuk naik), tekanan intrapulmoner turun di bawah tekanan atmosfer, sehingga udara masuk. Pilihan lain salah karena mencampuradukkan arah perubahan tekanan atau menganggap ada "penghisap".',
    hint: 'Coba ingat rumus P₁·V₁ = P₂·V₂ — bila V naik, P turun.',
    source: 'Fisika SMA — Hukum Boyle (gas ideal suhu tetap)',
  },
  // M2 Simulator Diafragma → mekanisme-nafas
  {
    id: 'quiz-mekanisme-nafas',
    conceptId: 'mekanisme-nafas',
    level: 'sd',
    type: 'mcq',
    prompt: 'Otot utama yang membantu kita bernapas adalah…',
    options: [
      { id: 'a', text: 'Diafragma, otot berbentuk kubah di bawah paru-paru' },
      { id: 'b', text: 'Otot lengan yang membantu menarik napas dalam' },
      { id: 'c', text: 'Otot perut saja yang mendorong udara keluar' },
      { id: 'd', text: 'Jantung yang memompa udara masuk-keluar' },
    ],
    answer: 'a',
    explanation:
      'Benar! Diafragma adalah otot pernapasan utama. Saat berkontraksi, diafragma turun → volume rongga dada ↑ → tekanan ↓ → udara masuk. Otot bantu (antartulang rusuk, perut) hanya menyokong pada napas dalam atau batuk. Pilihan b, c, d salah secara anatomi.',
    hint: 'Letakkan tangan di perut, tarik napas dalam — apa yang kamu rasakan?',
    source: 'Buku IPA SD–SMP — sistem pernapasan manusia',
  },
]
