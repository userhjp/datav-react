import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent } from 'echarts/components';
import { PieChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convertEChartColors, getChartColors } from '@/examples/shared';

use([CanvasRenderer, PieChart, GridComponent, TitleComponent, PolarComponent, BarChart]);
/** 玫瑰饼图 */
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

  const bgColor = '#001037';
  const chartOptions = useMemo(() => {
    const { pieStyle, grid, title } = options;
    const pieStyleColor = convertEChartColors(pieStyle.color);
    const nameStyle = title?.nameStyle?.textStyle ? { ...title.nameStyle.textStyle, padding: [title.nameStyle.padding, 0] } : {};
    return {
      color: getChartColors(grid.colors),
      // tooltip: {
      //     trigger: 'item'
      // },
      title: {
        show: !!title.show,
        text: '{name|' + title?.nameStyle?.name + '}\n{val|' + formatNumber(total) + '}',
        top: 'center',
        left: 'center',
        textStyle: {
          rich: {
            name: nameStyle,
            val: title?.valueStyle?.textStyle || {},
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
          labelLine: {
            normal: {
              length: 20,
              length2: 60,
              lineStyle: {},
            },
          },
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
                  fontSize: 18,
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
