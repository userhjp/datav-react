import { ISchema } from '@formily/react';
import { echartsLablePositions, fontWeights } from '../../shared';

/** 象形图系列公共配置 */
export const barSeriesSymbolSchema = (defaultValue?: { [key: string]: any }): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '柱条样式',
  },
  default: defaultValue,
  properties: {
    symbolRepeat: {
      type: 'boolean',
      title: '重复图形',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: true,
    },
    symbolRotate: {
      type: 'number',
      title: '旋转角度',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        unit: '度',
        min: 0,
      },
      default: 0,
    },
    barCategoryGap: {
      type: 'string',
      title: '同系间距',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
        min: 0,
      },
      default: '20%',
    },
    barGap: {
      type: 'string',
      title: '不同系间距',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
        min: 0,
      },
      default: '30%',
    },
    symbolMargin: {
      type: 'string',
      title: '图形边距',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入',
        min: 0,
      },
      default: '35%',
    },
    symbolSize: {
      type: 'object',
      title: '图形大小',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        width: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '宽度',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: '100%',
        },
        height: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            extra: '高度',
          },
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: '20%',
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
