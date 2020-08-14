module.exports = {
  // format package.json
  'package.json': 'prettier-package-json --write',
  '(graphql|server|client)/package.json': 'prettier-package-json --write',

  // format
  'graphql/**/*.graphql': 'prettier --write',
  'server/(src|database)/**/*.(js|ts|json)': 'prettier --write',
  'client/(src|cypress)/**/*.(js|jsx|ts|tsx|json|css|scss)': 'prettier --write',

  // eslint
  'server/src/**/*.(js|jsx|ts|tsx)': 'eslint --fix -c server/.eslintrc.js',
  'server/database/**/*.(js|ts)': 'eslint --fix -c server/.eslintrc.js',
  'client/src/**/*.(js|jsx|ts|tsx)': 'eslint --fix -c client/.eslintrc.js',
  'client/cypress/**/*.(js,ts)': 'eslint --fix -c client/cypress/.eslintrc.js',
};
