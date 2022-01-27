export interface IIdleDeadline {
  didTimeout: boolean;
  timeRemaining: () => DOMHighResTimeStamp;
}

export interface IdleCallbackOptions {
  timeout?: number;
}

// 浏览器空闲时更新，防止浏览器无响应
export const requestIdle = (callback: (params: IIdleDeadline) => void, options?: IdleCallbackOptions): number => {
  return window['requestIdleCallback'](callback, options);
};

export const cancelIdle = (id: number) => {
  window['cancelIdleCallback'](id);
};
