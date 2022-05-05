// common API
import { request } from './request';

/** 字典缓存 */
const dictCache = {};

/** 获取当前的用户信息 */
export async function queryCurrentUser() {
  return request('/user/info', {
    method: 'POST',
  });
}

/** 登录接口 POST */
export async function login(params: { username: string; password: string; picvericode?: string; pictoken?: string }) {
  return request('/user/accountlogin', {
    method: 'POST',
    params,
  });
}

/**
 * 发送验证码
 * @param phone 手机号
 * @returns
 */
export async function getFakeCaptcha(phone: string) {
  return request('/login/captcha', {
    method: 'POST',
    params: { phone },
  });
}

/**
 * 获取图片验证码 POST
 * @param imagewidth 图片宽度
 * @param imageheight 图片高度
 * @param codelength 验证码位数
 * @returns
 */
export async function getPicvericode(imagewidth = 150, imageheight?: string, codelength?: StringConstructor) {
  return request('/user/getpicvericode', {
    method: 'POST',
    params: {
      imagewidth,
      imageheight,
      codelength,
    },
  });
}

/** 获取字典表 */
export async function getOptionList(typecode: string) {
  if (dictCache[typecode]) return dictCache[typecode].data;
  const res = await request('/sys/optionbytypecode', {
    method: 'POST',
    params: { typecode },
  });
  dictCache[typecode] = res;
  return res.data;
}

/** 清除服务器redis缓存 */
export async function clearCache(key = '*') {
  return request('/sys/refreshredis', {
    method: 'POST',
    params: { key },
  });
}
