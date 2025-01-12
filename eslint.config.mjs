import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    files: ['packages/**/*.{js?(x),ts?(x),mjs,cjs}'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'off',
      // typescript-eslint
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
);
