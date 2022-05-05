import { RuleObject } from 'antd/lib/form';

/** 自定义表单验证器 */
export class _Validators {
  /** 是否为空 */
  static isnull(_: RuleObject, value: string): Promise<void> {
    if (!isNull(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('不能为空'));
  }

  /** 是否为数字 */
  static num(_: RuleObject, value: string): Promise<void> {
    if (isNum(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请填写数字'));
  }

  /** 是否为整数 */
  static int(_: RuleObject, value: string): Promise<void> {
    if (isInt(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请填写整数'));
  }

  /** 是否为小数 */
  static decimal(_: RuleObject, value: string): Promise<void> {
    if (isDecimal(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请填写小数'));
  }

  /** 是否为身份证 */
  static idCard(_: RuleObject, value: string): Promise<void> {
    if (isIdCard(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('身份证号格式不正确'));
  }

  /** 是否为手机号 */
  static mobile(_: RuleObject, value: string): Promise<void> {
    if (isMobile(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('请填写正确的手机号'));
  }

  /** 是否url链接 */
  static url(_: RuleObject, value: string): Promise<void> {
    if (isUrl(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('url格式不正确'));
  }

  /** 是否url链接 */
  static email(_: RuleObject, value: string): Promise<void> {
    if (isEmail(value) || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('邮箱格式不正确'));
  }
}

/** 是否为空 */
export function isNull(value: string | number): boolean {
  return !value || value.toString().trim().length < 1;
}

/** 是否为数字 */
export function isNum(value: string | number): boolean {
  return /^((-?\d+\.\d+)|(-?\d+)|(-?\.\d+))$/.test(value.toString());
}

/** 是否为整数 */
export function isInt(value: string | number): boolean {
  // tslint:disable-next-line:triple-equals
  return isNum(value) && parseInt(value.toString(), 10) === value;
}

/** 是否为小数 */
export function isDecimal(value: string | number): boolean {
  return isNum(value) && !isInt(value);
}

/** 是否为身份证 */
export function isIdCard(value: string): boolean {
  return typeof value === 'string' && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(value);
}

/** 是否为手机号 */
export function isMobile(value: string): boolean {
  return typeof value === 'string' && /^(0|\+?86)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9]|14[57])[0-9]{8}$/.test(value);
}

/** 是否URL地址 */
export function isUrl(url: string): boolean {
  // eslint-disable-next-line no-useless-escape
  return /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/.test(
    url
  );
}

/** 是否为邮箱 */
export function isEmail(url: string): boolean {
  return /^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(url);
}
