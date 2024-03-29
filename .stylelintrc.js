module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules', 'stylelint-config-rational-order', 'stylelint-config-prettier'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  customSyntax: 'postcss-less',
  rules: {
    'no-descending-specificity': null,
    'no-empty-source': null,
    'function-url-quotes': 'always',
    'plugin/declaration-block-no-ignored-properties': true,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'selector-no-vendor-prefix': null,
    'rule-empty-line-before': null,
    'function-no-unknown': null,
    'import-notation': null,
  },
  ignoreFiles: ['public', 'dist', '**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.svg', '**/*.md', '**/*.png', '**/*.jpg', '**/*.html'],
};
