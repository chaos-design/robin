const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  extends: ['chaos'],
  rules: {
    'no-unused-vars': 'off',
    'no-cond-assign': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  ignorePatterns: ['**/dist/**', '**/temp/**'],
});
