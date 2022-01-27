import { ISchema } from '@formily/react';
import { axisLabelSchema } from './axisLabelSchema';
import { axisLineSchema } from './axisLineSchema';
import { axisTickSchema } from './axisTickSchema';
import { nameTextStyleSchema } from './nameTextStyleSchema';
import { splitLineSchema } from './splitLineSchema';

/** x轴配置 */
export const xAxisSchema = (defaultValue: { [key: string]: any }): ISchema => ({
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: 'X轴',
    switch: true,
    defaultSwitch: true,
    // noPadding: true,
  },
  default: defaultValue,
  properties: {
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
    nameTextStyle: nameTextStyleSchema(false, 'X轴'),
    axisLine: axisLineSchema,
    axisTick: axisTickSchema,
    axisLabel: axisLabelSchema,
    splitLine: splitLineSchema(),
  },
});
