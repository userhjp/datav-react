import { ISchema } from '@formily/react';
import { ZoomMode } from '../../../shared';

export const pageSchema: ISchema = {
  type: 'object',
  properties: {
    page: {
      type: 'void',
      'x-component': 'FormTitle',
      'x-component-props': {
        label: '页面设置',
      },
      // 'x-display': 'hidden',
      properties: {
        pageSize: {
          type: 'void',
          title: '屏幕大小',
          'x-decorator': 'FormItem',
          'x-component': 'FormGrid',
          'x-component-props': {
            minColumns: 2,
            rowGap: 0,
          },
          properties: {
            width: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '宽度',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '宽度',
                size: 'small',
                min: 0,
                max: 3840,
              },
            },
            height: {
              type: 'number',
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                feedbackText: '高度',
              },
              'x-component': 'NumberPicker',
              'x-component-props': {
                placeholder: '高度',
                min: 0,
                max: 2160,
              },
            },
          },
        },
        backgroundColor: {
          type: 'string',
          title: '背景颜色',
          'x-component': 'ColorPicker',
          'x-decorator': 'FormItem',
        },
        backgroundImg: {
          type: 'string',
          title: '背景图',
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
        },
        config: {
          type: 'void',
          title: '全局配置',
          'x-component': 'GlobalConfig',
          'x-decorator': 'FormItem',
        },
        zoomMode: {
          type: 'number',
          title: '页面缩放方式',
          default: ZoomMode.auto,
          'x-decorator': 'FormItem',
          'x-component': 'ZoomMode',
        },
        grid: {
          type: 'number',
          title: '栅格间距',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            style: {
              paddingBottom: 12,
              marginBottom: 8,
              borderBottom: 'solid 1px #333',
            },
            tooltip: '画布组件拖拽时每次移动栅格',
            tooltipLayout: 'text',
          },
          'x-component': 'Slider',
          'x-component-props': {
            precision: 0,
            step: 1,
            min: 1,
            max: 20,
          },
        },
        cutCover: {
          type: 'string',
          title: '缩略图',
          'x-component': 'CutCover',
          'x-component-props': {
            uploadAction: '/datav/uploadCover?sig=appcode_test0000',
          },
          'x-decorator': 'FormItem',
        },
      },
    },
  },
};
