// 自动判断css modules
// https://www.jianshu.com/p/c976b9b3f0a7
import { extname } from 'path';
const CSS_EXTNAMES = ['.css', '.scss', '.sass', '.less'];
export default () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        if (specifiers.length > 0 && CSS_EXTNAMES.includes(extname(value))) {
          source.value = `${value}?css_modules`; // 在路径末尾加上 css_modules 用于 webpack 匹配该文件，如 import Test from './test.less'; 变成 import Test from './test.less?css_modules';
        }
      },
    },
  };
};