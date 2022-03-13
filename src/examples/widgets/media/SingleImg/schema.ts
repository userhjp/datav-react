import { repeatTypes } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const SingleImgSchema: ISchema = {
  type: 'object',
  properties: {
    imgType: {
      type: 'string',
      title: '图片类型',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
      },
      enum: [
        { value: 'image', label: '位图' },
        { value: 'svg', label: '矢量图' },
      ],
      default: 'image',
    },
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
        prefix: "{{icon('Link')}}",
      },
      'x-reactions': {
        dependencies: ['.imgType'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "image"}}',
          },
        },
      },
      default: '/images/main-img.png',
    },
    svg: {
      type: 'string',
      title: '矢量图',
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
        placeholder: '输入矢量图地址',
        prefix: "{{icon('Link')}}",
      },
      'x-reactions': {
        dependencies: ['.imgType'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "svg"}}',
          },
        },
      },
      default: '/images/datav.svg',
    },
    svgColor: {
      title: '填充色',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      'x-reactions': {
        dependencies: ['.imgType'],
        fulfill: {
          state: {
            visible: '{{$deps[0] === "svg"}}',
          },
        },
      },
      default: '#2483ff',
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
};
