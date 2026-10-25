/**
 * Semua string UI dalam Bahasa Indonesia. Komponen tidak boleh menulis
 * string literal (AGENTS.md §11). Struktur ini disiapkan agar bisa
 * ditambah bahasa lain (§0).
 * Teks pelajaran (bukan label UI) ada di src/content/.
 */
export const id = {
  app: {
    judul: 'NAPAS',
    tagline:
      'Perjalanan satu tarikan napas — belajar sistem pernapasan manusia lewat simulasi yang bisa kamu sentuh, geser, dan rasakan.',
    memuat: 'Memuat…',
    tabs: {
      journey: 'Perjalanan Napas',
      diaphragm: 'Simulator Diafragma',
      quiz: 'Kuis',
    },
    pilihFitur: 'Pilih fitur',
  },
  umum: {
    levelLabel: 'Tingkat penjelasan',
    levels: { sd: 'SD', smp: 'SMP', sma: 'SMA' },
    sumber: 'Sumber',
    kurangiGerak: 'Kurangi gerak',
    modelCatatan: 'Model sederhana untuk belajar',
pelajaranCatatan: '(catatan: model sederhana untuk belajar)',
    stasiun: 'Stasiun',
  },
  journey: {
    judul: 'Perjalanan Satu Tarikan Napas',
    petunjuk:
      'Gulir halaman — atau pakai tombol navigasi — untuk mengikuti molekul O₂ dari hidung hingga sel darah merah, lalu kembali keluar sebagai CO₂.',
    nav: {
      label: 'Navigasi stasiun',
      sebelumnya: 'Stasiun sebelumnya',
      berikutnya: 'Stasiun berikutnya',
      dariTotal: 'dari',
      daftarStasiun: 'Daftar stasiun',
      posisiAktif: 'Stasiun aktif',
    },
    ambience: {
      nyalakan: 'Putar suasana napas',
      matikan: 'Hentikan suasana',
    },
    cek: {
      judul: 'Cek pemahaman',
      soal: 'Pertanyaan',
      pilihan: 'Pilihan jawaban',
      benar: 'Tepat sekali!',
      salah: 'Belum tepat. Baca penjelasannya, lalu coba lagi.',
      penjelasan: 'Penjelasan',
      hint: 'Petunjuk',
      ulangi: 'Coba lagi',
      tercatat: 'Jawaban tersimpan lokal di perangkatmu (tanpa akun).',
    },
    interaksi: {
      dustFilter: {
        judul: 'Menjebak debu di hidung',
        petunjuk:
          'Klik atau tap butiran debu supaya tertangkap lendir sebelum masuk tenggorokan. Ingin pakai keyboard? Tekan tombol "Semprot lendir".',
        semprot: 'Semprot lendir',
        tertangkap: 'Tertangkap',
        lolos: 'Lolos ke bawah',
        keteranganSehat: 'Hidung menyaring dengan baik — terus jaga kebersihannya!',
        keteranganBocor: 'Ada debu yang lolos. Coba lagi, lebih cepat menangkapnya!',
      },
      vocalCords: {
        judul: 'Epiglotis dan pita suara',
        petunjuk:
          'Tekan "Telan" untuk melihat epiglotis menutup, lalu geser kontrol pita suara — semakin jauh digeser, semakin besar suaranya.',
        telan: 'Telan',
        statusTutup: 'Epiglotis menutup — makanan aman ke kerongkongan.',
        statusBuka: 'Epiglotis terbuka — jalan napas lancar.',
        getar: 'Getaran pita suara',
        getarMati: 'Pita suara diam.',
        getarHidup: 'Pita suara bergetar — suara sedang dibuat.',
        getarPenuh: 'Slider penuh — getaran maksimal, suara khas terdengar!',
      },
      cilia: {
        judul: 'Sapuan silia dan efek asap',
        petunjuk:
          'Nyalakan simulasi asap untuk melihat silia melambat dan lendir berdebu tertahan.',
        asap: 'Simulasi asap rokok',
        sehat: 'Kondisi sehat',
        kecepatan: 'Kecepatan sapuan',
        keteranganSehat:
          'Silia menyapu lendir berdebu keluar dengan teratur — trakea tetap bersih.',
        keteranganAsap:
          'Asap memperlambat silia. Lendir berdebu menumpuk, dan itulah sebab batuk berdahak perokok.',
        lendirKeluar: 'Lendir dikeluarkan',
        lendirTertahan: 'Lendir tertahan',
      },
      branching: {
        judul: 'Pilih jalur percabangan',
        petunjuk: 'Bandingkan bronkus kanan dan bronkus kiri.',
        kanan: 'Bronkus kanan',
        kiri: 'Bronkus kiri',
        infoKanan:
          'Bronkus kanan lebih lebar dan tegak. Paru kanan punya 3 lobus.',
        infoKiri:
          'Bronkus kiri lebih ramping dan mendatar. Paru kiri punya 2 lobus — ruang untuk jantung.',
        jumlahLobus: 'Jumlah lobus',
      },
      diffusion: {
        judul: 'Uji kecepatan difusi',
        petunjuk:
          'Atur ketebalan dinding alveolus, lalu amati laju difusi O₂ (model Hukum Fick).',
        tebal: 'Ketebalan dinding (relatif)',
        laju: 'Laju difusi (relatif)',
        catatanTipis:
          'Dinding sangat tipis — difusi cepat. Inilah kondisi alveolus sehat.',
        catatanTebal:
          'Dinding menebal — difusi melambat dan O₂ sulit masuk darah.',
      },
      hemoglobin: {
        judul: 'Muat dan lepas di perjalanan darah',
        petunjuk:
          'Pindah antara paru dan jaringan untuk melihat hemoglobin bekerja.',
        diParu: 'Di paru',
        diJaringan: 'Di jaringan',
        statusParu: 'Hemoglobin memuat O₂ (biru) dari udara alveolus.',
        statusJaringan:
          'O₂ dilepas ke sel tubuh; hemoglobin membawa CO₂ (kuning) kembali ke paru.',
        slot: 'Ikatan hemoglobin',
      },
      summary: {
        judul: 'Ringkasan jalur',
        petunjuk:
          'Putar ulang perjalanan singkat molekul O₂ — dari hidung sampai kembali sebagai CO₂.',
        putar: 'Putar perjalanan',
        hentikan: 'Hentikan putaran',
        langkah: 'Langkah',
      },
    },
  },
  diaphragm: {
    judul: 'Simulator Diafragma dan Hukum Boyle',
    petunjuk:
      'Tarik slider atau tahan tombol untuk menggerakkan diafragma, lalu amati tekanan dan aliran udara.',
    kontrol: {
      slider: 'Tarik diafragma',
      tahan: 'Tahan untuk menarik diafragma',
      lepasHint: 'Lepas tombol untuk kembali ke posisi tenang.',
    },
    panel: {
      judul: 'Panel data sains',
      volume: 'Volume rongga dada (relatif)',
      tekanan: 'Tekanan intrapulmoner (relatif terhadap atmosfer)',
      aliran: 'Arah aliran udara',
      catatan: 'Model sederhana untuk belajar',
    },
    tekananStatus: {
      bawah: 'di bawah atmosfer',
      sama: 'sama dengan atmosfer',
      atas: 'di atas atmosfer',
    },
    aliran: {
      masuk: 'Masuk',
      keluar: 'Keluar',
      diam: 'Diam',
    },
    modeLabel: 'Mode pernapasan',
    mode: {
      perut: 'Pernapasan perut (diafragma)',
      dada: 'Pernapasan dada (otot antartulang rusuk)',
    },
    levelLabel: 'Tingkat penjelasan',
    levels: { sd: 'SD', smp: 'SMP', sma: 'SMA' },
    grafik: {
      judul: 'Grafik P × V (mode SMA)',
      x: 'Volume (relatif)',
      y: 'Tekanan (relatif)',
      aria: 'Grafik tekanan terhadap volume: tekanan berbanding terbalik dengan volume.',
    },
    diagram: {
      aria:
        'Diagram rongga dada: trakea, paru, tulang rusuk, dan diafragma. Angka pastinya ada di panel data.',
      legendaO2: 'O₂ (udara masuk)',
      legendaCo2: 'CO₂ (udara keluar)',
    },
    pelajaranLabel: 'Penjelasan',
    sumber: 'Sumber',
  },
  scenarios: {},
  quiz: {
    judul: 'Kuis Adaptif',
    petunjuk:
      'Kerjakan soal berdasarkan konsep yang paling sering kamu salah. Setiap jawaban memperbarui penguasaanmu secara lokal di perangkat.',
    ringkasan: 'Penguasaan per topik',
    belum: 'Belum dijawab',
    sudah: 'Sudah dijawab',
    lanjut: 'Lanjut ke soal berikutnya',
    ulangSemua: 'Ulang semua soal',
    selesai: 'Semua soal sudah dijawab — selamat!',
    skor: 'Skor rata-rata',
    konsep: 'Konsep',
    nextLabel: 'Soal berikutnya',
    jalan: 'Mulai kuis',
  },
} as const
