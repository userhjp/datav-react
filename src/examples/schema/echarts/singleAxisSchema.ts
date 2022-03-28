import { ISchema } from '@formily/react';
import { colorsSchema } from './colorsSchema';

/** 单轴配置（散点图） */
export const singleAxisSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '单轴配置',
    noPadding: true,
  },
  properties: {
    distance: {
      type: 'void',
      title: '容器距离',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        left: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '左',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 60,
        },
        right: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '右',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 30,
        },
        top: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '上',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 30,
        },
        bottom: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '下',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 30,
        },
      },
    },
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
    colors: colorsSchema,
  },
};
