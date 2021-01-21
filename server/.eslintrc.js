const schemaJson = require('./src/graphql/graphql.schema.json');

module.exports = {
  env: {
    node: true,
  },
  extends: ['../.eslintrc.js'],
  plugins: ['graphql', 'simple-import-sort'],
  root: true,
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'graphql/template-strings': ['error', { env: 'apollo', schemaJson }],
    'graphql/required-fields': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
  },
  overrides: [
    {
      files: 'src/server.ts',
      rules: {
        'simple-import-sort/imports': 'off',
      },
    },
  ],
};
