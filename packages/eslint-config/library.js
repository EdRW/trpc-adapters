const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['eslint:recommended', 'prettier', 'eslint-config-turbo'],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
    'dist/',
  ],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)'],
      rules: {
        'lines-between-class-members': [
          'warn',
          'always',
          {
            exceptAfterSingleLine: true,
          },
        ],
        'padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            prev: 'function',
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: 'function',
          },
        ],
        'no-warning-comments': [
          'error',
          {
            terms: ['remind', 'remindMe', 'warn', 'warning', 'error'],
            location: 'start',
            decoration: ['/', '*', '!', '?'],
          },
        ],
        quotes: [
          'warn',
          'single',
          {
            avoidEscape: true,
          },
        ],
      },
    },
    {
      files: ['*.ts?(x)'],

      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:deprecation/recommended',
      ],
      rules: {
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        'no-unused-vars': 'off', // using @typescript-eslint/no-unused-vars
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            ignoreRestSiblings: true,
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/prefer-function-type': 'off',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
};
