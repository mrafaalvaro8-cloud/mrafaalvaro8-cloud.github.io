import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // .claude/worktrees berisi salinan proyek (sesi lain) yang membingungkan
  // parser typescript-eslint (tsconfig ganda) — jangan ikut dilint.
  { ignores: ['dist', 'dev-dist', '.claude'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // AGENTS.md §11 mewajibkan animasi/per-frame update lewat ref (tanpa
    // re-render per frame) — pola yang diizinkan React tapi dilarang oleh
    // aturan compiler `refs`/`immutability`. Nonaktifkan khusus simulasi.
    files: ['src/features/**/*.tsx'],
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
    },
  },
)
