import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const TabSchema: ISchema = {
  type: 'object',
  properties: {
    style: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '未选中样式',
      },
      properties: {
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(0, 0, 0, 0)',
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
  },
};
