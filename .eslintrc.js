module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    google: 'readonly',
    cy: 'readonly',
    Cypress: 'readonly',
  },
  rules: {
    'no-unused-vars': 'warn',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      }],
    'max-len': 0,
    'object-curly-newline': 0,
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'react/jsx-filename-extension': 0,
    'no-new': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'arrow-body-style': 'off',
    'no-param-reassign': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-danger': 0,
    'import/no-dynamic-require': 'warn',
    'global-require': 'warn',
  },
  plugins: [
    'jest',
    'cypress',
  ],
};
