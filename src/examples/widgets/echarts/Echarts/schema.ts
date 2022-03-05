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
        fullScreenTitle: '数据响应结果',
        className: 'filter-editor',
        fnName: 'getOptions(data)',
      },
      default: `
const option = {
  "grid": {
    "show": false,
    "colors": 1,
    "left": 50,
    "right": 40,
    "top": 50,
    "bottom": 50
  },
  "xAxis": {
      "boundaryGap": true,
      "show": true,
      "type": "category",
      "nameTextStyle": {
          "show": false
      },
      "axisLine": {
          "show": true,
          "lineStyle": {
              "type": "solid",
              "width": 1,
              "color": "rgba(255, 255, 255, 0.5)"
          }
      },
      "axisTick": {
          "show": true,
          "length": 5,
          "lineStyle": {
              "type": "solid",
              "width": 1,
              "color": "rgba(233, 228, 228, 0.1)"
          }
      },
      "axisLabel": {
          "show": true,
          "interval": "auto",
          "rotate": 0,
          "margin": 8,
          "align": "center",
          "fontSize": 12,
          "fontWeight": "normal",
          "color": "#e6e9ed"
      },
  },
  "yAxis": {
      "show": true,
      "splitNumber": 5,
      "min": null,
      "max": null,
      "nameTextStyle": {
          "show": false
      },
      "axisLine": {
          "show": true,
          "lineStyle": {
              "type": "solid",
              "width": 1,
              "color": "rgba(255, 255, 255, 0.5)"
          }
      },
      "axisTick": {
          "show": true,
          "length": 5,
          "lineStyle": {
              "type": "solid",
              "width": 1,
              "color": "rgba(233, 228, 228, 0.1)"
          }
      },
      "axisLabel": {
          "show": true,
          "interval": "auto",
          "rotate": 0,
          "margin": 8,
          "align": "center",
          "fontSize": 12,
          "fontWeight": "normal",
          "color": "#e6e9ed"
      },
      "splitLine": {
          "show": true,
          "lineStyle": {
              "type": [4,4],
              "width": 1,
              "color": "rgba(233, 228, 228, 0.1)"
          }
      }
  },
  "tooltip": {
      "show": true,
      "textStyle": {
          "fontSize": 14,
          "fontWeight": "normal",
          "color": "#fff"
      },
      "verticalPadding": 5,
      "horizontalPadding": 5,
      "backgroundColor": "rgba(0, 0, 0, 0.65)",
      "axisPointer": {
          "show": true,
          "lineStyle": {
              "type": [4,4],
              "width": 1,
              "color": "#f5dc69"
          },
          "type": "cross",
          "label": {
              "show": false
          },
          "crossStyle": {
              "type": [4,4],
              "width": 1,
              "color": "#f5dc69"
          }
      },
      "padding": [5,5],
      "trigger": "axis",
      "borderWidth": 0
  },
  "animation": true,
  "animationDuration": 1000,
  "animationEasing": "cubicOut",
  "animationDelay": 0,
  "barSeriesStyle": {
      "barWidth": 18,
      "barCategoryGap": 0,
      "borderRadius": {
          "leftTop": 0,
          "rightTop": 0,
          "leftbottom": 0,
          "rightbottom": 0
      },
  },
  "series": [
      {
          "type": "bar",
          "itemStyle": {
              "colorType": "1",
              "borderRadius": 0
          },
          "barWidth": 18,
          "barCategoryGap": "20%"
      }
  ],
  "dataset": data,
  "color": [ "#0a73ff", "#79daff", "#bdfdff", "#57cdff", "#a3f6ff" ]
};
return option;
      `,
    },
  },
};
