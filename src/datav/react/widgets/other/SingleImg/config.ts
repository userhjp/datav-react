import { WidgetConfig } from '@/datav/interface';
import { repeatTypes } from '../../../../shared';

export const Config: WidgetConfig = {
  w: 380,
  h: 220,
  attr: {
    type: 'object',
    properties: {
      backgroundImg: {
        type: 'string',
        title: '背景图',
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
          prefix: "{{icon('LinkOutlined')}}",
        },
        default: '/images/main-img.png',
      },
      repeat: {
        type: 'string',
        title: '图片重复',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: repeatTypes,
        default: 'no-repeat',
      },
      borderRadius: {
        type: 'string',
        title: '圆角',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          unit: 'px',
          min: 0,
        },
        default: 0,
      },
      link: {
        type: 'object',
        'x-component': 'MyFormCollapse',
        'x-component-props': {
          title: '超链接配置',
        },
        properties: {
          href: {
            type: 'string',
            title: '链接地址',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '点击标题区域跳转超链接地址',
              tooltipLayout: 'text',
            },
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入',
            },
            default: '',
          },
          isblank: {
            type: 'boolean',
            title: '是否新开窗口',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: true,
          },
        },
      },
    },
  },
};

export default Config;
