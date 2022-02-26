import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
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
import { useDatavEvent } from '@/datav/react/hooks';
import { observable } from '@formily/reactive';

use([GridComponent, BarChart, LineChart, CanvasRenderer, LegendComponent, DatasetComponent, TooltipComponent]);

const BaseBar: React.FC<IWidgetProps> = ({ options = {}, data = [], events }) => {
  const elemtRef = useRef<HTMLDivElement>();
  const myChart = useRef<ECharts>();
  const size = useSize(elemtRef);
  const [test, setTest] = useState({ value: '' });
  useDatavEvent(events.changed, test);
  console.log('组件重载了', events);
  useLayoutEffect(() => {
    myChart.current = init(elemtRef.current);
    return () => myChart.current.dispose();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTest({ value: '1111' });
    }, 3000);
  }, [events.changed]);

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
      return null;
    }
  }, [data]);

  useLayoutEffect(() => {
    options.dataset = dataset;
    const { legend = {}, series = [], tooltip = {}, xAxis = {}, yAxis = {}, grid = {} } = options;
    if (!series.length) return;
    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.legend = formJsonToLegendData(legend);
    options.tooltip = formDataToTooltipData(tooltip, 'cross');
    options.series = formDataToSeriesData(options);
    myChart.current.setOption(options, true);
  }, [options]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BaseBar;
