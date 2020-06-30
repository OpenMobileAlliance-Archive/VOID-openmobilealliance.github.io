module.exports = {
  env: {
    browser: true,
    es2020: true,
    jquery: true,
  },
  plugins: ['jsx-a11y', 'prettier'],
  extends: ['airbnb-base', 'eslint:recommended', 'prettier', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    ecmaVersion: 11,
    project: 'tsconfig.json',
  },
  rules: { 'no-unused-vars': 'off' },

  // rules: {},
};
