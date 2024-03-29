import { textSchema } from '@/examples/schema/textSchema';
import { justifyContents, lineStyles, writingModes } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const TitleSchema: ISchema = {
  type: 'object',
  default: {
    fontSize: 22,
    color: '#fff',
  },
  properties: {
    content: {
      type: 'string',
      title: '文本内容',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      default: '标题内容',
    },
    justifyContent: {
      type: 'string',
      title: '对齐方式',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: justifyContents,
      default: 'center',
    },
    writingMode: {
      type: 'string',
      title: '文字排列方式',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: writingModes,
      default: 'horizontal-tb',
    },
    letterSpacing: {
      type: 'string',
      title: '文字间隔',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        unit: 'px',
        min: 0,
      },
      default: '0',
    },
    textStyle: textSchema(),
    backgroundStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '背景样式',
        switch: true,
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#008bff',
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
          default: 15,
        },
        borderColor: {
          type: 'string',
          title: '边框颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#fff',
        },
        borderStyle: {
          type: 'string',
          title: '边框类型',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: lineStyles,
          default: 'solid',
        },
        borderWidth: {
          type: 'number',
          title: '边框粗细',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            unit: 'px',
            min: 1,
          },
          default: 1,
        },
      },
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
