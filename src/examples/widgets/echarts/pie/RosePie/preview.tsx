import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent } from 'echarts/components';
import { PieChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convertEChartColors, formJsonToLegendData, getChartColors } from '@/examples/shared';

use([CanvasRenderer, PieChart, GridComponent, TitleComponent, PolarComponent, BarChart]);
/** 分类玫瑰图 */
const RosePie: React.FC<IWidgetProps> = ({ options = {}, data = [] }) => {
  const elemtRef = useRef<HTMLDivElement>();
  const myChart = useRef<ECharts>();
  const size = useSize(elemtRef);

  useLayoutEffect(() => {
    myChart.current = init(elemtRef.current);
    return () => myChart.current.dispose();
  }, []);

  useDebounceEffect(
    () => {
      myChart.current.resize({
        animation: {
          duration: 300,
        },
      });
    },
    [size],
    { wait: 200 }
  );

  const formatNumber = function (num) {
    const reg = /(?=(\B)(\d{3})+$)/g;
    return num.toString().replace(reg, ',');
  };
  const total = (data || []).reduce((a, b) => {
    return a + b.value * 1;
  }, 0);

  const chartOptions = useMemo(() => {
    const { pieStyle, grid, title, legend, series = {} } = options;
    // const pieStyleColor = convertEChartColors(pieStyle.color);
    return {
      color: getChartColors(grid.colors),
      // tooltip: {
      //     trigger: 'item'
      // },
      legend: formJsonToLegendData(legend),
      title: {
        show: !!title.show,
        text: '{name|' + title?.name + '}\n{val|' + formatNumber(total) + (title.unit || '') + '}',
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: { ...(title?.nameStyle || {}), padding: [0, 0, title?.paddingBottom || 0, 0] },
            val: title?.valueStyle,
          },
        },
      },
      series: [
        {
          type: 'pie',
          roseType: 'radius',
          radius: ['25%', '60%'],
          center: ['50%', '50%'],
          data,
          emphasis: {
            show: false,
          },
          itemStyle: {
            normal: {
              // borderColor: bgColor,
              // borderWidth: 2,
            },
          },
          ...series,
          label: {
            normal: {
              formatter: (params) => {
                return '{icon|●}{name|' + params.name + '}\n{value|' + formatNumber(params.value) + '}';
              },
              rich: {
                icon: {
                  fontSize: 16,
                  color: 'inherit',
                },
                name: {
                  fontSize: 14,
                  padding: [0, 0, 0, 10],
                  color: '#fefefe',
                },
                value: {
                  fontSize: 14,
                  fontWeight: 'bolder',
                  padding: [10, 0, 0, 20],
                  color: 'inherit',
                },
              },
            },
          },
        },
      ],
    };
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption(chartOptions, true);
  }, [chartOptions]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default RosePie;
