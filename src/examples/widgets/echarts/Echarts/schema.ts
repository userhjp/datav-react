import { ISchema } from '@formily/react';

export const EChartsSchema: ISchema = {
  type: 'object',
  properties: {
    options: {
      type: 'number',
      title: '图表配置',
      'x-component': 'MonacoEditor',
      'x-component-props': {
        language: 'javascript',
        readOnly: false,
        autoFormat: true,
        height: 400,
        fullScreenTitle: 'Echarts配置',
        className: 'filter-editor',
        fnName: 'getOptions(data, extend)',
      },
      default: `// extend.myChart 当前图表实例。
// extend.echarts echarts实例对象。
// extend.formatDate 日期格式化 formatDate('','yyyy-MM-dd HH:mm:ss')。
const { myChart, echarts, formatDate } = extend;
const echartData = (data || []).map(m => {
  m.value = m.value;
  return m;
})
let title = '';
let title2 = '';
let color = ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'];

let formatNumber = function (num) {
  let reg = /(?=(B)(d{3})+$)/g;
  return Number(num).toString().replace(reg, ',');
};
let total = echartData.reduce((a, b) => {
  return a + b.value * 1;
}, 0);

option = {
  color: color,
  grid: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  // tooltip: {
  //     trigger: 'item'
  // },
  title: [
    {
      text: '{name|' + title + '}\\n{val|' + title2 + '}',
      top: 'center',
      left: 'center',
      textStyle: {
        rich: {
          name: {
            fontSize: 14,
            fontWeight: 'normal',
            padding: [4, 0],
          },
          val: {
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
      },
    },
  ],
  series: [
    {
      type: 'pie',
      radius: [20, 60],
      center: ['50%', '50%'],
      data: echartData,
      hoverAnimation: false,
      itemStyle: { borderColor: '#fff', borderWidth: 1 },
      labelLine: {
        length: 15,
        length2: 0,
        maxSurfaceAngle: 80
      },
      label: {
        alignTo: 'edge',
        formatter: (params) => {
          return '{name|' + params.name + ' }' + '{value|' + formatNumber(params.value) + '}' + '\\n' + '{value|' + params.percent + '%}';
        },
        rich: {
          name: {
            fontSize: 12,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            color: '#fff',
          },
          value: {
            fontSize: 10,
            fontFamily: 'PingFangSC-Regular, PingFang SC',
            color: '#28d0fc',
          },
        },
        minMargin: 5,
        edgeDistance: 10,
        lineHeight: 15,
      },
    },
  ],
};
return option;
`,
    },
  },
};
