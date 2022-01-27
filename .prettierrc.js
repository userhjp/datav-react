module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 140,
  proseWrap: 'always',
  semi: true, // 末尾添加分号
  // arrowParens: 'avoid', // 箭头函数只有一个参数的时候可以忽略括号
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  endOfLine: 'auto',
  overrides: [
    {
      files: '.prettierrc',
      options: { parser: 'json' },
    },
  ],
};
