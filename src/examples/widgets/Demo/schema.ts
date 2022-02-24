import { ISchema } from '@formily/react';

export const DemoSchema: ISchema = {
  type: 'object',
  properties: {
    opacity: {
      type: 'string',
      title: '其他属性',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
      },
      default: 1,
    },
  },
};
