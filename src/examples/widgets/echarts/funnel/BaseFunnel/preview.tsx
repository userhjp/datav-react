import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { LegendComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { FunnelChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { formJsonToLegendData, getChartColors } from '@/examples/shared';

use([CanvasRenderer, LegendComponent, FunnelChart, TooltipComponent, GridComponent]);

/** 漏斗图 */
const BaseFunnel: React.FC<IWidgetProps> = ({ options = {}, data = [] }) => {
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
    try {
      return data;
    } catch (error) {
      return [];
    }
  }, [data]);

  useLayoutEffect(() => {
    const { series = {} } = options;
    const opt = {
      ...options,
      legend: formJsonToLegendData(options.legend),
      color: getChartColors(options.colors),
      series: [{ ...series, data }],
    };
    myChart.current.setOption(opt, true);
  }, [options]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BaseFunnel;
