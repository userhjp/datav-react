import { ISchema } from '@formily/react';
import { presetImages } from './preview';

export const BorderBoxSchema: ISchema = {
  type: 'object',
  properties: {
    borderImg: {
      type: 'string',
      title: '边框样式',
      'x-decorator': 'FormItem',
      'x-component': 'BorderSelect',
      enum: presetImages,
      default: 'box1',
    },
  },
};
