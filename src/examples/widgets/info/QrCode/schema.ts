import { ISchema } from '@formily/react';

export const QrCodeSchema: ISchema = {
  type: 'object',
  properties: {
    errorCorrectionLevel: {
      type: 'string',
      title: '纠错级别',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '若在二维码中间放置图片等信息，需设置为纠错级别为高才能正确识别到二维码。',
        tooltipLayout: 'text',
      },
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
        buttonStyle: 'solid',
      },
      enum: [
        { value: 'low', label: '低' },
        { value: 'medium', label: '中' },
        // { value: 'quartile', label: '四分位' },
        { value: 'high', label: '高' },
      ],
      default: 'medium',
    },
    margin: {
      type: 'string',
      title: '二维码边距',
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        precision: 0,
        step: 1,
        min: 0,
        max: 100,
      },
      default: 2,
    },
    color: {
      type: 'object',
      properties: {
        dark: {
          type: 'string',
          title: '深色块颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#000000',
        },
        light: {
          type: 'string',
          title: '浅色块颜色',
          'x-decorator': 'FormItem',
          'x-component': 'ColorPicker',
          default: '#ffffff',
        },
      },
    },
  },
};
