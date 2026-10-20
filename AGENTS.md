# AGENTS.md — "NAPAS": Website IPA Interaktif Sistem Pernapasan (Immersif)

> Dokumen ini adalah **sumber kebenaran tunggal** untuk AI coding agent apa pun
> (Claude Code, Cursor, Copilot, Codex, Gemini, dll.) dan untuk developer manusia.
> Baca **seluruhnya** sebelum menulis kode. Jika ada konflik antara permintaan
> sesaat dan dokumen ini, tanyakan dulu ke pemilik proyek.

---

## 0. Ringkasan 30 Detik

- **Apa**: Website pembelajaran IPA tentang sistem pernapasan manusia yang sangat interaktif dan immersif.
- **Untuk siapa**: Murid SD akhir, SMP (inti), dan SMA di Indonesia, plus guru.
- **Bahasa antarmuka**: Bahasa Indonesia (baku tapi ramah). Struktur i18n disiapkan agar bisa ditambah bahasa lain.
- **Ide inti**: "Perjalanan Satu Tarikan Napas". Murid menjadi molekul oksigen/pasukan mini yang menyusut dan menyusuri tubuh dari hidung hingga sel darah, sambil mengontrol simulasi (diafragma, napas lewat mikrofon, spirometer) dan menjalani skenario kehidupan nyata (maraton, gunung, menyelam, kabut asap, asma).
- **Prinsip**: Belajar lewat *melakukan*, bukan membaca. Setiap konsep punya satu hal yang bisa disentuh, digeser, atau dirasakan.
- **Akurasi sains > efek visual**. Visual boleh disederhanakan, tidak boleh menyesatkan.

---

## 1. Tujuan dan Non-Tujuan

### Tujuan
1. Murid memahami struktur, fungsi, mekanisme, gangguan, dan upaya menjaga kesehatan sistem pernapasan.
2. Murid merasakan konsep fisika di baliknya (tekanan, volume, difusi) lewat simulasi yang bisa dimanipulasi.
3. Pengalaman terasa seperti film interaktif/game, bukan buku teks digital.
4. Berjalan baik di HP kelas menengah-bawah dan koneksi lambat/terputus (sekolah dengan internet terbatas).
5. Guru dapat memantau progres kelas tanpa mengumpulkan data pribadi berlebihan.

### Non-Tujuan (jangan dibuat)
- Bukan alat diagnosis medis. Skenario penyakit bersifat edukatif.
- Bukan platform sosial terbuka (tidak ada chat bebas antar murid).
- Tidak mengunggah audio/video/foto murid ke server mana pun.
- Tidak ada iklan, pelacak pihak ketiga, atau monetisasi data murid.

---

## 2. Audiens dan Kurikulum

| Jenjang | Kedalaman | Contoh yang ditampilkan |
|---|---|---|
| SD akhir | Organ utama, alur udara, kebiasaan sehat | Hidung, trakea, paru-paru, napas cepat saat berlari |
| SMP (inti) | Organ lengkap, mekanisme napas dada/perut, pertukaran gas, gangguan umum | Alveolus, difusi, bronkitis, asma, TBC, efek rokok |
| SMA | Volume/kapasitas paru, Hukum Boyle, transpor O₂/CO₂, pengaturan napas | Spirometri, hemoglobin, kurva disosiasi, kemoreseptor |

- Setiap konten punya **tiga tingkat penjelasan**: `ringkas` (SD), `standar` (SMP), `mendalam` (SMA). Murid dapat menggeser tingkat kapan saja.
- Selaraskan istilah dengan buku IPA/Biologi Indonesia (Kurikulum Merdeka). Jika ragu, gunakan istilah baku KBBI/buku sekolah dan tampilkan padanan Inggris di glosarium.

---

