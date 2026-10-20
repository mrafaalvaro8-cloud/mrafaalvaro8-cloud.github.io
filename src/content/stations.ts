import type { Station } from '../engine/types'

/**
 * Tujuh stasiun "Perjalanan Satu Tarikan Napas" (M1, §6).
 * Semua teks pelajaran ada di sini — bukan di komponen (§4).
 * Tiap stasiun wajib memenuhi KS: interaksi, penjelasan 3 tingkat,
 * dan 1 cek pemahaman. Kolom `source` = rujukan fakta (§7.4).
 */
export const stations: Station[] = [
  {
    id: 'hidung',
    title: 'Hidung: Pintu Penyaring',
    layers: {
      sd: 'Udara masuk lewat hidung. Rambut-rambut halus dan lendir menangkap debu dan kotoran. Udara juga dihangatkan dan dibuat lembap sebelum melangkah ke paru-paru.',
      smp: 'Di rongga hidung, udara disaring oleh rambut hidung dan lendir, dihangatkan oleh pembuluh darah, serta dilembapkan. Partikel yang tertangkap lendir akan tersapu keluar, bukan masuk ke paru-paru.',
      sma: 'Udara inspirasi mengandung ± 21% O₂. Partikel besar (debu, serbuk sari) umumnya tersaring oleh rambut hidung dan lapisan lendir. Udara dihangatkan mendekati suhu tubuh dan dilembapkan hingga hampir jenuh uap air, agar membran alveolus tidak mengering. Inilah lapisan pertama pertahanan saluran napas.',
    },
    interaction: 'dust-filter',
    check: {
      id: 'cek-hidung',
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
    source: ['Buku IPA SD–SMP — sistem pernapasan (Kurikulum Merdeka)'],
  },
  {
    id: 'faring-laring',
    title: 'Faring dan Laring: Persimpangan Jalan',
    layers: {
      sd: 'Tenggorokan (faring) adalah persimpangan udara dan makanan. Saat menelan, penutup tulang rawan bernama epiglotis menutup jalan napas. Di laring ada pita suara yang bergetar saat kamu bersuara.',
      smp: 'Faring membawa udara ke laring sekaligus makanan ke kerongkongan. Epiglotis menutup pembukaan laring saat menelan agar makanan tidak masuk trakea. Aliran udara dari paru membuat pita suara bergetar — di situlah suara berasal.',
      sma: 'Laring berisi sepasang pita suara. Udara yang terdorong keluar dari paru menggetarkan lipatan pita suara; tinggi-rendahnya suara bergantung pada panjang dan tegangan pita. Epiglotis adalah katup mekanis yang menutup glotis saat menelan (deglutisi) — refleks ini mencegah tersedak. Faring adalah persimpangan udara dan makanan; salah satu pintu dikunci setiap saat.',
    },
    interaction: 'vocal-cords',
    check: {
      id: 'cek-faring-laring',
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
    source: ['Buku Biologi SMA — anatomi faring dan laring'],
  },
  {
    id: 'trakea',
    title: 'Trakea: Tabung Bercincin',
    layers: {
      sd: 'Trakea adalah tabung udara yang ditopang cincin tulang rawan supaya selalu terbuka. Silia di dindingnya menyapu lendir berdebu ke atas, lalu dikeluarkan saat kamu batuk.',
      smp: 'Cincin tulang rawan berbentuk C membuat trakea tetap terbuka namun tetap memungkinkan kerongkongan membesar saat menelan. Silia menyapu lendir berpartikel ke atas (sapuan silia) untuk dikeluarkan. Asap rokok memperlambat gerak silia.',
      sma: 'Epitel bersilia di trakea berdenyut sekitar 12–15 kali per detik, mendorong lendir berdebu ke faring — sistem pembersihan ini disebut sapuan silia. Paparan asap rokok memperlambat denyut silia sehingga lendir menumpuk dan perokok batuk berdahak. Cincin tulang rawan berbentuk C (terbuka ke belakang) menjaga saluran tetap tegak sekaligus memberi ruang bagi esofagus saat menelan.',
    },
    interaction: 'cilia',
    check: {
      id: 'cek-trakea',
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
    source: ['WHO — bahaya tembakau bagi kesehatan pernapasan'],
  },
  {
    id: 'bronkus',
    title: 'Bronkus: Pohon Terbalik',
    layers: {
      sd: 'Dari trakea, udara masuk ke bronkus kanan dan kiri, lalu bercabang-cabang menyerupai pohon terbalik hingga menjadi bronkiolus yang sangat halus.',
      smp: 'Trakea bercabang menjadi bronkus kanan yang lebih lebar dan bronkus kiri yang lebih ramping. Paru kanan memiliki 3 lobus dan paru kiri 2 lobus — ada ruang untuk jantung. Bronkus bercabang lagi menjadi bronkiolus yang menuju alveolus.',
      sma: 'Bronkus kanan lebih lebar, pendek, dan tegak sehingga benda asing lebih sering masuk ke paru kanan. Paru kanan 3 lobus; paru kiri 2 lobus dengan takik jantung (corda cardiaca) sebagai ruang bagi jantung. Dinding bronkiolus berotot halus: saat menyempit (serangan asma), resistansi aliran meningkat tajam dan napas sulit keluar.',
    },
    interaction: 'branching',
    check: {
      id: 'cek-bronkus',
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
    source: ['Buku Biologi SMA — anatomi paru-paru dan bronkus'],
  },
  {
    id: 'alveolus',
    title: 'Alveolus: Tempat Bertukar Gas',
    layers: {
      sd: 'Di ujung bronkiolus ada alveolus, kantung udara sekecil gelembung sabun. Dindingnya sangat tipis dan dikelilingi pembuluh darah. Di sini O₂ masuk ke darah dan CO₂ keluar dari darah.',
      smp: 'O₂ berdifusi dari alveolus yang pO₂-nya tinggi ke kapiler yang pO₂-nya rendah; CO₂ berdifusi ke arah sebaliknya. Keduanya bergerak menuruni gradien tekanan parsial, tanpa energi.',
      sma: 'Hukum Fick: laju difusi sebanding luas permukaan dan gradien tekanan, berbanding terbalik dengan ketebalan dinding. Paru memiliki puluhan juta alveolus dengan luas total puluhan meter persegi, dan membran respirasi setebal sekitar seperlima mikrometer. Karena itu gas bertukar sangat cepat bahkan saat napas cepat seperti berlari.',
    },
    interaction: 'diffusion',
    check: {
      id: 'cek-alveolus',
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
    source: ['Buku Biologi SMA — pertukaran gas di alveolus'],
  },
  {
    id: 'sel-darah-merah',
    title: 'Sel Darah Merah: Kurir Oksigen',
    layers: {
      sd: 'O₂ diangkut sel darah merah oleh hemoglobin, lalu dibawa ke seluruh tubuh. Di jaringan, O₂ diserahkan ke sel dan CO₂ dibawa pulang ke paru.',
      smp: 'Sebagian besar O₂ diangkut terikat hemoglobin dalam sel darah merah, sedangkan CO₂ diangkut terutama sebagai bikarbonat dalam plasma. Jantung memompa darah kaya O₂ (merah terang) ke seluruh tubuh dan mengangkut darah kaya CO₂ (merah gelap) kembali ke paru.',
      sma: 'Setiap molekul hemoglobin dapat mengikat hingga 4 molekul O₂. Di paru (pO₂ tinggi) hemoglobin mudah memuat O₂; di jantung dan otot (pO₂ rendah, pCO₂ tinggi, sedikit asam) ia melepas O₂ — disebut efek Bohr. CO₂ kembali ke paru terutama sebagai ion bikarbonat dalam plasma lalu dilepas di alveolus untuk dihembuskan.',
    },
    interaction: 'hemoglobin',
    check: {
      id: 'cek-sel-darah-merah',
      conceptId: 'transpor-gas',
      level: 'smp',
      type: 'mcq',
      prompt: 'Ke mana O₂ dibawa setelah berikatan dengan hemoglobin?',
      options: [
        { id: 'a', text: 'Ke seluruh tubuh melalui jantung dan pembuluh darah' },
        { id: 'b', text: 'Langsung keluar tubuh lewat hidung' },
        { id: 'c', text: 'Disimpan di trakea sampai dibutuhkan' },
        { id: 'd', text: 'Dilepaskan ke udara di dalam paru-paru saja' },
      ],
      answer: 'a',
      explanation:
        'Tepat! Hemoglobin mengantarkan O₂ dari paru, ke jantung, lalu ke seluruh sel tubuh. O₂ tidak dikeluarkan lagi lewat hidung (itu justru tugas CO₂ saat ekspirasi) dan tidak disimpan di trakea.',
      hint: 'Hemoglobin itu "kurir" — ke mana kurir mengantar paketnya?',
      source: 'Buku Biologi SMA — transpor gas dalam darah',
    },
    source: ['Buku Biologi SMA — transpor O₂ dan CO₂ oleh darah'],
  },
  {
    id: 'pulang',
    title: 'Pulang: Napas Kita Berulang',
    layers: {
      sd: 'CO₂ dari tubuh dibawa kembali ke paru lalu dihembuskan keluar. Begitu perjalanan satu tarikan napas berakhir — dan segera dimulai lagi. Rawat parumu dengan olahraga teratur, makan bergizi, dan tidak merokok.',
      smp: 'CO₂ dari jaringan diangkut ke alveolus lalu dihembuskan. Perjalanan lengkapnya: hidung → faring → laring → trakea → bronkus → bronkiolus → alveolus → darah → seluruh tubuh, lalu kembali membawa CO₂.',
      sma: 'Udara ekspirasi masih mengandung ± 16% O₂ dan ± 4% CO₂ — bukan "napas kotor" murni. CO₂ adalah sisa metabolisme yang dibuang tubuh. Menjaga kesehatan sistem pernapasan: tidak merokok, aktivitas fisik teratur, menghindari polusi dan asap, pola makan bergizi, serta memeriksakan kesehatan secara berkala.',
    },
    interaction: 'summary',
    check: {
      id: 'cek-pulang',
      conceptId: 'ekspirasi-co2',
      level: 'smp',
      type: 'mcq',
      prompt: 'Gas apa yang dibuang tubuh lewat udara ekspirasi?',
      options: [
        { id: 'a', text: 'Karbon dioksida (CO₂)' },
        { id: 'b', text: 'Oksigen murni' },
        { id: 'c', text: 'Nitrogen murni' },
        { id: 'd', text: 'Uap air murni' },
      ],
      answer: 'a',
      explanation:
        'Benar! CO₂ adalah sisa metabolisme sel yang dibawa darah ke paru lalu dihembuskan. Perlu diingat, udara ekspirasi bukan CO₂ murni: ia masih mengandung ± 16% O₂ dan ± 4% CO₂, sisanya terutama nitrogen. Pilihan lain salah karena tubuh tidak "memproduksi" oksigen murni untuk dibuang.',
      hint: 'Lihat kembali warna kuning di simulasi CO₂.',
      source: 'Buku IPA — inspirasi dan ekspirasi (Kurikulum Merdeka)',
    },
    source: ['Buku IPA — mekanisme pernapasan dan komposisi udara ekspirasi'],
  },
]
