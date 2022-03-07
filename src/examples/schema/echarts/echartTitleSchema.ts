import { ISchema } from '@formily/react';
import { echartsLablePositions, fontWeights } from '../../shared';

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
    textStyle: {
      type: 'void',
      title: '文本样式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        fontSize: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字号',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 8,
          },
          default: 12,
        },
        fontWeight: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字体粗细',
          },
          'x-component': 'Select',
          enum: fontWeights,
          default: 'normal',
        },
        color: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '字体颜色',
            gridSpan: 2,
          },
          'x-component': 'ColorPicker',
          default: '#e6e9ed',
        },
      },
    },
  },
};
