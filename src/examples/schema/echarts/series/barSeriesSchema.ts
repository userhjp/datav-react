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
        name: {
          type: 'string',
          title: '系列名称',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
          default: '',
        },
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
