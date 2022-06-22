import { ISchema } from '@formily/react';
import { hAligns } from '../../shared';
import { textSchema } from '../textSchema';

/** 坐标轴标签 */
export const axisLabelSchema: ISchema = {
  type: 'object',
  'x-component': 'MyFormCollapse',
  'x-component-props': {
    title: '轴标签',
    switch: true,
    defaultSwitch: true,
  },
  default: {},
  properties: {
    void: {
      type: 'void',
      properties: {
        interval: {
          type: 'string',
          title: '间隔',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip:
              '默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签,1 表示『隔一个标签显示一个标签』，如果值为 2 表示隔两个标签显示一个标签，以此类推。',
            tooltipLayout: 'text',
          },
          'x-component': 'Select',
          enum: [
            { label: '自适应', value: 'auto' },
            { label: '0', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
          ],
          default: 'auto',
        },
        displayMode: {
          type: 'void',
          title: '展示方式',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            rotate: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '旋转',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: '度',
                min: 0,
              },
              default: 0,
            },
            margin: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '偏移',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 12,
            },
          },
        },
        align: {
          type: 'string',
          title: '对齐方式',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: hAligns,
          default: 'center',
        },
        voidTextStyle: textSchema(),
        formatter: {
          type: 'string',
          title: '格式化文本',
          'x-decorator': 'FormItem',
          'x-component': 'FunTextArea',
          'x-component-props': {
            funName: '(value, index)',
          },
          default: 'return value;',
        },
      },
    },
  },
};
