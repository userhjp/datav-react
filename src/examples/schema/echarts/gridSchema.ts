import { ISchema } from '@formily/react';
import { colorsSchema } from './colorsSchema';

/** 网格基础配置 */
export const echartGridSchema: ISchema = {
  type: 'void',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '图表网格',
    noPadding: true,
  },
  properties: {
    // gridVoid: {
    //   type: 'void',
    //   'x-component': 'MyFormCollapse',
    //   'x-component-props': {
    //     title: '网格样式',
    //     switch: true,
    //   },
    //   properties: {
    //     backgroundColor: {
    //       type: 'string',
    //       title: '网格背景色',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'ColorPicker',
    //       default: 'rgba(0,0,0,0.2)',
    //     },
    //     borderColor: {
    //       type: 'string',
    //       title: '边框颜色',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'ColorPicker',
    //       default: 'rgba(0,0,0,0.2)',
    //     },
    //     borderWidth: {
    //       type: 'number',
    //       title: '网格线宽',
    //       'x-decorator': 'FormItem',
    //       'x-component': 'NumberPicker',
    //       'x-component-props': {
    //         placeholder: '请输入',
    //         unit: 'px',
    //         min: 0,
    //       },
    //       default: 1,
    //     },
    //   },
    // },
    grid: {
      type: 'object',
      title: '网格边距',
      'x-decorator': 'FormItem',
      'x-component': 'PaddingArr',
      default: { left: 40, right: 40, top: 40, bottom: 40 },
    },
  },
};
