import { getTokenStorage, sigEncryption } from '@/utils';
import { message, notification } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
interface APIResponse {
  code: number;
  data: any;
  message: string;
  [key: string]: any;
}
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const instance = axios.create();

const errorHandler = (error: any) => {
  const { response } = error;
  debugger;
  let message = '';
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, config } = response;
    message = `请求错误 ${status}: ${config.url}`;
    notification.error({
      message,
      description: errorText,
    });
  } else {
    message = '网络异常';
    notification.error({
      description: '网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return {
    data: null,
    code: -1,
    message,
  };
};

instance.interceptors.request.use((config) => {
  const url = config.url;
  // config.params['uat'] = getTokenStorage();
  config.params['sig'] = 'appcode_test0000';
  // config.params = sigEncryption(url, config.params);
  return config;
}, errorHandler);

instance.interceptors.response.use((res) => {
  const data = res.data;
  data.code = typeof data.code === 'string' ? Number(data.code) : data.code;
  switch (data.code) {
    case 110:
      message.error('未登录或登录已过期，请重新登陆');
      break;
    case 404:
      notification.error({
        message: `请求错误 ${data.code}: ${res.config.url.split('?')[0]}`,
        description: `${data.message || codeMessage[data.code]}`,
      });
      break;
    case 999:
      notification.error({
        message: `请求错误: 参数加密有误`,
        description: `${data.message || codeMessage[data.code]}`,
      });
    default:
      break;
  }
  return data;
}, errorHandler);

const request = async (url: string, options: AxiosRequestConfig) => {
  const res = await instance.request<APIResponse>({
    method: 'GET',
    baseURL: process.env.API_URL,
    params: {},
    url,
    ...options,
  });
  return res;
};

export { request };
