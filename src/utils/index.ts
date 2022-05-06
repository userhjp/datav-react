// import HmacSHA1 from 'crypto-js/hmac-sha1';
// import { SHA256 } from 'crypto-js';
// import Hex from 'crypto-js/enc-hex';
// import { history } from 'umi';
export * from './array';
export * from './validators';
export * from './snapshot';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export function getStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function setStorage(key: string, val: any) {
  const strValue = JSON.stringify(val);
  localStorage.setItem(key, strValue);
}

export function getTokenStorage() {
  return localStorage.getItem('token') || '';
}

export function setTokenStorage(token: string) {
  localStorage.setItem('token', token);
}

/**
 * sig参数加密
 */
export function sigEncryption(path: string, obj: any = {}) {
  // obj = filterNull(obj);
  // obj.appcode = APP_CODE;
  // obj.rnd = Math.random() * 99999998 + 1;
  // obj.ts = new Date().getTime();
  // obj.sig = HmacSHA1(`${path}?${objKeySort(obj)}`, APP_SIG).toString(Hex);
  return obj;
}

/**
 * 将对象参数拼接字符串
 * @param arys 参数对象
 * @param isEncodeURI 是否需要Url编码
 */
export function objKeySort(arys: any, isEncodeURI?: boolean) {
  const newkey = Object.keys(arys).sort();
  let parStr = '';
  for (const key of newkey) {
    if (arys[key] === null || arys[key] === undefined) break;
    if (isEncodeURI) {
      parStr += `${key}=${encodeURIComponent(arys[key])}&`;
    } else {
      parStr += `${key}=${arys[key]}&`;
    }
  }
  return parStr ? parStr.substr(0, parStr.length - 1) : ''; // 返回排好序的新参数
}

/**
 * 过滤掉值为Null的参数
 * @param params 参数对象
 * @param handleDate 自动转换日期类型为number
 */
export function filterNull(params: any, handleDate = true): any {
  Object.keys(params).forEach((f) => {
    if (params[f] === null || params[f] === undefined) {
      delete params[f];
    }
    if (params[f] instanceof Date) params[f] = params[f].getTime();
    if (Array.isArray(params[f])) params[f] = params[f].join();
  });
  return params;
}

/**
 * 密码加密
 */
export function pwdEncryption(pwd: string): string {
  // return SHA256(PWD_SALT + pwd).toString(Hex);
  return '';
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
