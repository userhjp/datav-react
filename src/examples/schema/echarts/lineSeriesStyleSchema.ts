import { ISchema } from '@formily/react';
import { symbolTyles } from '../../shared';
import { labelSchema } from './labelSchema';

/** 折线系列公共配置 */
export const lineSeriesStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '折线样式',
  },
  properties: {
    smooth: {
      type: 'number',
      title: '平滑曲线',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        style: {
          paddingBottom: 12,
          marginBottom: 8,
          borderBottom: 'solid 1px #333',
        },
      },
      'x-component': 'Slider',
      default: 0,
    },
    symbolVoid: {
      type: 'void',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '折线拐点样式',
        switch: true,
        defaultSwitch: true,
        mapSwitchKey: 'showSymbol',
      },
      properties: {
        symbol: {
          type: 'string',
          title: '形状',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: symbolTyles,
          default: 'circle',
        },
        symbolStyle: {
          type: 'void',
          title: '拐点样式',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            symbolSize: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '大小',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 10,
            },
            symbolRotate: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '旋转角度',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            symbolOffsetX: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: 'X偏移',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            symbolOffsetY: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: 'Y偏移',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
          },
        },
      },
    },
    label: labelSchema,
  },
};
