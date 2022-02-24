import { ISchema } from '@formily/react';

/** 折线系列配置 */
export const lineSeriesSchema: ISchema = {
  type: 'object',
  properties: {
    type: {
      default: 'line',
    },
    // type: {
    //   type: 'string',
    //   title: '填充类型',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   enum: [
    //     { label: '折线', value: 'line' },
    //     { label: '柱状', value: 'bar' },
    //   ],
    //   default: 'bar',
    // },
    itemStyle: {
      type: 'object',
      'x-component-props': {
        minColumns: 2,
        rowGap: 0,
      },
      properties: {
        colorType: {
          type: 'string',
          title: '填充类型',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          enum: [
            { label: '实体填充', value: '1' },
            { label: '渐变填充', value: '2' },
          ],
          default: '1',
        },
        color: {
          type: 'string',
          title: '填充颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          'x-component-props': {
            placeholder: '自动',
          },
          'x-reactions': {
            dependencies: ['.colorType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "1"}}',
              },
            },
          },
        },
        startColor: {
          type: 'string',
          title: '开始颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          'x-reactions': {
            dependencies: ['.colorType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "2"}}',
              },
            },
          },
          default: '#75d6ff',
        },
        toColor: {
          type: 'string',
          title: '结束颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          'x-reactions': {
            dependencies: ['.colorType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "2"}}',
              },
            },
          },
          default: '#1179ff',
        },
      },
    },
  },
};
