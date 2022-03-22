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
        fnName: 'getOptions(resData, myChart, echarts)',
      },
      default: `
      const orData = resData;
      const color = ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'];
      const days = ['民用户', '公建户', '改管', '干线', '场站'];
      const mapDats = {
        '民用户': 7,
        '公建户': 8,
        '改管': 9 ,
        '干线': 10,
        '场站': 11,
      }
      const hours = Array.from(new Set(orData.map(m => m.name)));
      const title = [];
      const singleAxis = [];
      const series = [];
      days.forEach(function (day, idx) {
        title.push({
          textBaseline: 'middle',
          top: ((idx + 0.5) * 100) / 6 + '%',
          text: day,
          textStyle: {
            color: '#eee',
            fontWeight: 'normal',
            fontSize: 12,
          },
        });
        singleAxis.push({
          left: 70,
          type: 'category',
          boundaryGap: false,
          data: hours,
          top: (idx * 100) / 6 + 2 + '%',
          height: 100 / 6 - 9 + '%',
          axisLine: {
            show: true,
            color: '#e6e9ed',
            lineStyle: {
              color: 'rgba(255,255,255, 0.2)',
            },
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            show: idx == days.length - 1,
            interval: 0,
            margin: 20,
            color: 'rgba(255,255,255, 0.7)',
          },
        });
        const data = hours.map((m, i) => {
          const val = orData.find(f => f.name === m);
          return [i, val.val];
        });
        
        series.push({
          singleAxisIndex: idx,
          coordinateSystem: 'singleAxis',
          symbolOffset: [0, 8],
          type: 'scatter',
          data: data,
          symbolSize(dataItem) {
            return dataItem[1] * 0.5;
          },
        });
      });
   
      option = {
        color,
        tooltip: {
          position: 'top',
          formatter: (item) => {
            return \`\${item.name}：\${item.value[1]}户\`
          }
        },
        title,
        singleAxis,
        series,
      };
      return option;
      `,
    },
  },
};
