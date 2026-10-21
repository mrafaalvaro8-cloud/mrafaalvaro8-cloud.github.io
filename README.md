<div align="center">

# 🫁 NAPAS

**Belajar sistem pernapasan manusia lewat perjalanan satu tarikan napas.**

Murid menjadi molekul O₂ yang menyusuri tubuh — dari hidung hingga sel darah
merah — sambil menggeser, menekan, dan merasakan setiap konsep.

[![Live demo](https://img.shields.io/badge/🌐_Live_Demo-mrafaalvaro8--cloud.github.io-4FD1FF?style=for-the-badge)](https://mrafaalvaro8-cloud.github.io/)
[![CI](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io/actions/workflows/deploy.yml)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-offline--ready-5A0FC8?logo=pwa&logoColor=white)
![Tests](https://img.shields.io/badge/tests-41_lolos-7CE0A5)

</div>

---

## ✨ Apa ini?

**NAPAS** adalah website pembelajaran IPA (Biologi) tentang sistem pernapasan
manusia yang dirancang terasa seperti **film interaktif**, bukan buku teks
digital.

**Prinsipnya: belajar lewat _melakukan_, bukan membaca.** Setiap konsep punya
satu hal yang bisa disentuh, digeser, atau dirasakan.

> 🎯 Untuk murid **SD akhir, SMP (inti), dan SMA** di Indonesia, plus guru.
> Setiap materi tersedia dalam **tiga tingkat penjelasan** yang bisa digeser
> kapan saja: ringkas (SD) · standar (SMP) · mendalam (SMA).

### Yang membuatnya berbeda

|                                    |                                                                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 🌊 **Perjalanan, bukan halaman**   | Posisi scroll = posisi molekul O₂ di saluran napas. Kamera "terjun" dari wajah ke dalam hidung.                        |
| 🎚️ **Setiap konsep bisa disentuh** | Debu ditembakkan ke lendir, pita suara bergetar mengikuti slider (beserta suaranya), silia melambat karena asap rokok. |
| 🔊 **Immersif tapi sopan**         | Audio ASMR diproses 100% lokal, volume rendah, bisa dimatikan. Mode sensitif untuk murid dengan kecemasan/asma.        |
| 📴 **Jalan tanpa internet**        | PWA: setelah dibuka sekali, aplikasi inti tetap berfungsi offline. Cocok untuk sekolah dengan koneksi terbatas.        |
| ♿ **Aksesibel**                   | Target WCAG 2.2 AA: navigasi keyboard penuh, kontras ≥ 4.5:1, menghormati `prefers-reduced-motion`.                    |
| 🔒 **Aman untuk anak**             | Tanpa akun, tanpa pelacak pihak ketiga, tanpa mengunggah audio/video murid. Progres tersimpan di perangkat.            |

---

## 🚀 Coba sekarang

**👉 [mrafaalvaro8-cloud.github.io](https://mrafaalvaro8-cloud.github.io/)**

Belum perlu instal apa pun. Untuk pengalaman terbaik di HP: buka di Chrome
Android → menu → **"Tambahkan ke layar utama"** (PWA).

---

## 🗺️ Fitur

### ✅ Sudah jalan

<table>
<tr><td width="50%" valign="top">

**M1 · Perjalanan Satu Tarikan Napas** — _INTI_

Scrollytelling 7 stasiun berurutan:

1. 👃 **Hidung** — rambut & lendir menyaring debu
2. 🗣️ **Faring & Laring** — epiglotis menutup, pita suara bergetar
3. 🌀 **Trakea** — silia menyapu lendir (bandingkan efek asap)
4. 🌳 **Bronkus** — percabangan, lobus paru kanan vs kiri
5. 💨 **Alveolus** — pertukaran gas & ketebalan dinding
6. 🩸 **Sel Darah Merah** — hemoglobin mengangkut O₂
7. 🔁 **Pulang** — CO₂ dihembuskan, ringkasan jalur

Tiap stasiun punya: **1 interaksi**, **penjelasan 3 tingkat**, **1 cek
pemahaman**, audio suasana, dan navigasi keyboard.

</td><td width="50%" valign="top">

**M2 · Simulator Diafragma & Hukum Boyle**

- Geser atau tahan tombol untuk menarik diafragma (0–100%)
- Diafragma, tulang rusuk, dan paru bergerak seirama
- Panel data: volume · tekanan intrapulmoner · arah aliran
- Bandingkan **pernapasan dada** vs **pernapasan perut**
- Mode SMA: grafik `P × V = konstan` berjalan

**M7 · Elemen sensorik**

- Suasana audio napas & detak jantung (Web Audio, lokal)
- Suara slider pita suara yang mengikuti geseran
- Tombol **"Kurangi gerak"**

</td></tr>
</table>

### 🗓️ Rencana

| Fase | Modul                                                             | Status |
| :--: | ----------------------------------------------------------------- | ------ |
|  0   | Fondasi: Vite + TS + Tailwind, token desain, i18n, PWA, CI        | ✅     |
|  1   | M1 perjalanan napas · M2 diafragma · skenario kabut asap          | 🔄     |
|  2   | M4 spirometer · M5 skenario lain · kuis adaptif · simpan progres  | ⏳     |
|  3   | Model 3D · audio ASMR · transisi sinematik · M3 mikrofon · haptic | ⏳     |
|  4   | M6 gamifikasi: detektif, tower defense, puzzle, lencana, duel     | ⏳     |
|  5   | M8 lab virtual & hewan · M9 asisten AI · M10 dashboard guru       | ⏳     |
|  6   | WebXR AR/VR                                                       | ⏳     |

---

## 🛠️ Menjalankan di komputer

Butuh **Node.js 22+**.

```bash
git clone https://github.com/mrafaalvaro8-cloud/mrafaalvaro8-cloud.github.io.git
cd mrafaalvaro8-cloud.github.io
npm install
npm run dev
```

### Perintah

| Perintah            | Fungsi                           |
| ------------------- | -------------------------------- |
| `npm run dev`       | Server pengembangan (hot reload) |
| `npm run build`     | Build produksi ke `dist/`        |
| `npm run preview`   | Uji hasil build secara lokal     |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript (`tsc --noEmit`)      |
| `npm run test`      | Vitest (unit test)               |
| `npm run format`    | Prettier                         |

**Sebelum menganggap tugas selesai:**

```bash
npm run lint && npm run typecheck && npm run test
```

---

## 🧱 Arsitektur

```
src/
├─ app/          router, layout, store Zustand (progress · settings · sim)
├─ content/      SEMUA teks & data pelajaran — bukan di komponen
│  ├─ stations.ts    7 stasiun perjalanan napas
│  ├─ scenarios.ts   skenario "hidup nyata" (maraton, gunung, asap, asma)
│  ├─ glossary.ts    istilah untuk tooltip
│  ├─ lessons/       materi per modul
│  ├─ quiz/          bank soal adaptif
│  └─ i18n/id.ts     seluruh string antarmuka
├─ engine/       logika murni TypeScript (TANPA React) + unit test
├─ features/     satu fitur = satu folder = dimuat lazy
│  ├─ journey/       M1 scrollytelling + interaksi per stasiun
│  └─ diaphragm/     M2 simulator diafragma
├─ audio/        manajer suasana (Web Audio, proses lokal)
├─ styles/       token desain & CSS global
└─ components/   UI bersama

tests/           tes integrasi komponen (Vitest + Testing Library)
public/
├─ audio/        efek suara + LICENSES.md
├─ models/       model 3D + LICENSES.md
└─ icons/        ikon PWA (hasil scripts/generate_icons.py)
```

### Tiga aturan yang dijaga ketat

1. **`engine/` murni TypeScript** — tanpa DOM & React, wajib punya unit test.
   Komponen hanya menampilkan state, tidak menghitung sains.
2. **Teks pelajaran hidup di `content/`** — guru/editor bisa mengubah materi
   tanpa menyentuh kode logika.
3. **Tidak ada string UI di JSX** — semuanya lewat `content/i18n/id.ts`.

> ⚠️ **Sebelum menulis kode, baca [`AGENTS.md`](./AGENTS.md).** Dokumen itu
> sumber kebenaran tunggal proyek ini (stack, aturan sains, aksesibilitas,
> roadmap, konvensi commit).

---

## 🎨 Desain

Tema **"menjelajah ke dalam tubuh"** bergaya sci-fi bioluminesen.

| Token       | Warna     | Makna                   |
| ----------- | --------- | ----------------------- |
| `--bg-deep` | `#0A1020` | Latar dalam tubuh       |
| `--tissue`  | `#E0566B` | Jaringan & kapiler      |
| `--oxygen`  | `#4FD1FF` | O₂ — **selalu biru**    |
| `--co2`     | `#F2B84B` | CO₂ — **selalu kuning** |
| `--mucus`   | `#7CE0A5` | Lendir & silia          |
| `--ink`     | `#EAF2FF` | Teks utama              |

Makna warna **konsisten di seluruh halaman** — O₂ tidak pernah berganti warna.
Mode terang tersedia untuk kelas bercahaya terang; mode gelap adalah default
yang immersif.

---

## 🔬 Sains

Semua perhitungan fisika & fisiologi ada di `src/engine/` **dengan unit test** —
tidak ada angka yang "dikarang".

- **Hukum Boyle** — `P₁·V₁ = P₂·V₂`; tekanan selalu konsisten dengan volume
- **Hukum Fick** (kualitatif) — laju difusi ∝ luas permukaan & gradien ÷ ketebalan
- **Spirometri** — `VC = TV + IRV + ERV` dan `TLC = VC + RV` selalu benar
- **Penguasaan** — benar: `+0.15 × (1 − mastery)`, salah: `−0.2 × mastery`

Aturan akurasi yang wajib dipatuhi: paru kanan 3 lobus / kiri 2 lobus · udara
ekspirasi ± 16% O₂ dan ± 4% CO₂ (bukan CO₂ murni) · gas **berdifusi**, paru
tidak "menyerap udara". Setiap panel sains diberi label
**"Model sederhana untuk belajar"**.

---

## 🔐 Privasi & keselamatan anak

- ❌ Tanpa akun wajib
- ❌ Tanpa pelacak pihak ketiga
- ❌ Tidak ada audio/video murid yang diunggah ke server
- ✅ Mikrofon (M3, nanti) diproses lokal dan selalu punya fallback slider
- ✅ Progres tersimpan lokal di perangkat (IndexedDB), ekspor hanya atas izin guru
- ✅ Nada menenangkan untuk skenario asma/sesak + tombol "Hentikan simulasi"

Sesuai prinsip perlindungan data pribadi (UU PDP Indonesia).

---

## 🤝 Berkontribusi

1. Baca [`AGENTS.md`](./AGENTS.md) sampai habis.
2. Kerjakan **satu modul sampai tuntas** sesuai Kriteria Selesai-nya, lalu
   jalankan `npm run lint && npm run typecheck && npm run test`.
3. Commit mengikuti [Conventional Commits](https://www.conventionalcommits.org/):
   `feat:`, `fix:`, `docs:`, `test:`, `chore:`.
4. Jangan commit kunci API, aset berlisensi tak jelas, atau model 3D tanpa
   catatan di `LICENSES.md`.

**Cara kerja:** kerja per fase & per modul · sains benar dulu · selalu sediakan
fallback (2D, tanpa audio, tanpa mikrofon) · jangan menambah dependensi tanpa
alasan tertulis.

## 📄 Lisensi

Proyek pembelajaran. Aset pihak ketiga dicatat di
[`public/audio/LICENSES.md`](./public/audio/LICENSES.md) dan
[`public/models/LICENSES.md`](./public/models/LICENSES.md).

---

<div align="center">

**Tarik napas dalam-dalam. Sekarang, mari kita ikuti ke mana udara pergi.** 🌬️

_Dibuat untuk murid Indonesia — di HP kelas menengah, di kelas yang internetnya
kadang hilang, di sekolah yang jauh dari rumah sakit._

</div>
