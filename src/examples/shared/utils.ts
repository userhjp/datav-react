import { isStr } from '@/datav/shared';

/**
 * 简单计算字符串宽度
 */
let TextCanvas: HTMLCanvasElement | null = null;
export const calcStrWidth = (str: string, font: string) => {
  if (!TextCanvas) {
    TextCanvas = document.createElement('canvas');
  }
  const ctx = TextCanvas.getContext('2d');
  ctx.font = font;
  ctx.font;
  return ctx.measureText(str).width;
};

/**
 * 时间戳转换倒计时 日 时 分 秒days
 * @param value 分钟数
 * @param isObj 是否直接返回 日 时 分 值对象而不是返回字符串
 */
export function formatSecondTime(time: number): { minuteTime: number; hourTime: number; dayTime: number; secondTime: number } {
  const dtime = (time - Date.now()) / 1000;
  let secondTime = dtime <= 0 ? 0 : Math.floor(dtime);
  let minuteTime = 0; // 分
  let hourTime = 0; // 小时
  let dayTime = 0; // 天
  if (secondTime >= 60) {
    minuteTime = Math.floor(secondTime / 60);
    secondTime = Math.floor(secondTime % 60);
    if (minuteTime >= 60) {
      hourTime = Math.floor(minuteTime / 60);
      minuteTime = Math.floor(minuteTime % 60);
      if (hourTime >= 24) {
        dayTime = Math.floor(hourTime / 24);
        hourTime = Math.floor(minuteTime % 24);
      }
    }
  }
  return { minuteTime, hourTime, dayTime, secondTime };
}

/**
 * 时间戳转换已超过多长时间 日 时 分 秒days
 * @param value 分钟数
 */
export function formatStartTime(time: number): { minuteTime: number; hourTime: number; dayTime: number; secondTime: number } {
  const dtime = (Date.now() - time) / 1000;
  let secondTime = dtime <= 0 ? 0 : Math.floor(dtime);
  let minuteTime = 0; // 分
  let hourTime = 0; // 小时
  let dayTime = 0; // 天
  if (secondTime >= 60) {
    minuteTime = Math.floor(secondTime / 60);
    secondTime = Math.floor(secondTime % 60);
    if (minuteTime >= 60) {
      hourTime = Math.floor(minuteTime / 60);
      minuteTime = Math.floor(minuteTime % 60);
      if (hourTime >= 24) {
        dayTime = Math.floor(hourTime / 24);
        hourTime = Math.floor(minuteTime % 24);
      }
    }
  }
  return { minuteTime, hourTime, dayTime, secondTime };
}

/** 时间格式的转换 */
export function formatDate(datetime: number | Date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  let date;
  if (typeof datetime === 'number') {
    date = new Date(datetime);
  } else if (typeof datetime === 'object') {
    date = datetime;
  } else {
    return '-';
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  for (const k in o)
    if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
  return fmt;
}

export function camelize(str: string) {
  // 去除中划线分隔符获取单词数组
  const strArr = str.split('-');
  // 如果第一个为空，则去掉
  if (strArr[0] === '') {
    strArr.shift();
  }
  // 遍历第二个单词到最后一个单词，并转换单词首字母为答谢
  for (let i = 1, len = strArr.length; i < len; i++) {
    // 如果不为空，则转成大写
    if (strArr[i] !== '') {
      strArr[i] = strArr[i][0].toUpperCase() + strArr[i].substring(1);
    }
  }
  return strArr.join('');
}

/**
 * Remove leading and trailing whitespace and non-word
 * characters from the given string.
 *
 * @param {String} `str`
 * @return {String}
 */
export const chop = (str: string) => {
  if (!isStr(str)) return '';
  const re = /^[-_.\W\s]+|[-_.\W\s]+$/g;
  return str.trim().replace(re, '');
};

/**
 * Change casing on the given `string`, optionally
 * passing a delimiter to use between words in the
 * returned string.
 *
 * ```js
 * utils.changeCase('fooBarBaz');
 * //=> 'foo bar baz'
 *
 * utils.changeCase('fooBarBaz' '-');
 * //=> 'foo-bar-baz'
 * ```
 * @param {String} `string` The string to change.
 * @return {String}
 * @api public
 */
export const changeCase = (str: string, fn?: (str: string) => string) => {
  if (!isStr(str)) return '';
  if (str.length === 1) {
    return str.toLowerCase();
  }

  str = chop(str).toLowerCase();

  const re = /[-_.\W\s]+(\w|$)/g;
  return str.replace(re, (_, ch) => {
    return fn ? fn(ch) : '';
  });
};

/**
 * PascalCase the characters in `string`.
 *
 * ```js
 * {{pascalCase "foo bar baz"}}
 * <!-- results in:  'FooBarBaz' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 */
export const pascalCase = (str: string) => {
  if (!isStr(str)) return '';
  str = changeCase(str, (ch: string) => {
    return ch.toUpperCase();
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Generating a random int in range (0, max - 1)
 * @param max {number}
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}
