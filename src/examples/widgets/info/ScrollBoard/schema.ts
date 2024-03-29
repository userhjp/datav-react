import { textSchema } from '@/examples/schema/textSchema';
import { hAligns } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const ScrollBoardSchema: ISchema = {
  type: 'object',
  properties: {
    pageRoll: {
      type: 'boolean',
      title: '整页滚动',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    waitTime: {
      type: 'number',
      title: '轮播时间间隔',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'ms',
        min: 100,
      },
      default: 2000,
    },
    rowNum: {
      type: 'number',
      title: '每页行数',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: '行',
        min: 1,
      },
      default: 5,
    },
    oddRowBGC: {
      type: 'string',
      title: '奇数行背景',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      default: 'rgba(0,0,0,0)',
    },
    evenRowBGC: {
      type: 'string',
      title: '偶数行背景',
      'x-decorator': 'FormItem',
      'x-component': 'ColorPicker',
      default: 'rgba(111,111,159,0.15)',
    },
    textStyle: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '列表样式',
      },
      properties: {
        void: textSchema(),
      },
      default: {
        fontSize: 14,
      },
    },
    indexHeader: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '行号',
        switch: true,
      },
      properties: {
        title: {
          type: 'string',
          title: '标题',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          default: '#',
        },
        columnWidth: {
          type: 'number',
          title: '列宽',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '自适应',
            unit: 'px',
            min: 0,
          },
          default: 40,
        },
        textAlign: {
          type: 'string',
          title: '对齐方式',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: hAligns,
          default: 'left',
        },
        color: {
          type: 'string',
          title: '字体颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#fff',
        },
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#00baff',
        },
      },
    },
    header: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '表头',
        switch: true,
      },
      default: {
        textStyle: {
          fontSize: 14,
        },
      },
      properties: {
        height: {
          type: 'number',
          title: '高度',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'px',
            min: 0,
          },
          default: 36,
        },
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#003b51',
        },
        textStyle: textSchema('object'),
      },
    },
    column: {
      type: 'array',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '数据列',
        listType: 'column',
      },
      default: [
        { title: '数据列1', mapKey: 'key1', textAlign: 'left' },
        { title: '数据列2', mapKey: 'key2', textAlign: 'left' },
        { title: '数据列3', mapKey: 'key3', textAlign: 'left' },
        { title: '数据列4', mapKey: 'key4', textAlign: 'left' },
      ],
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            title: '标题',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            default: '列1',
          },
          mapKey: {
            type: 'string',
            title: '映射字段',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '映射字段',
            },
            default: 'key1',
          },
          textAlign: {
            type: 'string',
            title: '对齐方式',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: hAligns,
            default: 'left',
          },
          type: {
            type: 'string',
            title: '字段类型',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: [
              { value: 'str', label: '字符串' },
              { value: 'dateTime', label: '日期格式' },
            ],
            default: 'str',
          },
          format: {
            type: 'string',
            title: '格式化日期',
            'x-decorator': 'FormItem',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: 'yyy-MM-dd HH:mm:ss',
            },
            'x-reactions': {
              dependencies: ['.type'],
              fulfill: {
                state: {
                  visible: '{{$deps[0] === "dateTime"}}',
                },
              },
            },
            default: 'yyyy-MM-dd HH:mm:ss',
          },
          columnWidth: {
            type: 'number',
            title: '列宽',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              autoValue: 80,
              placeholder: '自适应',
              unit: 'px',
              min: 0,
            },
            default: 'auto',
          },
          formatter: {
            type: 'string',
            title: '格式化文本',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '支持返回HTML格式',
              tooltipLayout: 'text',
            },
            'x-component': 'FunTextArea',
            'x-component-props': {
              funName: '(value)',
            },
            default: 'return value;',
          },
        },
      },
    },
  },
};
