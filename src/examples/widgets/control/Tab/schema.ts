import { textSchema } from '@/examples/schema/textSchema';
import { lineStyles } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const TabSchema: ISchema = {
  type: 'object',
  properties: {
    layout: {
      type: 'string',
      title: '按钮布局',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
      },
      enum: [
        { value: 'horizontal', label: '水平' },
        { value: 'vertical', label: '垂直' },
      ],
      default: 'horizontal',
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
          default: 'rgba(0, 0, 0, 0)',
        },
        padding: {
          type: 'object',
          title: '内边距',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            vertical: {
              type: 'number',
              'x-decorator-props': {
                feedbackText: '左右',
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
            horizontal: {
              type: 'number',
              'x-decorator-props': {
                feedbackText: '上下',
              },
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 12,
            },
          },
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
          default: '#0a73ff',
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
