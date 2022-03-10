import { ISchema } from '@formily/react';
import { areaStyleSchema } from './areaStyleSchema';
import { labelSchema } from './labelSchema';
import { symbolStyleSchema } from './symbolStyleSchema';

/** 雷达图系列公共配置 */
export const radarSeriesStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '系列样式',
    noPadding: true,
  },
  properties: {
    label: labelSchema,
    symbolVoid: symbolStyleSchema,
    areaStyle: areaStyleSchema(true),
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
