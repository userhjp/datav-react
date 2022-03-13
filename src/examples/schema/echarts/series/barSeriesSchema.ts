import { fillTypes } from '@/examples/shared';
import { ISchema } from '@formily/react';
import { seriesColorSchema } from './seriesColorSchema';

/** 柱状图柱条系列配置 */
export const barSeriesSchema: ISchema = {
  type: 'object',
  properties: {
    type: {
      default: 'bar',
    },
    itemStyle: {
      type: 'object',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        gradientDirection: {
          type: 'string',
          title: '渐变类型',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
            buttonStyle: 'solid',
          },
          enum: fillTypes,
          default: 'vertical',
        },
        color: seriesColorSchema,
      },
    },
  },
};
