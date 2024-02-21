import js from '@eslint/js'
import ts from 'typescript-eslint'
import configPrettier from 'eslint-config-prettier'

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    ignores: ['**/dist/**', 'eslint.config.js', '.eslintcache']
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  configPrettier,

  // rules
  {
    rules: { '@typescript-eslint/ban-ts-comment': 'off' }
  }
]
