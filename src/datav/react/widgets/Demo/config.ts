import { WidgetConfig } from '@/datav/interface';

const Config: WidgetConfig = {
  w: 320,
  h: 200,
  attr: {
    type: 'object',
    properties: {
      opacity: {
        type: 'string',
        title: '其他属性',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: '请输入',
        },
        default: 1,
      },
    },
  },
  fields: {
    x: 'x轴',
    y: 'y轴',
  },
  data: [
    { x: '上海', y: 23 },
    { x: '深圳', y: 13 },
    { x: '合肥', y: 2 },
    { x: '成都', y: 9 },
    { x: '安徽', y: 5 },
    { x: '北京', y: 10 },
    { x: '杭州', y: 14 },
    { x: '长沙', y: 24 },
  ],
};

export default Config;
