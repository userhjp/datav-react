import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent } from 'echarts/components';
import { PieChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convertEChartColors, getChartColors } from '@/examples/shared';

use([CanvasRenderer, PieChart, GridComponent, TitleComponent, PolarComponent, BarChart]);
/** 单值百分比饼图 */
const PercentagePie: React.FC<IWidgetProps> = ({ options = {}, data = {} }) => {
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

  const dataset = useMemo(() => {
    return { text: data?.text, value: data?.value || 0 };
  }, [data]);

  const chartOptions = useMemo(() => {
    const { pieStyle, innerPie, outerPie, grid, textStyle, valueStyle } = options;
    const pieStyleColor = convertEChartColors(pieStyle.color);

    const series: any = [
      {
        name: '',
        type: 'bar',
        roundCap: true,
        showBackground: true,
        barWidth: 30,
        backgroundStyle: {
          color: 'rgba(66, 66, 66, .3)',
        },
        data: [dataset.value],
        coordinateSystem: 'polar',
      },
    ];
    if (innerPie?.show) {
      series.push({
        name: '',
        type: 'pie',
        startAngle: 80,
        radius: ['64%'],
        emphasis: {
          show: false,
        },
        center: ['50%', '50%'],
        itemStyle: innerPie,
        data: [100],
      });
    }
    if (outerPie?.show) {
      series.push({
        name: '',
        type: 'pie',
        startAngle: 80,
        radius: ['86%'],
        emphasis: {
          show: false,
        },
        center: ['50%', '50%'],
        itemStyle: outerPie,
        data: [100],
      });
    }
    return {
      series,
      color: pieStyleColor ? pieStyleColor : getChartColors(grid.colors),
      grid,
      title: [
        {
          show: textStyle.show,
          text: dataset.text,
          x: 'center',
          top: '55%',
          textStyle: textStyle.textStyle,
        },
        {
          show: valueStyle.show,
          text: `${dataset.value}%`,
          x: 'center',
          y: 'center',
          textStyle: valueStyle.textStyle,
        },
      ],
      polar: {
        radius: ['70%', '80%'],
        center: ['50%', '50%'],
      },
      angleAxis: {
        max: 100,
        show: false,
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    };
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption(chartOptions, true);
  }, [chartOptions]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default PercentagePie;
