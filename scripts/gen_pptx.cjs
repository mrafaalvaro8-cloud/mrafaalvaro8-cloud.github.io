/**
 * Generate team presentation for NAPAS project.
 * Uses pptxgenjs (already in package.json).
 *
 * Output: website-napas-team.pptx
 */
const PptxGenJS = require("pptxgenjs");

const pres = new PptxGenJS();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.title = "Tim NAPAS — SMPN 1 Sijunjung Kelas 8.4";
pres.author = "Tim Pengembang NAPAS";

// NAPAS brand palette (dark bioluminescent — matches the website)
const C = {
  deep:    "0A1020",   // bg-deep
  oxygen:  "4FD1FF",   // --oxygen
  ink:     "EAF2FF",   // --ink
  dim:     "9FB3D1",   // --ink-dim
  mucus:   "7CE0A5",   // --mucus
  tissue:  "E0566B",   // --tissue
  co2:     "F2B84B",   // --co2
  white:   "FFFFFF",
  card:    "132035",   // card surface
};

// ── Slide masters ──────────────────────────────────────────────

pres.defineSlideMaster({
  title: "Dark Slide",
  background: { color: C.deep },
  objects: [
    { rect: { x: 0, y: 5.15, w: 10, h: 0.47, fill: { color: C.oxygen, transparency: 85 } } },
  ],
});

pres.defineSlideMaster({
  title: "Light Slide",
  background: { color: C.white },
  objects: [
    { rect: { x: 0, y: 5.15, w: 10, h: 0.47, fill: { color: C.deep } } },
  ],
});

// ── 1. Title slide ─────────────────────────────────────────────
let s = pres.addSlide({ masterName: "Dark Slide" });
s.addText("NAPAS", {
  x: 0.5, y: 1.0, w: 9, h: 1.0,
  fontSize: 68, bold: true, color: C.oxygen, align: "center", fontFace: "Arial",
});
s.addText("Website IPA Interaktif Sistem Pernapasan", {
  x: 0.5, y: 2.1, w: 9, h: 0.6,
  fontSize: 26, color: C.ink, align: "center", fontFace: "Calibri",
});
s.addText(
  "Perjalanan satu tarikan napas — belajar dari hidung hingga sel darah merah lewat simulasi interaktif.",
  { x: 1, y: 2.9, w: 8, h: 0.5, fontSize: 16, color: C.dim, align: "center", fontFace: "Calibri" }
);
s.addText("Tim Pengembang  ·  SMPN 1 Sijunjung  ·  Kelas 8.4", {
  x: 0.5, y: 4.5, w: 9, h: 0.45,
  fontSize: 18, color: C.mucus, align: "center", fontFace: "Arial",
});

// ── 2. Tentang NAPAS ───────────────────────────────────────────
s = pres.addSlide({ masterName: "Light Slide" });
s.addText("Apa Itu NAPAS?", {
  x: 0.5, y: 0.25, w: 9, h: 0.65,
  fontSize: 36, bold: true, color: C.deep, fontFace: "Arial",
});
const pts = [
  "Website pembelajaran IPA tentang sistem pernapasan manusia yang interaktif dan immersif.",
  "Dirancang untuk murid SD akhir, SMP, dan SMA sesuai Kurikulum Merdeka.",
  "Konsep inti: \"Perjalanan Satu Tarikan Napas\" — murid menyusuri tubuh dari hidung hingga alveolus.",
  "Menggabungkan simulasi, game edukatif, skenario kehidupan nyata, dan kuis adaptif.",
  "Berjalan offline-first di HP kelas menengah tanpa memerlukan akun atau pelacak pihak ketiga.",
  "Setiap konsep punya tiga tingkat penjelasan: ringkas (SD), standar (SMP), mendalam (SMA).",
];
pts.forEach((txt, i) => {
  s.addText(txt, {
    x: 0.8, y: 1.0 + i * 0.62, w: 8.4, h: 0.55,
    fontSize: 18, color: C.dim, bullet: true, fontFace: "Calibri",
    breakLine: i < pts.length - 1,
  });
});
s.addText("Belajar lewat melakukan, bukan hanya membaca.", {
  x: 0.8, y: 4.75, w: 8.4, h: 0.4,
  fontSize: 14, italics: true, color: C.oxygen, fontFace: "Calibri",
});

// ── 3. Anggota tim ─────────────────────────────────────────────
s = pres.addSlide({ masterName: "Dark Slide" });
s.addText("Anggota Tim", {
  x: 0.5, y: 0.4, w: 9, h: 0.7,
  fontSize: 44, bold: true, color: C.oxygen, align: "center", fontFace: "Arial",
});
s.addText("SMPN 1 Sijunjung  —  Kelas 8.4", {
  x: 0.5, y: 1.15, w: 9, h: 0.45,
  fontSize: 22, color: C.dim, align: "center", fontFace: "Calibri",
});

// Four member cards in a 2×2 grid
const members = [
  { name: "M Raffa Alvaro",   accent: C.oxygen },
  { name: "Evan Harlen Asyraf", accent: C.co2 },
  { name: "Syakira Ramadhani",  accent: C.tissue },
  { name: "Rahil Adyna Putri",  accent: C.mucus },
];
const cols = [0.5, 5.2];
const rows = [1.9, 3.6];
members.forEach((m, i) => {
  const col = cols[i % 2];
  const row = rows[Math.floor(i / 2)];
  // Card background
  s.addShape("rect", {
    x: col, y: row, w: 4.3, h: 1.4,
    fill: { color: C.card },
    line: { color: m.accent, width: 1.5 },
    rectRadius: 0.1,
  });
  // Accent dot
  s.addShape("ellipse", {
    x: col + 0.15, y: row + 0.5, w: 0.12, h: 0.12,
    fill: { color: m.accent },
  });
  // Name
  s.addText(m.name, {
    x: col + 0.35, y: row + 0.3, w: 3.8, h: 0.5,
    fontSize: 20, bold: true, color: m.accent, fontFace: "Arial",
  });
  // Role
  s.addText("SMPN 1 Sijunjung — Kelas 8.4", {
    x: col + 0.35, y: row + 0.85, w: 3.8, h: 0.35,
    fontSize: 13, color: C.dim, fontFace: "Calibri",
  });
});

