import { ISchema } from '@formily/react';
import { echartsLablePositions, fontWeights } from '../../shared';
import { textSchema } from '../textSchema';

/** 柱状图柱条系列公共配置 */
export const barSeriesStyleSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '柱条样式',
  },
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
            feedbackText: '左上',
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
            feedbackText: '右上',
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
            feedbackText: '左下',
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
            feedbackText: '右下',
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
        textStyle: textSchema,
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
};
