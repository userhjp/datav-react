import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const SelectSchema: ISchema = {
  type: 'object',
  properties: {
    style: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '选择器样式',
      },
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
    config: {
      type: 'object',
      properties: {
        size: {
          type: 'string',
          title: '选择器大小',
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
          default: '请选择',
        },
        bordered: {
          type: 'boolean',
          title: '是否有边框',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        allowClear: {
          type: 'boolean',
          title: '支持清除',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        showSearch: {
          type: 'boolean',
          title: '支持搜索',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        showArrow: {
          type: 'boolean',
          title: '显示下拉箭头',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        defaultSelectd: {
          type: 'boolean',
          title: '默认选中',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
      },
    },
  },
};
