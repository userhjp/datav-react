import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import {
  convert2Ddata,
  formDataToSeriesData,
  formDataToTooltipData,
  formJsonToLegendData,
  formJsonToxAxisData,
  formJsonToyAxisData,
} from '@/examples/shared';

use([GridComponent, SVGRenderer, LegendComponent, DatasetComponent, TooltipComponent, LineChart, BarChart]);

const LineBer: React.FC<IWidgetProps> = ({ options = {}, data = [] }) => {
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
      return convert2Ddata(data);
    } catch (error) {
      return [];
    }
  }, [data]);

  const opt = useMemo(() => {
    const { legend = {}, series = [], tooltip = {}, xAxis = {}, yAxis = {} } = options;
    if (!series.length) return {};
    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.legend = formJsonToLegendData(legend);
    options.tooltip = formDataToTooltipData(tooltip, 'shadow');
    options.series = formDataToSeriesData(options);
    return options;
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption({ ...opt, dataset }, true);
  }, [options, dataset]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default LineBer;
