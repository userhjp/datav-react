import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const DatePickerSchema: ISchema = {
  type: 'object',
  properties: {
    config: {
      type: 'object',
      properties: {
        size: {
          type: 'string',
          title: '选择框大小',
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
        picker: {
          type: 'string',
          title: '选择类型',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: [
            { value: 'date', label: '日' },
            { value: 'month', label: '月' },
            { value: 'year', label: '年' },
            { value: 'week', label: '周' },
            { value: 'quarter', label: '季度' },
          ],
          default: 'date',
        },
        placeholder: {
          type: 'string',
          title: '默认填充文本',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '请选择',
        },
      },
    },
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
        voidTextStyle: textSchema(),
      },
      default: {
        fontSize: 16,
      },
    },
  },
};
