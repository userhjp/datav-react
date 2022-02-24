import { ISchema } from '@formily/react';

/** 堆叠折线图区域填充样式 */
export const areaStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '区域填充',
    switch: true,
    defaultSwitch: true,
  },
  properties: {
    opacity: {
      type: 'number',
      title: '透明度',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        style: {
          paddingBottom: 12,
          marginBottom: 8,
          borderBottom: 'solid 1px #333',
        },
      },
      'x-component': 'USlider',
      'x-component-props': {
        placeholder: '透明度',
      },
      default: 0.6,
    },
  },
};
