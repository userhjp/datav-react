import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { ComType } from '@/datav/interface';
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
} from '@/datav/shared';

use([GridComponent, BarChart, LineChart, CanvasRenderer, LegendComponent, DatasetComponent, TooltipComponent]);

/** 堆叠柱状图 */
const StackBar: React.FC<ComType> = ({ options = {}, data = [] }) => {
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
      return convert2Ddata(data);
    } catch (error) {
      return [];
    }
  }, [data]);

  useLayoutEffect(() => {
    options.dataset = dataset;
    const { legend = {}, series = [], tooltip = {}, xAxis = {}, yAxis = {}, grid = {}, barSeriesStyle = {} } = options;
    if (!series.length) return;
    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.legend = formJsonToLegendData(legend);
    options.tooltip = formDataToTooltipData(tooltip, 'shadow');
    options.series = formDataToSeriesData(options);
    options.series.forEach((f, i) => {
      f.stack = 'stack';
      if (i === 0) {
        f.itemStyle.borderRadius = [0, 0, barSeriesStyle.borderRadius?.rightbottom || 0, barSeriesStyle.borderRadius?.leftbottom || 0];
      } else if (i === options.series.length - 1) {
        f.itemStyle.borderRadius = [barSeriesStyle.borderRadius?.leftTop || 0, barSeriesStyle.borderRadius?.rightTop || 0, 0, 0];
      } else {
        f.itemStyle.borderRadius = 0;
      }
    });
    myChart.current.setOption(options, true);
  }, [options]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default StackBar;
