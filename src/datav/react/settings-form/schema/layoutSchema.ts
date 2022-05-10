import { ISchema } from '@formily/react';
import { ZoomMode } from '../../../shared';

export const layoutSchema: ISchema = {
  type: 'object',
  properties: {
    page: {
      type: 'void',
      'x-component': 'FormTitle',
      'x-component-props': {
        label: '排列布局',
      },
      properties: {
        layout: {
          type: 'number',
          title: '组件对齐',
          default: ZoomMode.auto,
          'x-decorator': 'FormItem',
          'x-component': 'CompLayout',
        },
      },
    },
  },
};
