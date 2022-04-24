import { isStr } from './types';

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
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
  return text.replace(reg, (key: string) => {
    return data[key.substring(1)] ?? '';
  });
};

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
