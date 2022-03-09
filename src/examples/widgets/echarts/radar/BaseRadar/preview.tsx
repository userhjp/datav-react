import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convertEChartColors, formDataToTooltipData, getChartColors } from '@/examples/shared';

use([CanvasRenderer, RadarChart, GridComponent, TitleComponent, PolarComponent]);
/** 基础雷达图 */
const BaseRadar: React.FC<IWidgetProps> = ({ options = {}, data = [] }) => {
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

  const chartOptions = useMemo(() => {
    const { grid, tooltip = {} } = options;
    // const pieStyleColor = convertEChartColors(pieStyle.color);
    // const nameStyle = title?.nameStyle?.textStyle ? { ...title.nameStyle.textStyle, padding: [title.nameStyle.padding, 0] } : {};
    return {
      color: getChartColors(grid.colors),
      grid,
      // tooltip: {
      //     trigger: 'item'
      // },
      tooltip: {
        ...tooltip,
        borderWidth: 0,
        // 雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        confine: true,
        enterable: false, // 鼠标是否可以移动到tooltip区域内
      },
      radar: {
        name: {
          textStyle: {
            color: '#05D5FF',
            fontSize: 14,
          },
        },
        shape: 'polygon',
        center: ['50%', '50%'],
        radius: '80%',
        startAngle: 120,
        scale: true,
        axisLine: {
          lineStyle: {
            color: 'rgba(5, 213, 255, .8)',
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(5, 213, 255, .8)', // 设置网格的颜色
          },
        },
        indicator: [
          {
            name: '特殊人群',
            max: 100,
          },
          {
            name: '信访',
            max: 100,
          },
          {
            name: '12345',
            max: 100,
          },
          {
            name: '事件',
            max: 100,
          },
          {
            name: '矛盾调解',
            max: 100,
          },
          {
            name: '人民调解',
            max: 100,
          },
        ],
        splitArea: {
          show: false,
        },
      },
      polar: {
        center: ['50%', '50%'], // 默认全局居中
        radius: '0%',
      },
      angleAxis: {
        min: 0,
        interval: 5,
        clockwise: false,
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      radiusAxis: {
        min: 0,
        interval: 20,
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: '个人雷达图',
          type: 'radar',
          symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
          symbolSize: 10, // 拐点的大小
          itemStyle: {
            normal: {
              color: '#05D5FF',
            },
          },
          areaStyle: {
            normal: {
              color: '#05D5FF',
              opacity: 0.5,
            },
          },
          lineStyle: {
            width: 2,
            color: '#05D5FF',
          },
          label: {
            normal: {
              show: true,
              formatter: (params) => {
                return params.value;
              },
              color: '#fff',
            },
          },
          data: [
            {
              value: [20, 50, 60, 60, 90, 80],
            },
          ],
        },
        {
          name: '2个人雷达图',
          type: 'radar',
          symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
          symbolSize: 10, // 拐点的大小
          itemStyle: {
            normal: {
              color: '#05D5FF',
            },
          },
          areaStyle: {
            normal: {
              color: '#05D5FF',
              opacity: 0.5,
            },
          },
          lineStyle: {
            width: 2,
            color: '#05D5FF',
          },
          label: {
            normal: {
              show: true,
              formatter: (params) => {
                return params.value;
              },
              color: '#fff',
            },
          },
          data: [
            {
              value: [56, 32, 12, 34, 90, 80],
            },
          ],
        },
      ],
    };
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption(chartOptions, true);
  }, [chartOptions]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BaseRadar;
