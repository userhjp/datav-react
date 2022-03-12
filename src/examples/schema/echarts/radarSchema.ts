import { ISchema } from '@formily/react';
import { textSchema } from '../textSchema';
import { areaStyleSchema } from './areaStyleSchema';
import { lineStyleSchema } from './lineStyleSchema';

/** 雷达图坐标系 */
export const radarSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '雷达图配置',
  },
  default: {
    center: ['50%', '50%'], // 雷达图居中
    radius: '80%',
    startAngle: 120, // 坐标轴起始角度
    axisName: {
      color: '#05D5FF',
      fontSize: 14,
    },
  },
  properties: {
    voiditem: {
      type: 'void',
      title: '分隔线样式',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        axisNameGap: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '标题距离',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 15,
        },
        splitNumber: {
          type: 'number',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '轴分割段数',
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            min: 0,
          },
          default: 5,
        },
      },
    },
    shape: {
      title: '绘制类型',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        { value: 'polygon', label: '多边形' },
        { value: 'circle', label: '圆形' },
      ],
      default: 'polygon',
    },
    // scale: {
    //   type: 'boolean',
    //   title: '脱离0值比例',
    //   'x-decorator': 'FormItem',
    //   'x-decorator-props': {
    //     tooltip: '开启后坐标刻度不会强制包含零刻度，在双数值轴的散点图中比较有用。',
    //     tooltipLayout: 'text',
    //   },
    //   'x-component': 'Switch',
    //   default: false,
    // },
    axisName: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '标题',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        voidTextStyle: textSchema(),
      },
    },
    axisLine: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '轴线',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        lineStyle: lineStyleSchema,
      },
    },
    splitLine: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '网格线',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        lineStyle: lineStyleSchema,
      },
    },
    splitArea: {
      type: 'object',
      default: {
        areaStyle: {
          opacity: 0,
        },
      },
      properties: {
        areaStyle: areaStyleSchema(true),
      },
    },
  },
};
