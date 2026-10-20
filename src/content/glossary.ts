/**
 * Glosarium (§15). Istilah harus konsisten di seluruh konten.
 * Saat murid menyentuh/meng-hover istilah, glosarium ditampilkan (M8).
 */
export type GlossaryEntry = {
  term: string
  definition: string
  /** Padanan istilah Inggris bila relevan (§2). */
  english?: string
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'Inspirasi',
    definition: 'Menghirup udara (volume dada naik, tekanan turun).',
    english: 'Inhalation',
  },
  {
    term: 'Ekspirasi',
    definition: 'Menghembuskan udara (volume dada turun, tekanan naik).',
    english: 'Exhalation',
  },
  {
    term: 'Diafragma',
    definition:
      'Otot berbentuk kubah di bawah paru, pengatur napas utama.',
    english: 'Diaphragm',
  },
  {
    term: 'Alveolus',
    definition: 'Kantung udara mungil tempat pertukaran gas.',
    english: 'Alveolus',
  },
  {
    term: 'Difusi',
    definition: 'Perpindahan zat dari konsentrasi tinggi ke rendah.',
    english: 'Diffusion',
  },
  {
    term: 'Silia',
    definition: 'Rambut halus yang menyapu lendir dan partikel keluar.',
    english: 'Cilia',
  },
  {
    term: 'Hemoglobin',
    definition: 'Protein di sel darah merah pengikat O₂.',
    english: 'Haemoglobin',
  },
  {
    term: 'Volume tidal',
    definition: 'Volume udara napas biasa.',
    english: 'Tidal volume',
  },
  {
    term: 'Kapasitas vital',
    definition:
      'Volume terbesar yang dapat dihembuskan setelah menarik napas sedalam mungkin.',
    english: 'Vital capacity',
  },
  {
    term: 'Spirometer',
    definition: 'Alat pengukur volume dan laju udara paru.',
    english: 'Spirometer',
  },
]
