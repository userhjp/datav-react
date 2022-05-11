import { ISchema } from '@formily/react';
import { decorateImgList } from './data';

export const DecorateSchema: ISchema = {
  type: 'object',
  properties: {
    borderImg: {
      type: 'string',
      title: '装饰条',
      'x-decorator': 'FormItem',
      'x-component': 'ImageSelect',
      enum: decorateImgList,
      default: 'decorate1',
    },
    backgroundColor: {
      title: '填充色',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      default: 'rgba(225, 225, 225, 1)',
    },
  },
};
