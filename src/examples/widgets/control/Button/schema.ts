import { textSchema } from '@/examples/schema/textSchema';
import { lineStyles } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const ButtonSchema: ISchema = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      title: '文字内容',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
      },
      default: '按钮',
    },
    style: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '按钮样式',
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(24,144,255,1)',
        },
        voidTextStyle: textSchema(),
      },
      default: {
        fontSize: 16,
      },
    },
    borderStyle: {
      type: 'object',
      title: '边框样式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        borderColor: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '边框颜色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: '#1890ff',
        },
        borderRadius: {
          type: 'number',
          'x-decorator-props': {
            feedbackText: '边框圆角',
          },
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 4,
        },
        borderStyle: {
          type: 'string',
          'x-decorator-props': {
            feedbackText: '边框类型',
          },
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: lineStyles,
          default: 'solid',
        },
      },
    },
    link: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '超链接配置',
        switch: true,
      },
      properties: {
        href: {
          type: 'string',
          title: '链接地址',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: '点击标题文本区域跳转超链接地址',
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
