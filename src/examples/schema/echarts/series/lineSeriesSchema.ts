import { fillTypes } from '@/examples/shared';
import { ISchema } from '@formily/react';
import { seriesColorSchema } from './seriesColorSchema';

/** 折线系列配置 */
export const lineSeriesSchema: ISchema = {
  type: 'object',
  properties: {
    type: {
      default: 'line',
    },
    // type: {
    //   type: 'string',
    //   title: '填充类型',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   enum: [
    //     { label: '折线', value: 'line' },
    //     { label: '柱状', value: 'bar' },
    //   ],
    //   default: 'bar',
    // },
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
