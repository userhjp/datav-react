import { WidgetConfig } from '@/datav/interface';

export const config: WidgetConfig = {
  w: 380,
  h: 220,
  attr: {
    type: 'object',
    properties: {
      controls: {
        type: 'boolean',
        title: '显示控件',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        default: false,
      },
      loop: {
        type: 'boolean',
        title: '循环播放',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        default: true,
      },
      muted: {
        type: 'boolean',
        title: '静音',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        default: true,
      },
      src: {
        type: 'string',
        title: '视频链接地址',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
        'x-component-props': {
          spellCheck: false,
          placeholder: '链接地址',
        },
        default: 'http://vjs.zencdn.net/v/oceans.mp4',
      },
    },
  },
};

export default config;