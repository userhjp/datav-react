import { fontFamilys, fontStyles, fontWeights, hAligns, justifyContents, lineStyles, writingModes } from '../../../../shared';
import { WidgetConfig } from '@/datav/react/interface';

const config: WidgetConfig = {
  w: 300,
  h: 200,
  fields: {
    content: '段落内容',
    url: '超链接地址',
  },
  data: {
    content:
      'DataV 提供运营动态直播、数据综合展示、设备监控预警等多种场景模板，稍加修改就能够直接服务于您的可视化需求。通过拖拽即可实现灵活的可视化布局，在模板的基础上任何人都能够发挥创意，实现您自己的可视化应用。支持阿里云分析数据库、关系型数据库、Restful API、CSV、静态JSON等多种数据来源，且能够动态轮询。能够实现多个数据源汇聚于一个可视化界面中',
    url: '',
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
      scroll: {
        type: 'object',
        'x-component': 'MyFormCollapse',
        'x-component-props': {
          title: '文本滚动',
        },
        properties: {
          overflowScroll: {
            type: 'boolean',
            title: '溢出滚动',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: true,
          },
          duration: {
            type: 'number',
            title: '滚动持续时间',
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              placeholder: '请输入',
              unit: 'ms',
              min: 1000,
            },
            default: 5000,
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
              unit: 'ms',
              min: 0,
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
      link: {
        type: 'object',
        'x-component': 'MyFormCollapse',
        'x-component-props': {
          title: '超链接配置',
          switch: true,
        },
        properties: {
          href: {
            type: 'string',
            title: '链接地址',
            'x-decorator': 'FormItem',
            'x-decorator-props': {
              tooltip: '点击标题文本区域跳转超链接地址',
              tooltipLayout: 'text',
            },
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入',
            },
            default: '',
          },
          isblank: {
            type: 'boolean',
            title: '是否新开窗口',
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            default: true,
          },
        },
      },
      textAlign: {
        type: 'string',
        title: '对齐方式',
        'x-decorator': 'FormItem',
        'x-component': 'Select',
        enum: hAligns,
        default: 'left',
      },
      lineHeight: {
        type: 'string',
        title: '行高',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          unit: 'px',
          min: 0,
        },
        default: 22,
      },
      letterSpacing: {
        type: 'string',
        title: '文字间隔',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          unit: 'px',
          min: 0,
        },
        default: 0,
      },
      textIndent: {
        type: 'string',
        title: '首行缩进',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
        'x-component-props': {
          unit: 'px',
          min: 0,
        },
        default: 32,
      },
    },
  },
};

export default config;
