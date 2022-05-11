import { fillTypes } from '@/examples/shared';
import { ISchema } from '@formily/react';
import { seriesColorSchema } from './seriesColorSchema';

/** 折线柱状图系列配置 */
export const lineBarSeriesSchema: ISchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      title: '系列类型',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
        size: 'small',
      },
      enum: [
        { label: '折线', value: 'line' },
        { label: '柱状', value: 'bar' },
      ],
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
          'x-decorator-props': {
            tooltip: '多个颜色时有效',
            tooltipLayout: 'text',
          },
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
