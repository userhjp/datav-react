import { WidgetConfig } from '@/datav/react/interface';
import { presetImages } from '.';

export const Config: WidgetConfig = {
  w: 380,
  h: 220,
  attr: {
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
  },
};

export default Config;
