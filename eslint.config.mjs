import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierObj from './.prettierrc.json' assert { type: 'json' }

/** @type {import('eslint').Linter.Config} */
export default [
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['./**/*.{ts,tsx}'],
  },
  {
    languageOptions: {
      ...tseslint.configs.recommended.languageOptions,
    },
  },
  {
    plugins: {
      ...tseslint.configs.recommended.plugins,
      prettier: prettierPlugin,
    },
  },
  {
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'prettier/prettier': ['warn', prettierObj],
    },
  },
]
