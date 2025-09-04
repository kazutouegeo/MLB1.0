module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  globals: {
    api: 'readonly',
    ui: 'readonly',
    API: 'readonly',
    mlbApp: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-console': ['off'],
    'no-undef': ['error']
  },
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'dist/',
    'build/',
    'logs/'
  ]
};