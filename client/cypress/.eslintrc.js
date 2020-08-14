module.exports = {
  extends: ['../.eslintrc.js'],
  globals: {
    Cypress: true,
    cy: true,
  },
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
  },
};
