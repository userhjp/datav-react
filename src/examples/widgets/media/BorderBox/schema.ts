import { ISchema } from '@formily/react';
import { presetImages } from './data';

export const BorderBoxSchema: ISchema = {
  type: 'object',
  properties: {
    borderImg: {
      type: 'string',
      title: '边框样式',
      'x-decorator': 'FormItem',
      'x-component': 'ImageSelect',
      enum: presetImages,
      default: 'box1',
    },
    // config: {
    //   type: 'object',
    //   title: '边框配置',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'FormGrid',
    //   'x-component-props': {
    //     minColumns: 2,
    //     rowGap: 0,
    //   },
    //   properties: {
    //     slice: {
    //       type: 'string',
    //       'x-decorator-props': {
    //         feedbackText: '切片',
    //       },
    //       'x-decorator': 'FormItem',
    //       'x-component': 'Input',
    //       default: '32 40 fill',
    //     },
    //     width: {
    //       type: 'string',
    //       'x-decorator-props': {
    //         feedbackText: '宽度',
    //       },
    //       'x-decorator': 'FormItem',
    //       'x-component': 'Input',
    //       default: '32px 37px',
    //     },
    //     outset: {
    //       type: 'string',
    //       'x-decorator-props': {
    //         feedbackText: '外扩',
    //       },
    //       'x-decorator': 'FormItem',
    //       'x-component': 'NumberPicker',
    //       default: 0,
    //     },
    //     repeat: {
    //       type: 'string',
    //       'x-decorator-props': {
    //         feedbackText: '平铺类型',
    //       },
    //       'x-decorator': 'FormItem',
    //       'x-component': 'Select',
    //       enum: [
    //         { value: 'stretch', label: '不重复，拉伸满' },
    //         { value: 'repeat', label: '水平和垂直重复' },
    //         { value: 'repeat stretch', label: '水平重复' },
    //         { value: 'stretch repeat', label: '垂直重复' },
    //       ],
    //       default: 'repeat',
    //     },
    //   },
    // },
  },
};
