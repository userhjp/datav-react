import React, { useLayoutEffect, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { LegendComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { FunnelChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { formJsonToLegendData } from '@/examples/shared';

use([SVGRenderer, LegendComponent, FunnelChart, TooltipComponent, GridComponent]);

/** 漏斗图 */
const BaseFunnel: React.FC<IWidgetProps> = ({ options = {}, data = [] }) => {
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

  useLayoutEffect(() => {
    const { series = {}, legend, colors } = options;
    const opt = {
      ...options,
      legend: formJsonToLegendData(legend),
      color: colors,
      series: [{ ...series, data }],
    };
    myChart.current.setOption(opt, true);
  }, [options, data]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BaseFunnel;
