import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent, TooltipComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convertEChartColors } from '@/examples/shared';

use([SVGRenderer, RadarChart, GridComponent, TitleComponent, PolarComponent, TooltipComponent]);
/** 基础雷达图 */
const BaseRadar: React.FC<IWidgetProps> = ({ options = {}, data = {} }) => {
  const elemtRef = useRef<HTMLDivElement>();
  const myChart = useRef<ECharts>();
  const size = useSize(elemtRef);

  useLayoutEffect(() => {
    myChart.current = init(elemtRef.current, null, { renderer: 'svg' });
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
    try {
      return {
        indicator: data.indicator || [],
        data: data.data || [],
      };
    } catch (error) {
      return {
        indicator: [],
        data: [],
      };
    }
  }, [data]);

  const chartOptions = useMemo(() => {
    const { grid, tooltip = {}, radar = {}, radarSeries = {}, colors } = options;
    const { splitArea, ...radarObj } = radar;
    if (!dataset.indicator?.length) return {};
    return {
      color: colors,
      grid,
      tooltip: {
        ...tooltip,
        borderWidth: 0,
        // 雷达图的tooltip不会超出div，也可以设置position属性，position定位的tooltip 不会随着鼠标移动而位置变化，不友好
        confine: true,
        enterable: false, // 鼠标是否可以移动到tooltip区域内
      },
      radar: {
        ...radarObj,
        indicator: dataset.indicator,
        splitArea: splitArea.areaStyle?.show
          ? { areaStyle: { ...splitArea.areaStyle, color: convertEChartColors(splitArea.areaStyle.color) } }
          : {},
      },
      series: {
        type: 'radar',
        data: dataset.data,
        ...radarSeries,
        areaStyle: radarSeries.areaStyle?.show
          ? { ...radarSeries.areaStyle, color: convertEChartColors(radarSeries.areaStyle.color) }
          : null,
      },
    };
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption(chartOptions, true);
  }, [chartOptions, dataset]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BaseRadar;
