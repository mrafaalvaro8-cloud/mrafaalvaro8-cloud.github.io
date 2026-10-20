# NAPAS — Belajar Sistem Pernapasan

Website pembelajaran IPA sistem pernapasan manusia yang interaktif dan immersif
untuk murid SD akhir–SMA Indonesia plus guru. **Baca `AGENTS.md` sebelum
menambah kode** — dokumen itu sumber kebenaran tunggal proyek ini.

## Perintah

```bash
npm install        # pasang dependensi
npm run dev        # server pengembangan
npm run build      # build produksi
npm run preview    # uji build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest (unit)
```

Urutan verifikasi sebelum menganggap tugas selesai:
`npm run lint && npm run typecheck && npm run test`

## Struktur

- `src/engine/` — logika murni TypeScript (fisika, fisiologi, skor) + unit test
- `src/content/` — semua teks & data pelajaran (bukan di komponen)
- `src/features/` — satu fitur satu folder, dimuat lazy
- `public/models/` — model 3D (wajib catat lisensi di `LICENSES.md`)
