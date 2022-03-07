import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent } from 'echarts/components';
import { PieChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { graphic } from 'echarts/core';
import { getChartColors } from '@/examples/shared';

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
    return {
      color: getChartColors(options.grid.colors),
      title: [
        {
          show: options.textStyle.show,
          text: dataset.text,
          x: 'center',
          top: '55%',
          textStyle: options.textStyle.textStyle,
        },
        {
          show: options.valueStyle.show,
          text: `${dataset.value}%`,
          x: 'center',
          y: 'center',
          textStyle: options.valueStyle.textStyle,
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
      series: [
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
        {
          name: '',
          type: 'pie',
          startAngle: 80,
          radius: ['64%'],
          hoverAnimation: false,
          center: ['50%', '50%'],
          itemStyle: {
            color: 'rgba(66, 66, 66, .1)',
            borderWidth: 1,
            borderColor: options?.innerBorderColor,
          },
          data: [100],
        },
        {
          name: '',
          type: 'pie',
          startAngle: 80,
          radius: ['86%'],
          hoverAnimation: false,
          center: ['50%', '50%'],
          itemStyle: {
            color: 'rgba(66, 66, 66, .1)',
            borderWidth: 1,
            borderColor: options?.outerBorderColor,
          },
          data: [100],
        },
      ],
    };
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption(chartOptions, true);
  }, [chartOptions]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default PercentagePie;
