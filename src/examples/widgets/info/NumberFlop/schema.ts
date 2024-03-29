import { textSchema } from '@/examples/schema/textSchema';
import { fontFamilys, hAligns } from '@/examples/shared';
import { ISchema } from '@formily/react';

export const NumberFlopSchema: ISchema = {
  type: 'object',
  properties: {
    global: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '全局',
      },
      properties: {
        fontFamily: {
          type: 'string',
          title: '字体',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: fontFamilys,
          default: 'Microsoft Yahei',
        },
        arrangement: {
          type: 'string',
          title: '排列方式',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: [
            { value: 'top', label: '标题在上' },
            { value: 'left', label: '标题在左' },
            { value: 'bottom', label: '标题在下' },
          ],
          default: 'top',
        },
      },
    },
    titleConfig: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '标题',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        title: {
          type: 'string',
          title: '标题名',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          default: 'Typesomething',
        },
        distance: {
          type: 'string',
          title: '文字间隔',
          'x-decorator': 'FormItem',
          'x-component': 'Slider',
          'x-component-props': {
            precision: 0,
            step: 1,
            min: 0,
            max: 100,
          },
          default: 0,
        },
        textStyle: {
          type: 'object',
          default: {
            color: '#79daff',
          },
          properties: {
            voidTextStyle: textSchema(),
          },
        },
      },
    },
    animation: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '动画',
        switch: true,
        defaultSwitch: true,
      },
      properties: {
        duration: {
          type: 'number',
          title: '动画时长',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'ms',
            min: 0,
            max: 100000,
          },
          default: 1000,
        },
      },
    },
    counter: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '翻牌器',
      },
      properties: {
        fontFamily: {
          type: 'string',
          title: '字体',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: fontFamilys,
          default: 'Microsoft Yahei',
        },
        justifyContent: {
          type: 'string',
          title: '对齐方式',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: hAligns,
          default: 'left',
        },
        prefix: {
          type: 'object',
          'x-component': 'MyFormCollapse',
          maxItems: 8,
          'x-component-props': {
            title: '前缀',
            switch: true,
            defaultSwitch: true,
          },
          default: {
            fontSize: 32,
            fontWeight: 'bolder',
            color: '#006fff',
          },
          properties: {
            content: {
              type: 'string',
              title: '内容',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入',
              },
              default: '￥',
            },
            voidTextStyle: textSchema(),
            marginRight: {
              type: 'number',
              title: '间距',
              default: 0,
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                unit: 'px',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '前',
                size: 'small',
                min: 0,
                max: 100,
              },
            },
          },
        },
        suffix: {
          type: 'object',
          'x-component': 'MyFormCollapse',
          maxItems: 8,
          'x-component-props': {
            title: '后缀',
            switch: true,
            defaultSwitch: false,
          },
          default: {
            fontSize: 30,
            fontWeight: 'bolder',
            color: '#006fff',
          },
          properties: {
            content: {
              type: 'string',
              title: '内容',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入',
              },
              default: '',
            },
            voidTextStyle: textSchema(),
            marginLeft: {
              type: 'number',
              title: '间距',
              default: 0,
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                unit: 'px',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '前',
                size: 'small',
                min: 0,
                max: 100,
              },
            },
          },
        },
      },
    },
    numbers: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      maxItems: 8,
      'x-component-props': {
        title: '数字',
        noPadding: true,
      },
      default: {
        textStyle: {
          fontSize: 36,
          fontWeight: 'bolder',
          color: '#006fff',
        },
      },
      properties: {
        separating: {
          type: 'boolean',
          title: '千位分割符',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: false,
        },
        letterSpacing: {
          type: 'string',
          title: '文字间隔',
          'x-decorator': 'FormItem',
          'x-component': 'Slider',
          'x-component-props': {
            precision: 0,
            step: 1,
            min: 0,
            max: 10,
          },
          default: 0,
        },
        borderRadius: {
          type: 'number',
          title: '背景圆角',
          'x-decorator': 'FormItem',
          'x-component': 'Slider',
          'x-component-props': {
            precision: 0,
            step: 1,
            min: 0,
            max: 100,
          },
          default: 6,
        },
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-component': 'ColorPicker',
          'x-decorator': 'FormItem',
          default: 'rgb(10, 115, 255, 0)',
        },
        decimal: {
          type: 'number',
          title: '小数点位数',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: '位',
            min: 0,
            max: 10,
          },
          default: 2,
        },
        divisor: {
          type: 'number',
          title: '除数',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            min: 0,
            max: 10,
          },
          default: 0,
        },
        textStyle: textSchema('object'),
      },
    },
  },
};
