import { ISchema } from '@formily/react';
export const G2ChartsSchema: ISchema = {
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
        extraLib: `
          declare var extend: {
            chart: any;
            G2: any;
            DataSet: any;
            formatDate: any;
            updateVariables: any;
            formatNumber: any;
          }
        `,
        height: 400,
        fullScreenTitle: 'G2图表配置',
        fnName: 'getOptions(data,extend)',
        helpCode: `
/**
 * @param data 图表组件数据
 * @param extend 扩展对象
 * @returns void
 */
function getOptions(data, extend) {
  const { chart, G2, DataSet, formatDate, updateVariables, formatNumber } = extend;

  // 当前G2图表实例（参考Antv G2图表）
  chart;

  // G2库对象（参考Antv G2图表）
  G2;

  // antv数据转换处理库 https://g2.antv.vision/zh/docs/manual/dataset/overview
  DataSet;

  // 日期格式化
  const dateStr = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
  console.log(dateStr); // --> 2022-07-07 11:47:23

  // 将对象合并到全局变量
  updateVariables({ test: '1' });

  // 千分位格式化 默认不保留小数四舍五入
  const num = formatNumber(123456.78, 2);
  console.log(num); // --> 123,456.78
}
        `,
      },
      default: `
const { chart, formatDate, G2 } = extend
const G = G2.getEngine("svg")
chart.coordinate("theta", {
  radius: 0.55,
  innerRadius: 0.4,
})

chart.data(data)
chart.legend(false); // 关闭图例
chart.scale("percent", {
  formatter: (val) => {
    val = val * 100 + "%"
    return val
  },
})

chart.tooltip({
  showTitle: false,
  showMarkers: false,
})

chart
  .interval()
  .position("value")
  .color("name")
  .label("name*value", {
    layout: [{ type: "pie-spider" }, { type: "hide-overlap" }],
    offset: 8,
    labelHeight: 38,
    content: (obj, item) => {
      const group = new G.Group({})
      // 了解 shape 的绘制原理：y0 左下起点 y1 右上起点
      const [y0, y1] = item.y || [0, 0]
      const inRight = y0 < y1
      const textAlign = inRight ? "left" : "right"

      const topFontSize = 12
      const bottomFontSize = 14
      group.addShape({
        type: "text",
        attrs: {
          x: 0,
          y: 0,
          text: obj.name,
          fill: "#fff",
          fontSize: topFontSize,
          textAlign,
        },
      })

      group.addShape({
        type: "text",
        attrs: {
          x: 0,
          y: 4,
          text: obj.value,
          textAlign,
          textBaseline: "top",
          fill: "#28d0fc",
          fontWeight: 700,
          fontSize: bottomFontSize,
        },
      })
      if (!inRight) {
        group.translate(group.getBBox().width, 0)
      }
      group.translate(0, topFontSize)
      return group
    },
    labelLine: {
      style: {
        lineWidth: 0.5,
      },
    },
  })
  .adjust("stack")

chart.interaction("element-active")
chart.render()
`,
    },
  },
};
