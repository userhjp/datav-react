import { isStr } from './types';

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

export const isIE = function (): boolean {
  return !isNaN(Number(document.DOCUMENT_NODE));
};

export const isEdge = function (): boolean {
  return navigator.userAgent.indexOf('Edge') > -1;
};

export const isFirefox = function (): boolean {
  return !!window.navigator.userAgent.match(/firefox/i);
};

export const isMac = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
};

export function isUndefined(val: any) {
  return val === void 0;
}

export function isUrl(val: string) {
  return /^[a-zA-z]+:\/\/[^\s]*$/.test(val);
}

export function deduplicate<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function ArrayToObject<T>(arr: Array<T>, key: string, value: string): Record<string, string> {
  return arr.reduce((prev, curr) => {
    prev[curr[key]] = curr[value];
    return prev;
  }, {});
}

export function StringArrayToObject(arr: string[]): Record<string, string> {
  return arr.reduce((prev, curr) => {
    prev[curr] = curr;
    return prev;
  }, {});
}

export function toJson<T>(data: any, defaultValue: T) {
  try {
    if (!data) {
      return defaultValue;
    }

    if (isStr(data)) {
      return JSON.parse(data);
    }

    return data;
  } catch {
    return defaultValue;
  }
}

export const copyText = (text: string) => {
  try {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 获取字符串中 :value 形式的参数
 */
export const getTextParams = (text: string) => {
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
  return text.match(reg) ?? [];
};

/**
 * 替换字符串中 :value 形式的参数
 */
export const replaceTextParams = (text: string, data: Record<string, string>) => {
  if (!data || Object.keys(data).length === 0) {
    return text;
  }
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
  return text.replace(reg, (key: string) => {
    return data[key.substring(1)] ?? key;
  });
};

/**
 * 简单计算字符串长度
 */
export const calcStrLen = (str: string) => {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
};

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

export function debounce(fn: () => void, wait: number) {
  let timer: number;
  return function (...arg) {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn.apply(this, arg);
    }, wait);
  };
}

export function generateUUID(len = 24, radix = 62) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i: number;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r: number;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
}

/**
 * 模拟延迟时间
 * @param time 时间
 * @returns
 */
export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
