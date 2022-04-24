import { textSchema } from '@/examples/schema/textSchema';
import { lineStyles } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const TabSchema: ISchema = {
  type: 'object',
  properties: {
    style: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: 'Tab样式',
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(0, 0, 0, 0)',
        },
        btnSpacing: {
          type: 'number',
          title: '按钮间距',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 10,
        },
        voidTextStyle: textSchema(),
      },
      default: {
        fontSize: 16,
      },
    },
    activeStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '选中样式',
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#1890ff',
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
        borderWidth: {
          type: 'number',
          'x-decorator-props': {
            feedbackText: '边框宽度',
          },
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
  },
};
