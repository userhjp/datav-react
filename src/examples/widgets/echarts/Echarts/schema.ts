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
        fnName: 'getOptions(data,extend)',
        extraLib: `
          declare var extend: {
            chart: object;
            echarts: echarts;
            DataSet: object;
            formatDate: (dateTime: Date | number, fmt: string) => string;
            update: (object) => void;
            watch: (key: string| string[], callback: (object) => void);
            variables: object;
            formatNumber: (num: number, decimal = 0) => string;
          }
        `,
        helpCode: `
/**
 * @param data 图表组件数据
 * @param extend 扩展对象
 * @returns object
 */
function getOptions(data, extend) {
  const {
    myChart, echarts,
    formatDate, formatNumber,
    update, watch, variables
   } = extend;

  // 当前Echart图表实例（参考Echarts）
  myChart;

  // Echarts库对象（参考Echarts）
  echarts;

  // 重要，可通过监听和更新全局变量，以全局变量作为组件间通讯的桥梁
  watch('type', (item) => {
    // 当全局变量'type'值变化后重复执行
    console.log(item); // --> { type: 1 }
  });
  watch(['type', 'type2'], (item) => {
    // 当全局变量'type' 或 'type2'值变化后重复执行
    console.log(item); --> // { type: 1, type2: 2 }
  });
  //更新全局变量
  update({ type: 2 })
  variables; // 当前存在的的全局变量对象

  // 日期格式化
  const dateStr = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
  console.log(dateStr); // --> 2022-07-07 11:47:23


  // 千分位格式化 默认不保留小数四舍五入
  const num = formatNumber(123456.78, 2);
  console.log(num); // --> 123,456.78

  // 返回Echarts配置对象
  return {};
}
        `,
      },
      default: `
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