## 3. Tech Stack (wajib diikuti kecuali pemilik menyetujui perubahan)

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Build | **Vite** + **TypeScript** (strict) | `npm create vite@latest` template `react-ts` |
| UI | **React 18** + **Tailwind CSS** | Komponen kecil, fungsional, hooks |
| State | **Zustand** | Store terpisah: `progress`, `settings`, `sim` |
| Scrollytelling | **GSAP + ScrollTrigger** | Hormati `prefers-reduced-motion` |
| 3D | **Three.js** via **@react-three/fiber** + **drei** | Model glTF/Draco, lazy-load |
| Grafik data | **Canvas 2D** kustom atau **visx/d3-scale** | Spirometer, grafik tekanan |
| Audio | **Web Audio API** (+ `AnalyserNode` untuk mikrofon) | Semua diproses lokal |
| Offline | **vite-plugin-pwa** (Workbox) | Precache inti, cache bertahap untuk aset berat |
| Penyimpanan | **IndexedDB** via `idb-keyval` | Progres murid disimpan di perangkat |
| Tes | **Vitest** + **Testing Library**; **Playwright** untuk e2e | Logika simulasi wajib punya unit test |
| Lint/format | ESLint + Prettier | CI gagal jika ada error |
| AR/VR (fase akhir) | **WebXR** (immersive-ar) | Opsional, feature-detect |

**Aturan dependensi**: minimalkan paket baru. Setiap penambahan harus punya alasan tertulis di PR/commit. Hindari library besar untuk kebutuhan kecil. Target bundle awal (JS gzip) **< 200 KB**; aset 3D dimuat belakangan.

---

## 4. Struktur Folder

```
/
├─ AGENTS.md
├─ public/
│  ├─ models/            # .glb terkompresi (Draco/meshopt)
│  ├─ audio/             # .ogg/.mp3 pendek, ASMR, efek
│  └─ icons/
├─ src/
│  ├─ app/               # router, layout, providers
│  ├─ content/           # SEMUA teks & data pelajaran (JSON/TS), bukan di komponen
│  │  ├─ stations.ts     # stasiun perjalanan napas
│  │  ├─ glossary.ts
│  │  ├─ scenarios.ts
│  │  ├─ quiz/           # bank soal per topik
│  │  └─ i18n/id.ts
│  ├─ features/
│  │  ├─ journey/        # scrollytelling perjalanan napas
│  │  ├─ diaphragm/      # simulator diafragma & Boyle
│  │  ├─ breathing-mic/  # napas lewat mikrofon
│  │  ├─ spirometer/     # simulator volume paru
│  │  ├─ scenarios/      # maraton, gunung, selam, asap, asma
│  │  ├─ games/          # detektif, tower defense, puzzle jalur udara, duel
│  │  ├─ lab/            # eksperimen virtual (balon, air kapur)
│  │  ├─ animals/        # perbandingan alat napas hewan
│  │  ├─ tutor/          # asisten "Tanya Paru-paru"
│  │  ├─ teacher/        # dashboard guru
│  │  └─ xr/             # AR/VR
│  ├─ engine/            # logika murni (TANPA React): fisika, model fisiologi, skor
│  ├─ components/        # UI bersama (Tombol, Kartu, PanelPenjelasan, dll.)
│  ├─ audio/             # manajer audio, mixer, haptic
│  ├─ hooks/
│  ├─ styles/
│  └─ utils/
└─ tests/
```

**Aturan arsitektur**
- `engine/` murni TypeScript tanpa DOM/React → mudah diuji. Komponen hanya menampilkan state dari engine.
- Teks pelajaran **tidak** ditulis langsung di JSX. Letakkan di `content/` agar guru/editor bisa mengubah tanpa menyentuh logika.
- Satu fitur = satu folder = bisa dimuat lazy (`React.lazy` + route split).

---

## 5. Arah Desain Visual dan UX

**Tema**: "Menjelajah ke dalam tubuh" bergaya sci-fi bioluminesen.

- **Palet (token CSS variables)**
  - `--bg-deep: #0A1020` (latar dalam tubuh, biru malam)
  - `--tissue: #E0566B` (jaringan/kapiler, merah koral)
  - `--oxygen: #4FD1FF` (oksigen, biru cerah)
  - `--co2: #F2B84B` (karbon dioksida, kuning kunyit)
  - `--mucus: #7CE0A5` (lendir/silia, hijau mint)
  - `--ink: #EAF2FF` (teks utama), `--ink-dim: #9FB3D1` (teks sekunder)
