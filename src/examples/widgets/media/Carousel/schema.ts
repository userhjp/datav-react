import { textSchema } from '@/examples/schema/textSchema';
import { ISchema } from '@formily/react';

export const CarouselSchema: ISchema = {
  type: 'object',
  properties: {
    config: {
      type: 'object',
      properties: {
        autoplay: {
          type: 'boolean',
          title: '自动切换',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        autoplaySpeed: {
          type: 'number',
          title: '切换间隔时间',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'ms',
            min: 0,
          },
          default: 3000,
        },
        dots: {
          type: 'boolean',
          title: '显示指示点',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          default: true,
        },
        dotPosition: {
          type: 'string',
          title: '指示点位置',
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
            buttonStyle: 'solid',
          },
          enum: [
            { value: 'top', label: '上' },
            { value: 'bottom', label: '下' },
            { value: 'left', label: '左' },
            { value: 'right', label: '右' },
          ],
          'x-reactions': {
            dependencies: ['.dots'],
            fulfill: {
              state: {
                visible: '{{!!$deps[0]}}',
              },
            },
          },
          default: 'bottom',
        },
        effect: {
          type: 'string',
          title: '动画效果',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          enum: [
            { value: 'scrollx', label: '平滑' },
            { value: 'fade', label: '渐显' },
          ],
          default: 'scrollx',
        },
      },
    },
    style: {
      type: 'object',
      properties: {
        backgroundColor: {
          type: 'string',
          // title: '背景颜色',
          // 'x-decorator': 'FormItem',
          // 'x-component': 'ColorPicker',
          default: 'rgba(0, 0, 0, 0)',
        },
        borderRadius: {
          type: 'number',
          title: '边框圆角',
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
      default: {
        fontSize: 16,
      },
    },
    advancedSetting: {
      type: 'object',
      'x-component': 'MyFormCollapse',
      'x-component-props': {
        title: '高级设置',
      },
      properties: {
        speed: {
          type: 'number',
          title: '切换动画时间',
          'x-decorator': 'FormItem',
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '请输入',
            unit: 'ms',
            min: 0,
          },
          default: 500,
        },
        slidesNum: {
          type: 'void',
          title: '图片数量',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          'x-reactions': {
            dependencies: ['..config.dotPosition'],
            fulfill: {
              state: {
                visible: '{{ $deps[0] !== "left" && $deps[0] !== "right" }}',
              },
            },
          },
          properties: {
            slidesToShow: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '可见数量',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: '',
                min: 1,
              },
              default: 1,
            },
            slidesToScroll: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '每次滚动数量',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: '',
                min: 1,
              },
              default: 1,
            },
          },
        },
        padding: {
          type: 'object',
          title: '图片边距',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            vertical: {
              type: 'number',
              'x-decorator-props': {
                feedbackText: '上下',
              },
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '请输入',
                unit: 'px',
                min: 0,
              },
              default: 0,
            },
            horizontal: {
              type: 'number',
              'x-decorator-props': {
                feedbackText: '左右',
              },
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
    },
  },
};
