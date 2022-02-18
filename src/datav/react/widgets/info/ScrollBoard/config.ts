import { hAligns } from '@/datav/shared';
import { WidgetConfig } from '@/datav/react/interface';

const Config: WidgetConfig = {
  w: 320,
  h: 200,
  attr: {
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
          unit: 'ms',
          min: 1,
        },
        default: 5,
      },
      oddRowBGC: {
        type: 'string',
        title: '奇数行背景',
        'x-decorator': 'FormItem',
        'x-component': 'ColorPicker',
        default: '#0a2732',
      },
      evenRowBGC: {
        type: 'string',
        title: '偶数行背景',
        'x-decorator': 'FormItem',
        'x-component': 'ColorPicker',
        default: '#003b51',
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
            default: 35,
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
          },
        },
      },
    },
  },
  data: {
    list: [
      { key1: '行1列1', key2: '行1列2', key3: '行1列3', key4: '行1列4', key5: '行1列5' },
      { key1: '行2列1', key2: '行2列2', key3: '行2列3', key4: '行2列4', key5: '行1列5' },
      { key1: '行3列1', key2: '行3列2', key3: '行3列3', key4: '行3列4', key5: '行1列5' },
      { key1: '行4列1', key2: '行4列2', key3: '行4列3', key4: '行4列4', key5: '行1列5' },
      { key1: '行5列1', key2: '行5列2', key3: '行5列3', key4: '行5列4', key5: '行1列5' },
      { key1: '行6列1', key2: '行6列2', key3: '行6列3', key4: '行6列4', key5: '行1列5' },
    ],
  },
  fields: {
    list: '数据列表',
  },
};

export default Config;
