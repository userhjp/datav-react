import { ISchema } from '@formily/react';
import { axisLabelSchema } from './axisLabelSchema';
import { axisLineSchema } from './axisLineSchema';
import { axisTickSchema } from './axisTickSchema';
import { nameTextStyleSchema } from './nameTextStyleSchema';
import { splitLineSchema } from './splitLineSchema';

/** echarts 坐标轴配置 */
export const axisSchema = (type: 'category' | 'value', title: string): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title,
    switch: true,
    defaultSwitch: true,
  },
  properties: {
    ...AXISTYPE[type],
    nameTextStyle: nameTextStyleSchema,
    axisLine: axisLineSchema,
    axisTick: axisTickSchema,
    axisLabel: axisLabelSchema,
    splitLine: splitLineSchema(true),
  },
});

const AXISTYPE = {
  category: {
    type: {
      type: 'string',
      title: '类型',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      enum: [
        { label: '类目型', value: 'category' },
        { label: '时间型', value: 'time' },
      ],
      default: 'category',
    },
    boundaryGap: {
      type: 'string',
      title: '两测留白',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: true,
    },
  },
  value: {
    type: {
      default: 'value',
    },
    splitNumber: {
      type: 'number',
      title: '标签数量',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '坐标轴的分割段数，注意这个分割段数只是预估值，最后实际显示的段数会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。',
        tooltipLayout: 'text',
      },
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        min: 0,
      },
      'x-hidden': true,
      default: 5,
    },
    minMaxVal: {
      type: 'void',
      title: '显示范围',
      'x-decorator': 'FormItem',
      'x-component': 'FormGrid',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        min: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '最小值',
          },
          'x-component': 'Select',
          'x-component-props': {
            placeholder: '自适应',
          },
          enum: [
            { label: '自适应', value: null },
            { label: '最小值', value: 'dataMin' },
          ],
          default: null,
        },
        max: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            feedbackText: '最大值',
          },
          'x-component': 'Select',
          'x-component-props': {
            placeholder: '自适应',
          },
          enum: [
            { label: '自适应', value: null },
            { label: '最大值', value: 'dataMax' },
          ],
          default: null,
        },
      },
    },
  },
};
