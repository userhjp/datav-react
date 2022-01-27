module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "17.x"
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', '@typescript-eslint'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  globals: {
    Window: true,
    JSX: true,
  },
  rules: {
    'prettier/prettier': 2,
    'no-var': 2,
    'no-undef': 0,
    'no-empty': 0,
    'no-fallthrough': 0,
    'no-plusplus': 0,
    'no-nested-ternary': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-unused-vars': 0,
    'no-debugger': 1,
    'no-empty-function': 0,
    'no-underscore-dangle': 0,
    'prefer-const': 1,
    'spaced-comment': 1,
    'quote-props': [1, 'as-needed', { unnecessary: false }],
    'object-curly-spacing': [1, 'always'],
    'object-shorthand': [1, 'always'],
    'react-hooks/exhaustive-deps': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-unresolved': 0,
    'import/no-duplicates': 0,
    'import/no-named-as-default': 0,
    'no-case-declarations': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    'react/self-closing-comp': 1,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-empty-interface': 0
  },
};
