import { textSchema } from '@/examples/schema/textSchema';
import { lineStyles } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const InputSchema: ISchema = {
  type: 'object',
  properties: {
    style: {
      type: 'object',
      properties: {
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(0, 0, 0, 0)',
        },
        borderColor: {
          type: 'string',
          title: '边框颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#1890ff',
        },
        btnColor: {
          type: 'string',
          title: '按钮颜色',
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
    config: {
      type: 'object',
      properties: {
        size: {
          type: 'string',
          title: '输入框大小',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
            buttonStyle: 'solid',
          },
          enum: [
            { value: 'large', label: '大号' },
            { value: 'middle', label: '正常' },
            { value: 'small', label: '小号' },
          ],
          default: 'middle',
        },
        placeholder: {
          type: 'string',
          title: '默认填充文本',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '请输入',
        },
      },
    },
  },
};
