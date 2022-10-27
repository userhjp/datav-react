import { ISchema } from '@formily/react';

export const FullScreenSchema: ISchema = {
  type: 'object',
  properties: {
    fullScreen: {
      type: 'string',
      title: '全屏显示',
      'x-component': 'BgImg',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        style: {
          paddingBottom: 12,
          marginBottom: 8,
          borderBottom: 'solid 1px #333',
        },
      },
      'x-component-props': {
        placeholder: '输入图片地址',
        prefix: "{{icon('Link')}}",
      },
      default: '/static/images/fullscreen.svg',
    },
    exitFullScreen: {
      type: 'string',
      title: '退出全屏',
      'x-component': 'BgImg',
      'x-decorator': 'FormItem',
      'x-component-props': {
        placeholder: '输入图片地址',
        prefix: "{{icon('Link')}}",
      },
      default: '/static/images/fullscreen-exit.svg',
    },
    backgroundColor: {
      type: 'string',
      title: '背景颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      default: 'rgba(0, 0, 0, 0)',
    },
    borderRadius: {
      type: 'number',
      title: '圆角',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 1,
      },
      default: 0,
    },
  },
};