- **Konsistensi warna sains**: O₂ selalu biru, CO₂ selalu kuning, darah kaya O₂ merah terang, darah miskin O₂ merah gelap. Jangan ubah makna warna antar halaman.
- **Tipografi**: satu keluarga sans humanis yang mudah dibaca anak (mis. *Nunito*/*Atkinson Hyperlegible*) untuk isi, satu display berkarakter untuk judul. Font di-host sendiri (subset Latin) agar tetap jalan offline. Ukuran isi minimal 16px, panjang baris < 70 karakter.
- **Gerak**: gunakan animasi untuk menjelaskan (udara mengalir, alveolus mengembang), bukan dekorasi acak. Satu momen sinematik besar per stasiun, sisanya tenang.
- **Mode terang** tersedia untuk ruang kelas bercahaya terang; mode gelap sebagai default immersif.
- **Mobile-first**: desain pertama untuk layar ~360px. Kontrol sentuh minimal 44×44px.
- Jangan membuat tampilan serba kartu seragam atau gradien dekoratif tanpa makna. Struktur visual harus membawa informasi.

---

## 6. Modul Fitur (Detail dan Kriteria Selesai)

Setiap modul punya **Kriteria Selesai (KS)**. Modul dianggap selesai hanya jika semua KS terpenuhi.

### M1. Scrollytelling "Perjalanan Satu Tarikan Napas" (INTI)
Halaman scroll panjang; posisi scroll = posisi molekul O₂ di saluran napas. Kamera "terjun" dari wajah ke dalam hidung.

Stasiun berurutan (data di `content/stations.ts`):
1. **Hidung** (rongga hidung): rambut halus + lendir menyaring debu; udara dihangatkan dan dilembapkan. *Interaksi*: murid "menembakkan" partikel debu; yang tertangkap lendir berkilau hijau.
2. **Faring dan laring**: persimpangan udara/makanan, epiglotis menutup saat menelan, pita suara. *Interaksi*: opsional mikrofon, suara murid menggetarkan pita suara (amplitudo → animasi).
3. **Trakea**: tabung bercincin tulang rawan rawan-C, silia mendorong lendir ke atas. *Interaksi*: sapuan silia dapat diperlambat (efek rokok) dan dibandingkan.
4. **Bronkus → bronkiolus**: percabangan seperti pohon terbalik. *Interaksi*: murid memilih cabang kiri/kanan (paru kanan 3 lobus, kiri 2 lobus).
5. **Alveolus**: pertukaran gas. *Interaksi*: O₂ berdifusi ke kapiler, CO₂ keluar. Slider "ketebalan dinding" memperlihatkan laju difusi.
6. **Sel darah merah**: O₂ berikatan dengan hemoglobin lalu menuju jantung dan seluruh tubuh; CO₂ kembali ke paru.
7. **Pulang**: perjalanan CO₂ dihembuskan keluar, murid melihat ringkasan jalur.

**KS**: ketujuh stasiun bisa ditempuh maju-mundur; setiap stasiun punya (a) 1 interaksi, (b) penjelasan 3 tingkat, (c) 1 pertanyaan cek pemahaman, (d) audio ambient, (e) fallback 2D, (f) navigasi keyboard.

### M2. Simulator Diafragma dan Hukum Boyle
- Kontrol: slider atau tahan-tombol "tarik diafragma" (0–100%).
- Visual: diafragma datar saat inspirasi, melengkung saat ekspirasi; tulang rusuk bergerak; paru mengembang/mengempis; panah aliran udara.
- Panel data: volume rongga dada (relatif), tekanan intrapulmoner (relatif terhadap atmosfer), arah aliran.
- Mode pembanding: **pernapasan dada** (otot antartulang rusuk) vs **pernapasan perut** (diafragma).
- Mode SMA: tampilkan `P × V = konstan` sebagai grafik berjalan.

**KS**: nilai tekanan selalu konsisten dengan volume (lihat §7.1); tidak bisa menghasilkan aliran udara ke arah yang salah.

### M3. Napas Lewat Mikrofon
- Izin mikrofon diminta hanya saat murid menekan tombol dan dengan penjelasan jelas.
- `AnalyserNode` menghitung amplitudo; amplitudo napas di-*smooth* → menggerakkan paru 3D.
- **Privasi**: tidak ada perekaman, tidak ada pengiriman jaringan. Tampilkan indikator "Mikrofon aktif" dan tombol berhenti yang besar.
- Fallback wajib: jika izin ditolak atau perangkat tak ada mikrofon, pakai slider/tahan-tombol (M2). Kamera **tidak** dipakai di versi awal.
- Fitur latihan: **napas teratur** (inhale 4s, tahan, exhale 6s) dengan panduan visual dan haptic.

**KS**: bekerja di Chrome Android dan Safari iOS; tetap fungsional tanpa izin.

### M4. Simulator Volume Paru (Spirometer)
- Murid menjalankan urutan: napas biasa → inspirasi maksimal → ekspirasi maksimal → napas normal.
- Grafik spirogram terbentuk otomatis dan tiap bagian diberi label: volume tidal, volume cadangan inspirasi (IRV), volume cadangan ekspirasi (ERV), volume residu (RV), kapasitas vital (VC), kapasitas paru total (TLC).
- Nilai acuan dewasa muda (pembulatan didaktik; tampilkan sebagai perkiraan, bukan nilai pribadi murid): TV ≈ 500 mL, IRV ≈ 3000 mL, ERV ≈ 1100 mL, RV ≈ 1200 mL, VC ≈ 4600 mL, TLC ≈ 5800 mL.
- Mode "bandingkan": paru sehat vs asma vs fibrosis (volume/laju berubah).

**KS**: `VC = TV + IRV + ERV` dan `TLC = VC + RV` selalu benar dalam data yang ditampilkan.

### M5. Skenario "Hidup Nyata"
Setiap skenario mengubah parameter engine dan menampilkan dampaknya (detail §7.3):
1. **Lari maraton**: laju napas naik; pantau O₂/CO₂; murid mengatur ritme.
2. **Mendaki gunung**: tekanan udara dan tekanan parsial O₂ turun; jelaskan sesak di ketinggian dan aklimatisasi.
3. **Menyelam**: tekanan air menekan dada; kaitkan dengan Hukum Boyle (udara dalam paru mengecil saat turun); tekankan aturan keselamatan.
4. **Hari berkabut asap**: bandingkan paru sehat vs terpapar partikel (PM2.5). Visual silia melemah, alveolus teriritasi. Relevan dengan karhutla di Sumatra/Kalimantan. Akhiri dengan **tindakan nyata**: masker yang tepat, tetap di dalam ruangan, cek kualitas udara, kapan ke fasilitas kesehatan.
5. **Asma dan alergi**: bronkiolus menyempit; efek inhaler (pelega) ditampilkan sebagai pelebaran saluran. Disclaimer: edukatif, ikuti arahan tenaga kesehatan.

**KS**: tiap skenario punya tujuan belajar tertulis, slider parameter, hasil terukur, dan 1 refleksi akhir.

### M6. Gamifikasi
- **Misi Detektif**: kasus pasien (batuk berdahak 3 minggu, dsb.). Murid memilih pemeriksaan dan menyimpulkan (bronkitis, TBC, pneumonia, asma). Umpan balik menjelaskan *mengapa*. Kasus ditulis di `content/scenarios.ts`.
- **Tower Defense "Benteng Napas"**: patogen/debu menyerang; murid menaruh pertahanan: rambut hidung, lendir, silia, makrofag. Mekanik mengajarkan peran tiap pertahanan.
- **Puzzle Jalur Udara**: seret-letakkan urutan organ (hidung → faring → laring → trakea → bronkus → bronkiolus → alveolus); jalur benar menyala. Wajib aksesibel keyboard (pilih lalu tempatkan).
- **Lencana & Level**: Penjelajah Hidung, Penjaga Alveolus, Master Diafragma, dll. Lencana diberikan karena penguasaan konsep, bukan sekadar waktu pakai.
- **Duel Kelas**: kuis cepat visual organ. Mode lokal/kode ruang guru; tanpa chat bebas, nama tampilan dipilih dari daftar aman.

**KS**: tiap game punya tutorial 30 detik, tingkat kesulitan, dan terhubung ke skor penguasaan topik (§8).

### M7. Elemen Sensorik
- **Audio**: napas, detak jantung, gema bronkus (ASMR ringan). Default **volume rendah**, bisa dimatikan total. Semua audio mulai hanya setelah interaksi pengguna (aturan autoplay browser).
- **Haptic**: `navigator.vibrate` pola halus mengikuti ritme napas (fitur opsional, dimatikan default pada perangkat tak mendukung).
- **Transisi sinematik**: zoom kamera antar stasiun; pangkas otomatis jika perangkat lemah.
- **WebXR (fase akhir)**: paru 3D muncul di atas meja lewat AR; feature-detect, jangan tampilkan tombol jika tak didukung.

### M8. Fitur Belajar
- **Penjelasan berlapis** (klik → definisi singkat, klik lagi → detail).
- **Glosarium** muncul saat istilah disentuh/di-hover.
- **Lab Virtual**: model paru balon dan botol (Hukum Boyle sederhana); uji CO₂ dengan air kapur (menjadi keruh).
- **Perbandingan Hewan**: insang ikan, trakea serangga (spirakel), kantung udara burung, kulit katak, dengan transisi antar model.
- **Kuis adaptif** (§8) dan **ulasan berjarak** (soal yang salah muncul lagi).

### M9. Asisten AI "Tanya Paru-paru"
- Murid bertanya bebas ("Kenapa kita cegukan?"). Jawaban singkat, sesuai tingkat, disertai penyorotan organ terkait di model.
- **Implementasi aman**: panggil LLM lewat *backend proxy* (kunci API **tidak boleh** ada di kode klien). Sediakan mode offline berbasis pencarian kata kunci pada `content/` jika API tak tersedia.
- **System prompt asisten** (simpan di `src/features/tutor/systemPrompt.ts`):
  ```
  Kamu "Paru-paru", pemandu belajar sistem pernapasan untuk murid Indonesia.
  - Jawab dalam Bahasa Indonesia sederhana, maksimal 120 kata, sesuai jenjang {level}.
  - Gunakan analogi yang dekat dengan kehidupan anak.
  - Jika pertanyaan di luar topik pernapasan/tubuh manusia, arahkan balik dengan ramah.
  - Jangan mendiagnosis atau menyarankan obat. Untuk keluhan nyata, sarankan bicara dengan orang tua/guru/tenaga kesehatan.
  - Akhiri dengan satu pertanyaan pemantik opsional.
  - Sertakan tag [HIGHLIGHT:nama_organ] bila ada organ relevan.
  ```
- Moderasi: tolak konten tidak pantas; jangan menyimpan pertanyaan bebas dengan identitas murid.

### M10. Dashboard Guru
- Tampilan kelas: progres per topik, konsep yang sering salah, waktu belajar.
- Data murid memakai **pseudonim/kode kelas**, bukan data pribadi nyata. Ekspor CSV.
- Berfungsi offline-first; sinkronisasi hanya jika guru mengaktifkan.

---

## 7. Model Sains dan Fisiologi (engine)

Semua rumus di `src/engine/` dengan unit test. Jangan "mengarang" angka.

### 7.1 Mekanika napas (didaktik)
- Hukum Boyle: `P₁·V₁ = P₂·V₂` (suhu tetap).
- **Inspirasi**: diafragma berkontraksi turun, rusuk naik → volume rongga dada ↑ → tekanan intrapulmoner < atmosfer → udara masuk.
- **Ekspirasi**: otot relaks → volume ↓ → tekanan > atmosfer → udara keluar.
- Implementasi: simpan `volume` (0–1 relatif) → hitung `pressure = P_atm * (V_ref / volume)` dan turunkan `flow = k * (P_atm - pressure)`. Batasi dan haluskan agar stabil.

### 7.2 Pertukaran gas
- Difusi mengikuti gradien tekanan parsial. Laju difusi berbanding lurus dengan luas permukaan dan gradien, berbanding terbalik dengan ketebalan dinding (Hukum Fick, kualitatif).
- Alveolus: pO₂ tinggi, pCO₂ rendah; kapiler datang dengan pO₂ rendah, pCO₂ tinggi. Gas bergerak menuruni gradien.
- Transpor: sebagian besar O₂ terikat hemoglobin; CO₂ terutama sebagai bikarbonat. Tingkat SMA boleh menampilkan kurva disosiasi oksihemoglobin (bentuk sigmoid, kualitatif).

### 7.3 Parameter skenario (nilai didaktik, bukan klinis)
| Skenario | Ubah | Hasil yang ditampilkan |
|---|---|---|
| Maraton | Kebutuhan O₂ ↑ | Laju napas ↑, volume tidal ↑, CO₂ jaringan ↑ |
| Gunung | Tekanan atmosfer ↓ (≈ turun seiring ketinggian) | pO₂ udara ↓, napas lebih cepat, saturasi ↓ |
| Selam | Tekanan eksternal ↑ | Volume udara ↓ (Boyle), tekanan telinga/dada ↑ |
| Kabut asap | Partikel ↑ | Laju silia ↓, iritasi, batuk, ruang gas efektif ↓ |
| Asma | Diameter bronkiolus ↓ | Resistensi aliran ↑, ekspirasi sulit; inhaler memulihkan diameter |

Selalu cantumkan label **"Model sederhana untuk belajar"** di panel sains.

### 7.4 Aturan akurasi (WAJIB)
- Paru kanan 3 lobus, kiri 2 lobus (ruang untuk jantung).
- Otot napas utama: diafragma dan otot antartulang rusuk.
- Udara inspirasi mengandung ± 21% O₂, ekspirasi ± 16% O₂ dan ± 4% CO₂ (bukan "CO₂ murni").
- Alveolus berdinding sangat tipis (satu lapis sel) dan dikelilingi kapiler.
- Jangan menyatakan "paru-paru menyerap udara"; jelaskan gas berdifusi.
- Jangan menyebut angka kesehatan pribadi sebagai standar individu murid.
- Setiap fakta penting diberi sumber di `content/` (kolom `sumber`: buku kurikulum, WHO, Kemenkes, jurnal).

---

## 8. Sistem Penguasaan dan Kuis Adaptif

- Setiap konsep punya `conceptId` dan skor penguasaan 0–1.
- Pembaruan sederhana: benar → `mastery += 0.15 * (1 - mastery)`; salah → `mastery -= 0.2 * mastery`.
- Pemilihan soal berikutnya: prioritaskan konsep dengan penguasaan terendah yang prasyaratnya sudah > 0.5.
- Bank soal: pilihan ganda, urutkan, label diagram, sebab-akibat. Tiap soal berisi `explanation` (mengapa jawaban benar dan mengapa pengecoh salah) dan `level`.
- Jangan menghukum: tidak ada "game over" yang membuat murid keluar; kesalahan diarahkan ke penjelasan.

**Skema data soal**
```ts
type Question = {
  id: string;
  conceptId: string;
  level: 'sd' | 'smp' | 'sma';
  type: 'mcq' | 'order' | 'label' | 'cause-effect';
  prompt: string;
  options?: { id: string; text: string }[];
  answer: string | string[];
  explanation: string;
  hint?: string;
  source?: string;
};
```

**Skema stasiun**
```ts
type Station = {
  id: string;                 // 'hidung', 'trakea', ...
  title: string;
  layers: { sd: string; smp: string; sma: string };
  interaction: 'dust-filter' | 'vocal-cords' | 'cilia' | 'branching' | 'diffusion' | 'hemoglobin';
  check: Question;
  audio?: string;
  model3d?: string;
  source: string[];
};
```

---

## 9. Aksesibilitas, Inklusi, dan Keamanan Anak

- Target **WCAG 2.2 AA**: kontras ≥ 4.5:1, fokus terlihat, navigasi penuh dengan keyboard, label ARIA, urutan fokus logis.
- Hormati `prefers-reduced-motion` (ganti animasi besar dengan transisi sederhana) dan sediakan tombol **"Kurangi gerak"**.
- Jangan hanya mengandalkan warna (O₂/CO₂ juga dibedakan bentuk/label).
- Teks alternatif untuk semua visual penting; transkrip untuk audio naratif; subtitle untuk narasi.
- Pilihan **mode sensitif**: matikan suara napas keras, flash, dan getar (untuk murid dengan sensitivitas sensorik/asma/kecemasan).
- Skenario asma/sesak tidak boleh menakutkan; gunakan nada menenangkan dan beri tombol "Hentikan simulasi".
- Latihan napas (M3): beri peringatan lembut untuk berhenti jika pusing; jangan ada tantangan menahan napas lama.
- Privasi anak: tanpa akun wajib, tanpa pelacak pihak ketiga, tanpa menyimpan audio/video. Data progres lokal di perangkat, ekspor atas izin guru. Patuhi prinsip perlindungan data pribadi (UU PDP Indonesia).

---

## 10. Performa, Offline, dan Ketahanan

- Target: **LCP < 2,5 s** di 4G lambat; interaksi 60 fps di HP kelas menengah; fallback ke 30 fps/2D otomatis jika FPS < 30 selama 3 detik.
- Model 3D: ≤ 1 MB per model, kompresi Draco/meshopt, level-of-detail, tekstur ≤ 1024px.
- **Dua jalur render**: 3D (WebGL) dan **2D SVG/Canvas fallback** untuk perangkat tanpa WebGL atau hemat daya. Semua fitur inti harus jalan di jalur 2D.
- PWA: precache shell + konten teks + 2D; aset 3D/audio dicache saat pertama dipakai; tampilkan indikator "Siap offline".
- Tampilkan status unduhan aset jelas, dengan opsi "Mode hemat data".
- Tangani kegagalan: izin mikrofon ditolak, WebGL gagal, audio diblokir, penyimpanan penuh → pesan jelas + jalur alternatif.

---

## 11. Konvensi Kode

- TypeScript `strict: true`; tanpa `any` kecuali dengan komentar alasan.
- Komponen React fungsional; satu komponen satu file; penamaan `PascalCase.tsx`; hooks `useXxx`.
- Logika sains/skoring **hanya** di `engine/` dan wajib punya unit test (mis. `VC = TV + IRV + ERV`, arah aliran vs tekanan, pembaruan penguasaan).
- Tidak ada string UI literal di komponen; gunakan `content/i18n/id.ts`.
- Animasi berat memakai `requestAnimationFrame`/GSAP; bersihkan (`cleanup`) saat unmount; hindari re-render per frame (gunakan ref, bukan state).
- Commit mengikuti Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`).
- Jangan commit kunci API, aset berlisensi tak jelas, atau model 3D tanpa catatan lisensi di `public/models/LICENSES.md`.
- Komentar menjelaskan **mengapa**, bukan **apa**.

**Perintah standar** (pastikan ada di `package.json`)
```bash
npm install          # pasang dependensi
npm run dev          # server pengembangan
npm run build        # build produksi
npm run preview      # uji build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest (unit)
npm run test:e2e     # Playwright
```

---

## 12. Peta Jalan dan Definisi Selesai

| Fase | Isi | Selesai jika |
|---|---|---|
| **0. Fondasi** | Vite+TS+Tailwind, routing, token desain, i18n, PWA dasar, CI | `lint`, `typecheck`, `test` hijau; halaman kosong terpasang offline |
| **1. Prototipe inti** | M1 (scrollytelling, versi 2D dahulu) + M2 (diafragma/Boyle) + skenario kabut asap | Murid bisa menempuh perjalanan lengkap dan mengontrol diafragma di HP |
| **2. Simulasi dan data** | M4 spirometer, M5 skenario lain, kuis adaptif (§8), penyimpanan progres | Unit test engine lulus; penguasaan tercatat lokal |
| **3. Immersif** | Model 3D, audio ASMR, transisi sinematik, M3 mikrofon, haptic | 60 fps di HP target; fallback 2D teruji |
| **4. Gamifikasi** | M6 (detektif, tower defense, puzzle, lencana, duel) | Tiap game punya tutorial dan terhubung ke penguasaan |
| **5. Belajar lanjut** | M8 lab virtual + hewan, M9 asisten AI, M10 dashboard guru | Backend proxy aman; ekspor CSV berjalan |
| **6. Eksperimen** | WebXR AR/VR | Feature-detect rapi; tidak merusak jalur lain |

**Urutan prioritas jika waktu terbatas**: M1 → M2 → skenario kabut asap → M4 → kuis adaptif → sisanya.

---

## 13. Cara Agent Bekerja (Aturan Perilaku)

1. **Baca dulu, tanya sedikit, kerjakan.** Jika permintaan jelas dan sesuai dokumen ini, langsung kerjakan. Tanyakan hanya bila ada keputusan yang mengubah arsitektur, lisensi, atau biaya.
2. **Kerja per fase dan per modul.** Jangan membangun semua fitur sekaligus. Selesaikan satu modul sesuai KS, jalankan `lint`, `typecheck`, `test`, lalu lanjut.
3. **Prototipe kecil yang bisa dijalankan** lebih berharga daripada kerangka besar yang belum jalan.
4. **Sains benar dulu.** Jika ragu tentang fakta biologi/fisika, tandai dengan `// TODO(verify): ...` dan beri tahu pemilik proyek; jangan mengarang.
5. **Selalu sediakan fallback** (2D, tanpa audio, tanpa mikrofon) sebelum menganggap fitur selesai.
6. **Jangan menambah dependensi** tanpa alasan tertulis; jangan mengganti stack.
7. **Jangan menyimpan data sensitif** atau memasukkan kunci rahasia ke klien.
8. **Laporkan hasil** pada akhir tiap tugas: apa yang dibuat, cara menjalankan, apa yang diuji, apa yang belum (jujur), dan saran langkah berikutnya.
9. **Konten untuk anak**: nada hangat, jelas, tidak menakut-nakuti, tanpa humor yang merendahkan siapa pun.
10. Jika dokumen ini bertentangan dengan permintaan, **tunjukkan konfliknya** dan minta keputusan; jangan diam-diam memilih.

---

## 14. Contoh Perintah Awal untuk Agent

Salin salah satu ke AI coding agent Anda:

**Fase 0**
> Baca AGENTS.md. Kerjakan Fase 0: inisialisasi proyek Vite + React + TypeScript + Tailwind, pasang Zustand, GSAP, vite-plugin-pwa, Vitest, ESLint, Prettier. Buat struktur folder §4, token desain §5 sebagai CSS variables, dan halaman beranda kosong yang bisa dipasang offline. Pastikan `lint`, `typecheck`, `test`, `build` lulus.

**Fase 1 (bagian M2)**
> Baca AGENTS.md. Implementasikan M2 (Simulator Diafragma dan Hukum Boyle): logika di `src/engine/breathing.ts` dengan unit test sesuai §7.1, lalu UI di `src/features/diaphragm/` dengan slider/tahan-tombol, animasi paru dan diafragma (SVG dulu), panel tekanan-volume, dan mode SD/SMP/SMA. Penuhi semua KS M2.

**Fase 1 (bagian M1)**
> Baca AGENTS.md. Bangun M1 versi 2D: scrollytelling 7 stasiun dengan GSAP ScrollTrigger, data di `content/stations.ts`, satu interaksi per stasiun, penjelasan 3 tingkat, cek pemahaman, dan navigasi keyboard. Hormati `prefers-reduced-motion`.

**Skenario kabut asap**
> Baca AGENTS.md. Implementasikan skenario "Hari berkabut asap" (M5 butir 4): slider kadar partikel, visual silia melemah dan alveolus teriritasi, perbandingan paru sehat vs terpapar, lalu panel tindakan nyata (masker, di dalam ruangan, kapan ke fasilitas kesehatan). Beri label "Model sederhana untuk belajar".

---

## 15. Glosarium Singkat (konsisten di seluruh konten)

| Istilah | Arti ringkas |
|---|---|
| Inspirasi | Menghirup udara (volume dada naik, tekanan turun) |
| Ekspirasi | Menghembuskan udara (volume dada turun, tekanan naik) |
| Diafragma | Otot berbentuk kubah di bawah paru, pengatur napas utama |
| Alveolus | Kantung udara mungil tempat pertukaran gas |
| Difusi | Perpindahan zat dari konsentrasi tinggi ke rendah |
| Silia | Rambut halus yang menyapu lendir dan partikel keluar |
| Hemoglobin | Protein di sel darah merah pengikat O₂ |
| Volume tidal | Volume udara napas biasa |
| Kapasitas vital | Volume terbesar yang dapat dihembuskan setelah menarik napas sedalam mungkin |
| Spirometer | Alat pengukur volume dan laju udara paru |

---

*Versi dokumen: 1.0. Perbarui dokumen ini setiap kali keputusan arsitektur, fitur, atau fakta sains berubah, dan catat perubahan di bagian bawah.*

### Catatan Perubahan
- 1.0 — Dokumen awal menggabungkan seluruh ide brainstorm (perjalanan napas, simulator, skenario, gamifikasi, sensorik, fitur belajar, teknis).
