import { fillTypes, lineStyles } from '../../../shared';
import { ISchema } from '@formily/react';

const colorsSchema = (title: string) => {
  return {
    type: 'array',
    'x-component': 'ArrayItems',
    'x-decorator': 'FormItem',
    title,
    items: {
      type: 'void',
      'x-component': 'Space',
      properties: {
        sort: {
          type: 'void',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayItems.SortHandle',
        },
        input: {
          type: 'string',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
        },
        remove: {
          type: 'void',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayItems.Remove',
        },
      },
    },
    properties: {
      add: {
        type: 'void',
        title: '添加颜色',
        'x-component': 'ArrayItems.Addition',
        'x-component-props': {
          defaultValue: '#1179ff',
        },
      },
    },
  };
};

export const BgBoxSchema: ISchema = {
  type: 'object',
  properties: {
    filter: {
      type: 'number',
      title: '模糊',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        placeholder: '请输入',
        unit: 'px',
        min: 0,
      },
      default: 0,
    },
    bgStyle: {
      type: 'object',
      default: {
        colors: ['#1890ff', '#50e3c2'],
      },
      properties: {
        bgType: {
          type: 'string',
          title: '背景填充',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
            buttonStyle: 'solid',
          },
          enum: [
            { label: '纯色', value: 'base' },
            { label: '水平', value: 'gradientHorizontal' },
            { label: '垂直', value: 'gradientVertical' },
          ],
          default: 'base',
        },
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-decorator': 'FormItem',
          'x-reactions': {
            dependencies: ['.bgType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "base"}}',
              },
            },
          },
          'x-component': 'ColorPicker',
          default: 'rgba(225, 225, 225, 0.06)',
        },
        void: {
          type: 'void',
          'x-reactions': {
            dependencies: ['.bgType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] !== "base"}}',
              },
            },
          },
          properties: {
            colors: colorsSchema('渐变颜色'),
          },
        },
      },
    },
    borderStyle: {
      type: 'object',
      properties: {
        borderType: {
          type: 'string',
          title: '边框类型',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            style: {
              paddingTop: 10,
              marginTop: 18,
              borderTop: 'solid 1px #333',
            },
          },
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
            buttonStyle: 'solid',
          },
          enum: [
            { label: '纯色', value: 'base' },
            { label: '渐变', value: 'gradient' },
            { label: '图片', value: 'image' },
          ],
          default: 'base',
        },
        borderBaseStyle: {
          type: 'object',
          'x-reactions': {
            dependencies: ['.borderType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "base"}}',
              },
            },
          },
          properties: {
            void1: {
              type: 'void',
              title: '边框配置',
              'x-decorator': 'FormItem',
              'x-component': 'FormGrid',
              'x-component-props': {
                minColumns: 2,
                rowGap: 0,
              },
              properties: {
                borderColor: {
                  type: 'string',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '边框颜色',
                    gridSpan: 2,
                  },
                  'x-component': 'ColorPicker',
                  default: '#1890ff',
                },
                borderStyle: {
                  type: 'string',
                  'x-decorator-props': {
                    feedbackText: '边框类型',
                  },
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  enum: lineStyles,
                  default: 'solid',
                },
                borderWidth: {
                  type: 'number',
                  'x-decorator-props': {
                    feedbackText: '边框宽度',
                  },
                  'x-decorator': 'FormItem',
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    unit: 'px',
                    min: 1,
                  },
                  default: 1,
                },
              },
            },
            void2: {
              type: 'void',
              title: '圆角',
              'x-decorator': 'FormItem',
              'x-component': 'FormGrid',
              'x-component-props': {
                minColumns: 2,
                rowGap: 0,
              },
              properties: {
                left: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '左',
                  },
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: '请输入',
                    unit: 'px',
                    min: 0,
                  },
                  default: 40,
                },
                right: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '右',
                  },
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: '请输入',
                    unit: 'px',
                    min: 0,
                  },
                  default: 40,
                },
                top: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '上',
                  },
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: '请输入',
                    unit: 'px',
                    min: 0,
                  },
                  default: 40,
                },
                bottom: {
                  type: 'number',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    feedbackText: '下',
                  },
                  'x-component': 'NumberPicker',
                  'x-component-props': {
                    placeholder: '请输入',
                    unit: 'px',
                    min: 0,
                  },
                  default: 40,
                },
              },
            },
          },
        },
        borderGradientStyle: {
          type: 'object',
          'x-reactions': {
            dependencies: ['.borderType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "gradient"}}',
              },
            },
          },
          properties: {
            gradientborderWidth: {
              type: 'number',
              title: '边框宽度',
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                unit: 'px',
                min: 1,
              },
              default: 2,
            },
            colors: colorsSchema('边框颜色'),
          },
        },
        imageBorder: {
          type: 'object',
          'x-reactions': {
            dependencies: ['.borderType'],
            fulfill: {
              state: {
                visible: '{{$deps[0] === "image"}}',
              },
            },
          },
          properties: {
            borderImg: {
              type: 'string',
              title: '边框图片',
              'x-component': 'BgImg',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                style: {
                  paddingBottom: 12,
                  marginBottom: 8,
                  borderBottom: 'solid 1px #333',
                },
              },
              'x-component-props': {
                placeholder: '输入图片地址',
                prefix: "{{icon('Link')}}",
              },
              default: 'https://datav.oss-cn-hangzhou.aliyuncs.com/uploads/images/a7c93134c5e1440c58b1a7a3b675009b.png',
            },
          },
        },
      },
    },
  },
};
