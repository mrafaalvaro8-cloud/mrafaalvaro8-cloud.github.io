<div align="center">

# NAPAS

**Belajar sistem pernapasan manusia lewat perjalanan satu tarikan napas.**

Murid ikut menjadi molekul oksigen yang menyusuri tubuh, dari hidung sampai sel
darah merah, sambil menggeser dan menekan setiap bagian yang dipelajari.

[![Situs](https://img.shields.io/badge/Situs-mrafaalvaro8--cloud.github.io-4FD1FF?style=for-the-badge)](https://mrafaalvaro8-cloud.github.io/)
[![CI](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/deploy.yml)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-offline--ready-5A0FC8?logo=pwa&logoColor=white)
![Tes](https://img.shields.io/badge/tes-41_lolos-7CE0A5)

</div>

---

## Tentang

NAPAS adalah website pelajaran IPA tentang sistem pernapasan manusia. Isinya
dibuat seperti film interaktif, jadi murid tidak cuma membaca teks. Hampir setiap
konsep punya satu hal yang bisa disentuh, digeser, atau dicoba sendiri.

Website ini untuk murid SD kelas akhir, SMP, dan SMA, serta untuk guru. Setiap
materi tersedia dalam tiga tingkat penjelasan yang bisa diganti kapan saja:
ringkas untuk SD, standar untuk SMP, dan mendalam untuk SMA.

### Kenapa dibuat seperti ini

| Bagian | Penjelasan |
| --- | --- |
| Perjalanan, bukan halaman | Posisi scroll mengikuti posisi molekul oksigen di saluran napas. Kamera seolah masuk dari wajah ke dalam hidung. |
| Bisa disentuh | Debu ditembakkan ke lendir, pita suara bergetar mengikuti slider dan mengeluarkan suara, silia melambat saat kena asap rokok. |
| Tetap enak didengar | Semua audio diproses di perangkat sendiri, volumenya kecil, dan bisa dimatikan. Ada mode khusus untuk murid yang sensitif terhadap suara. |
| Bisa dipakai tanpa internet | Setelah dibuka sekali, bagian inti website tetap jalan meski tidak ada koneksi. Cocok untuk sekolah dengan internet terbatas. |
| Bisa dipakai semua orang | Navigasi bisa pakai keyboard, kontras warna cukup, dan animasi besar otomatis berkurang kalau perangkatnya meminta. |
| Aman untuk anak | Tidak perlu akun, tidak ada pelacak dari pihak lain, dan tidak ada audio atau video murid yang diunggah ke server. Progres disimpan di perangkat. |

---

## Cara mencoba

Buka [mrafaalvaro8-cloud.github.io](https://mrafaalvaro8-cloud.github.io/).
Tidak perlu memasang apa pun.

Kalau pakai HP Android dan ingin lebih praktis, buka lewat Chrome, tekan menu,
lalu pilih **Tambahkan ke layar utama**. Nanti NAPAS bisa dibuka seperti aplikasi
biasa.

---

## Fitur

### Sudah selesai

**M1. Perjalanan Satu Tarikan Napas**

Ini bagian utama dari website. Ada tujuh stasiun yang ditempuh berurutan:

1. Hidung, tempat rambut halus dan lendir menyaring debu
2. Faring dan laring, tempat epiglotis menutup dan pita suara bergetar
3. Trakea, tempat silia menyapu lendir, sekaligus membandingkan efek asap
4. Bronkus, tempat udara bercabang, dan menjelaskan lobus paru kanan dan kiri
5. Alveolus, tempat terjadinya pertukaran gas
6. Sel darah merah, tempat hemoglobin mengangkut oksigen
7. Pulang, tempat karbon dioksida dihembuskan keluar

Setiap stasiun punya satu interaksi, penjelasan tiga tingkat, satu pertanyaan
untuk mengecek pemahaman, dan bisa dilewati dengan keyboard.

**M2. Simulator Diafragma dan Hukum Boyle**

Bagian ini untuk mencoba cara kerja napas. Murid bisa menggeser atau menahan
tombol untuk menarik diafragma, lalu melihat diafragma, tulang rusuk, dan paru
bergerak bersamaan. Ada panel data berisi volume rongga dada, tekanan di dalam
paru, dan arah aliran udara. Ada juga pilihan membandingkan pernapasan dada
dengan pernapasan perut, serta grafik tekanan dan volume untuk tingkat SMA.

**M7. Suara dan gerak**

Ada suara suasana napas dan detak jantung, termasuk suara slider pita suara yang
makin keras kalau slidersnya makin jauh digeser. Tersedia juga tombol Kurangi
gerak.

### Rencana selanjutnya

| Fase | Isi | Status |
| :---: | --- | --- |
| 0 | Fondasi proyek, desain, i18n, PWA, CI | Selesai |
| 1 | M1 perjalanan napas, M2 diafragma, skenario kabut asap | Sedang dikerjakan |
| 2 | Spirometer, skenario lain, kuis adaptif, simpan progres | Belum |
| 3 | Model 3D, audio, transisi, mikrofon, getaran | Belum |
| 4 | Gamifikasi: detektif, tower defense, puzzle, lencana | Belum |
| 5 | Lab virtual, perbandingan hewan, asisten AI, dashboard guru | Belum |
| 6 | AR dan VR | Belum |

---

## Menjalankan di komputer

Butuh Node.js versi 22 atau lebih baru.

```bash
git clone https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io.git
cd mrafaalvaro8-cloud.github.io
npm install
npm run dev
```

### Daftar perintah

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Membuat versi produksi ke folder `dist/` |
| `npm run preview` | Mencoba hasil build di komputer sendiri |
| `npm run lint` | Memeriksa aturan penulisan kode |
| `npm run typecheck` | Memeriksa tipe TypeScript |
| `npm run test` | Menjalankan tes |
| `npm run format` | Merapikan penulisan kode |

Sebelum dianggap selesai, jalankan ini dulu:

```bash
npm run lint && npm run typecheck && npm run test
```

---

## Susunan file

```
src/
  app/          pengaturan halaman dan data aplikasi
  content/      semua teks dan data pelajaran, bukan di dalam komponen
    stations.ts   tujuh stasiun perjalanan napas
    scenarios.ts  skenario kehidupan nyata
    glossary.ts   daftar istilah
    lessons/      materi per topik
    quiz/         bank soal
    i18n/id.ts    semua tulisan yang muncul di layar
  engine/       perhitungan fisika dan biologi, tanpa tampilan
  features/     satu fitur satu folder, dimuat saat dibutuhkan
    journey/      M1 perjalanan napas
    diaphragm/    M2 simulator diafragma
  audio/        pengatur suara
  styles/       warna dan tampilan dasar
  components/   komponen yang dipakai bersama

tests/          pengujian komponen
public/
  audio/        file suara, lisensinya dicatat di LICENSES.md
  models/       file model 3D, lisensinya dicatat di LICENSES.md
  icons/        ikon aplikasi
```

Ada tiga aturan yang kami pegang:

1. Isi folder `engine/` hanya berisi perhitungan, tanpa tampilan, dan wajib punya
   tes. Komponen hanya menampilkan hasilnya.
2. Semua teks pelajaran disimpan di folder `content/`, supaya guru bisa mengubah
   materi tanpa menyentuh kode.
3. Tulisan yang muncul di layar tidak ditulis langsung di komponen, tapi diambil
   dari `content/i18n/id.ts`.

Kalau mau ikut mengembangkan, bacalah [AGENTS.md](./AGENTS.md) lebih dulu.
Dokumen itu berisi aturan proyek ini, mulai dari teknologi yang dipakai,
aturan supaya isinya tetap benar secara sains, sampai rencana pengembangan.

---

## Tampilan dan warna

Tema website ini seperti sedang menjelajah ke dalam tubuh. Warnanya dibuat
konsisten supaya tidak membingungkan.

| Nama | Warna | Arti |
| --- | --- | --- |
| `--bg-deep` | `#0A1020` | Latar belakang bagian dalam tubuh |
| `--tissue` | `#E0566B` | Jaringan dan kapiler |
| `--oxygen` | `#4FD1FF` | Oksigen, selalu biru |
| `--co2` | `#F2B84B` | Karbon dioksida, selalu kuning |
| `--mucus` | `#7CE0A5` | Lendir dan silia |
| `--ink` | `#EAF2FF` | Tulisan utama |

Oksigen tidak pernah berganti warna di halaman mana pun. Ada juga mode terang
untuk ruang kelas yang bercahaya terang, sedangkan mode gelap jadi pilihan utama
karena terasa lebih pas.

---

## Bagian sains

Semua perhitungan ada di folder `src/engine/` dan sudah diuji, jadi angkanya
tidak ditulis asal.

- Hukum Boyle, yaitu `P1 x V1 = P2 x V2`. Tekanan selalu cocok dengan volume.
- Laju difusi makin cepat kalau luas permukaannya besar dan dindingnya tipis.
- Spirometer selalu memenuhi `VC = TV + IRV + ERV` dan `TLC = VC + RV`.
- Nilai penguasaan naik 0,15 kali sisa menuju satu kalau benar, dan turun 0,2
  kali nilai sekarang kalau salah.

Beberapa aturan yang harus dipatuhi supaya isinya tidak menyesatkan: paru kanan
punya tiga lobus dan paru kiri dua lobus. Udara yang dihembuskan mengandung
sekitar 16 persen oksigen dan 4 persen karbon dioksida, bukan karbon dioksida
murni. Gas masuk ke darah lewat difusi, jadi paru tidak menyerap udara. Setiap
panel sains diberi keterangan bahwa itu model sederhana untuk belajar.

---

## Privasi dan keamanan anak

- Tidak perlu membuat akun
- Tidak ada pelacak dari pihak lain
- Tidak ada audio atau video murid yang dikirim ke server
- Mikrofon, nanti di M3, diproses di perangkat dan selalu ada pilihan slider
  kalau tidak diizinkan
- Progres disimpan di perangkat sendiri, dan hanya dikirim kalau guru mengizinkan
- Skenario sesak napas dibuat dengan nada menenangkan dan selalu ada tombol
  Hentikan simulasi

Hal ini kami jaga sesuai prinsip perlindungan data pribadi.

---

## Ikut mengembangkan

1. Baca dulu [AGENTS.md](./AGENTS.md) sampai habis.
2. Kerjakan satu modul sampai tuntas, lalu jalankan
   `npm run lint && npm run typecheck && npm run test`.
3. Penulisan pesan commit mengikuti aturan umum, misalnya `feat:`, `fix:`,
   `docs:`, dan `test:`.
4. Jangan menyimpan kunci rahasia, memakai aset yang lisensinya tidak jelas,
   atau menambahkan model 3D tanpa mencatatnya di `LICENSES.md`.

Kerjakan satu bagian dulu sampai benar, pastikan isinya sesuai sains, dan selalu
sediakan cara lain kalau fiturnya tidak bisa dipakai.

## Lisensi

Proyek ini dibuat untuk pembelajaran. Aset dari pihak lain dicatat di
[public/audio/LICENSES.md](./public/audio/LICENSES.md) dan
[public/models/LICENSES.md](./public/models/LICENSES.md).

---

<div align="center">

**Tarik napas dalam-dalam. Sekarang mari kita ikuti ke mana udara pergi.**

_Dibuat untuk murid Indonesia, yang belajar di HP sederhana, di kelas yang
internetnya kadang hilang, dan di sekolah yang jauh dari rumah sakit._

</div>
