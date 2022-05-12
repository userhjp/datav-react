import { ISchema } from '@formily/react';
import { presetImages } from './data';

export const BorderBoxSchema: ISchema = {
  type: 'object',
  properties: {
    borderImg: {
      type: 'string',
      title: '边框样式',
      'x-decorator': 'FormItem',
      'x-component': 'ImageSelect',
      enum: presetImages,
      default: 'box1',
    },
  },
};
