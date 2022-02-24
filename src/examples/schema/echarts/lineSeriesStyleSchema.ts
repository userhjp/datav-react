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
      'x-component': 'USlider',
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
                extra: '大小',
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
                extra: '旋转角度',
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
                extra: 'X偏移',
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
                extra: 'Y偏移',
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
    // backgroundStyle: {
    //   type: 'object',
    //   'x-component': 'MyFormCollapse',
    //   'x-component-props': {
    //     title: '柱条背景',
    //     switch: true,
    //     // defaultSwitch: true,
    //   },
    //   properties: {
    //     color: {
    //       type: 'string',
    //       title: '背景颜色',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'ColorPicker',
    //       default: 'rgba(180, 180, 180, 0.2)',
    //     },
    //     borderColor: {
    //       type: 'string',
    //       title: '描边颜色',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'ColorPicker',
    //       default: '#000',
    //     },
    //     borderWidth: {
    //       type: 'number',
    //       title: '描边宽度',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'NumberPicker',
    //       'x-component-props': {
    //         placeholder: '请输入',
    //         unit: 'px',
    //         min: 0,
    //       },
    //       default: 0,
    //     },
    //     borderRadius: {
    //       type: 'number',
    //       title: '背景圆角',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'NumberPicker',
    //       'x-component-props': {
    //         placeholder: '请输入',
    //         unit: 'px',
    //         min: 0,
    //       },
    //       default: 0,
    //     },
    //   },
    // },
  },
};
