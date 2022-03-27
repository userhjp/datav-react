import { ISchema } from '@formily/react';

export const IframeSchema: ISchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      title: 'URL地址',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        spellCheck: false,
        placeholder: '请输入URL地址',
      },
    },
  },
};