// ── 4. Teknologi ───────────────────────────────────────────────
s = pres.addSlide({ masterName: "Light Slide" });
s.addText("Teknologi yang Digunakan", {
  x: 0.5, y: 0.25, w: 9, h: 0.65,
  fontSize: 36, bold: true, color: C.deep, fontFace: "Arial",
});
const tech = [
  ["React + TypeScript + Tailwind CSS", "Antarmuka responsif dan aksesibel"],
  ["Zustand", "Pengelolaan state global (progres, pengaturan, simulasi)"],
  ["GSAP + ScrollTrigger", "Scrollytelling perjalanan napas"],
  ["IndexedDB (idb-keyval)", "Penyimpanan progres lokal tanpa akun"],
  ["Vite-plugin-pwa", "Dukungan offline setelah di-cache pertama"],
  ["Vitest", "Pengujian otomatis logika simulasi dan kuis"],
];
tech.forEach(([title, desc], i) => {
  const y = 1.0 + i * 0.7;
  s.addText(title, {
    x: 0.8, y, w: 3.6, h: 0.35,
    fontSize: 18, bold: true, color: C.deep, fontFace: "Arial",
  });
  s.addText(desc, {
    x: 4.6, y, w: 4.6, h: 0.35,
    fontSize: 16, color: C.dim, fontFace: "Calibri",
  });
  // Small accent bar
  s.addShape("rect", {
    x: 0.8, y: y + 0.42, w: 0.6, h: 0.05,
    fill: { color: C.oxygen },
  });
});

// ── 5. Fitur utama ─────────────────────────────────────────────
s = pres.addSlide({ masterName: "Dark Slide" });
s.addText("Fitur Utama", {
  x: 0.5, y: 0.25, w: 9, h: 0.65,
  fontSize: 36, bold: true, color: C.oxygen, fontFace: "Arial",
});
const features = [
  { icon: "🫁", title: "Perjalanan Napas", desc: "Scrollytelling 7 stasiun dari hidung hingga alveolus dengan interaksi per stasiun." },
  { icon: "🌬️", title: "Simulator Diafragma", desc: "Visualisasi Hukum Boyle interaktif — slider menggerakkan diafragma, panel tekanan-volume." },
  { icon: "🧠", title: "Kuis Adaptif", desc: "Soal disusun dari konsep terlemah; jawaban memperbarui penguasaan secara lokal." },
  { icon: "📴", title: "Offline-First", desc: "PWA precache konten inti; berjalan tanpa internet setelah dikunjungi sekali." },
];
features.forEach((f, i) => {
  const y = 1.0 + i * 1.0;
  // Emoji box
  s.addShape("rect", {
    x: 0.6, y, w: 0.7, h: 0.7,
    fill: { color: C.card },
    line: { color: C.oxygen, width: 1 },
    rectRadius: 0.1,
  });
  s.addText(f.icon, {
    x: 0.6, y, w: 0.7, h: 0.7,
    fontSize: 28, align: "center", valign: "middle",
  });
  // Title + desc
  s.addText(f.title, {
    x: 1.5, y, w: 3.5, h: 0.35,
    fontSize: 20, bold: true, color: C.ink, fontFace: "Arial",
  });
  s.addText(f.desc, {
    x: 1.5, y: y + 0.38, w: 7.8, h: 0.5,
    fontSize: 15, color: C.dim, fontFace: "Calibri",
  });
});

// ── 6. Penutup ─────────────────────────────────────────────────
s = pres.addSlide({ masterName: "Dark Slide" });
s.addText("Terima Kasih!", {
  x: 0.5, y: 0.8, w: 9, h: 0.9,
  fontSize: 56, bold: true, color: C.oxygen, align: "center", fontFace: "Arial",
});
s.addText("NAPAS — Belajar Sistem Pernapasan Manusia", {
  x: 0.5, y: 1.9, w: 9, h: 0.55,
  fontSize: 24, color: C.ink, align: "center", fontFace: "Calibri",
});
s.addText(
  "M Raffa Alvaro  ·  Evan Harlen Asyraf  ·  Syakira Ramadhani  ·  Rahil Adyna Putri",
  { x: 0.5, y: 2.8, w: 9, h: 0.45, fontSize: 17, color: C.mucus, align: "center", fontFace: "Arial" }
);
s.addText("SMPN 1 Sijunjung  —  Kelas 8.4", {
  x: 0.5, y: 3.4, w: 9, h: 0.4,
  fontSize: 17, color: C.dim, align: "center", fontFace: "Calibri",
});
s.addText(
  "https://mrafaalvaro8-cloud.github.io",
  { x: 0.5, y: 4.2, w: 9, h: 0.4, fontSize: 15, color: C.co2, align: "center", fontFace: "Courier New" }
);

// ── Write ──────────────────────────────────────────────────────
const out = "C:/Users/HP/ipa/website-napas-team.pptx";
pres.writeFile({ fileName: out }).then(() => {
  console.log("Written:", out);
});
