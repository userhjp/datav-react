import { fontFamilys, fontStyles, fontWeights, hAligns, justifyContents, lineStyles } from '../../../../shared';
import { WidgetConfig } from '@/datav/interface';

const config: WidgetConfig = {
  w: 300,
  h: 56,
  fields: {
    content: '段落内容',
    url: '超链接地址',
  },
  data: {
    value: 'DataV 提供运营动态直播、数据综合展示、设备监控预警等多种场景模板，稍加修改就能够直接服务于您的可视化需求。',
  },
  attr: {
    type: 'object',
    properties: {
      textStyle: {
        type: 'void',
        'x-component': 'MyFormCollapse',
        'x-component-props': {
          title: '文本样式',
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
          fontSize: {
            type: 'number',
            title: '字号',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入',
              unit: 'px',
              min: 12,
            },
            default: 16,
          },
          fontWeight: {
            type: 'string',
            title: '字体粗细',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: fontWeights,
            default: 'normal',
          },
          color: {
            type: 'string',
            title: '字体颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            enum: fontWeights,
            default: '#fff',
          },
          fontStyle: {
            type: 'string',
            title: '字体样式',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: fontStyles,
            default: 'normal',
          },
        },
      },
      backgroundStyle: {
        type: 'object',
        'x-component': 'MyFormCollapse',
        'x-component-props': {
          title: '背景样式',
          switch: true,
        },
        properties: {
          backgroundColor: {
            type: 'string',
            title: '背景颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            default: '#008bff',
          },
          borderRadius: {
            type: 'number',
            title: '圆角',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入',
              unit: 'px',
              min: 1,
            },
            default: 0,
          },
          borderColor: {
            type: 'string',
            title: '边框颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            default: '#fff',
          },
          borderStyle: {
            type: 'string',
            title: '边框类型',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            enum: lineStyles,
            default: 'solid',
          },
          borderWidth: {
            type: 'number',
            title: '边框粗细',
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
      loop: {
        type: 'boolean',
        title: '是否轮播',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        default: true,
      },
      ifSpeed: {
        type: 'boolean',
        title: '定速播放',
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
        default: false,
      },
      duration: {
        type: 'number',
        title: '动画时间',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          placeholder: '请输入',
          unit: 'ms',
          min: 1000,
        },
        'x-reactions': {
          dependencies: ['.ifSpeed'],
          fulfill: {
            state: {
              visible: '{{!$deps[0]}}',
            },
          },
        },
        default: 8000,
      },
      speed: {
        type: 'number',
        title: '动画间隔',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          placeholder: '请输入',
          unit: 'ms',
          min: 100,
        },
        'x-reactions': {
          dependencies: ['.ifSpeed'],
          fulfill: {
            state: {
              visible: '{{!!$deps[0]}}',
            },
          },
        },
        default: 1000,
      },
      timeout: {
        type: 'number',
        title: '每次停顿',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          placeholder: '请输入',
          unit: 'ms',
          min: 100,
        },
        default: 1000,
      },
    },
  },
};

export default config;
