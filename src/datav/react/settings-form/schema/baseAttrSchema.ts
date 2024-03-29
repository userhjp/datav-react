import { ISchema } from '@formily/react';

export const baseAttrSchema: ISchema = {
  type: 'object',
  properties: {
    scale: {
      type: 'void',
      title: '图表尺寸',
      'x-decorator': 'FormItem',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      'x-component': 'FormGrid',
      properties: {
        w: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '宽度',
            min: 0,
          },
        },
        h: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '高度',
            min: 0,
          },
        },
      },
    },
    position: {
      type: 'void',
      title: '图表位置',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        x: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '左侧距离',
          },
        },
        y: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '顶部距离',
          },
        },
      },
    },
    deg: {
      type: 'number',
      title: '旋转角度',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '旋转角度',
        min: 0,
        max: 360,
      },
    },
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
      'x-component': 'Slider',
      'x-component-props': {
        placeholder: '透明度',
      },
    },
  },
};
