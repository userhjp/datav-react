import { ISchema } from '@formily/react';
import { echartsLablePositions, fontWeights } from '../../shared';

/** 柱状图柱条系列公共配置 */
export const barSeriesStyleSchema = (defaultValue?: { [key: string]: any }): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '柱条样式',
  },
  default: defaultValue,
  properties: {
    barWidth: {
      type: 'number',
      title: '柱条宽度',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        autoValue: 18,
        placeholder: '自适应',
        unit: 'px',
        min: 0,
      },
      default: 'auto',
    },
    barCategoryGap: {
      type: 'number',
      title: '同系柱条间距',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: '%',
        min: 0,
      },
      default: 0,
    },
    borderRadius: {
      type: 'object',
      title: '柱条圆角',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        leftTop: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '左上',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        rightTop: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '右上',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        leftbottom: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '左下',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        rightbottom: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '右下',
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
    label: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '柱条标签',
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
                extra: '字号',
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
                extra: '字体粗细',
              },
              'x-component': 'Select',
              enum: fontWeights,
              default: 'normal',
            },
            color: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                extra: '字体颜色',
                gridSpan: 2,
              },
              'x-component': 'ColorPicker',
              default: '#e6e9ed',
            },
          },
        },
      },
    },
    backgroundStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '柱条背景',
        switch: true,
        // defaultSwitch: true,
      },
      properties: {
        color: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: 'rgba(180, 180, 180, 0.2)',
        },
        borderColor: {
          type: 'string',
          title: '描边颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#000',
        },
        borderWidth: {
          type: 'number',
          title: '描边宽度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 0,
        },
        borderRadius: {
          type: 'number',
          title: '背景圆角',
          'x-decorator': 'FormItem',
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
});
