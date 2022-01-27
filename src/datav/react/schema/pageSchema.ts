import { ISchema } from '@formily/react';
import { ZoomMode } from '../../shared';

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
              default: 1920,
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                extra: '宽度',
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
              default: 1080,
              'x-decorator': 'FormItem',
              'x-decorator-props': {
                extra: '高度',
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
          default: '#0e2a42',
          'x-component': 'ColorPicker',
          'x-decorator': 'FormItem',
        },
        backgroundImg: {
          type: 'string',
          title: '背景图',
          // default: 'http://bpic.588ku.com//back_origin_min_pic/21/05/26/2578f41da1e66a5743ad2f4a2e689003.jpg',
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
            prefix: "{{icon('LinkOutlined')}}",
          },
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
          default: 8,
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            style: {
              paddingBottom: 12,
              marginBottom: 8,
              borderBottom: 'solid 1px #333',
            },
          },
          'x-component': 'NumberPicker',
          'x-component-props': {
            placeholder: '栅格间距',
            unit: 'px',
            min: 1,
            max: 20,
          },
        },
        cutCover: {
          type: 'string',
          title: '缩略图',
          'x-component': 'CutCover',
          'x-decorator': 'FormItem',
        },
      },
    },
  },
};