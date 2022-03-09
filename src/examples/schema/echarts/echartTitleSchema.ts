import { ISchema } from '@formily/react';
import { echartsLablePositions, fontWeights } from '../../shared';
import { textSchema } from '../textSchema';

/** echart图表标题配置 */
export const echartTitleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '标题',
    switch: true,
  },
  properties: {
    position: {
      type: 'string',
      title: '位置',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: echartsLablePositions,
      default: 'top',
    },
    distance: {
      type: 'number',
      title: '距离图形距离',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      default: 8,
    },
    rotate: {
      type: 'number',
      title: '旋转角度',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: '度',
        min: 0,
      },
      default: 0,
    },
    textStyle: textSchema,
  },
};
