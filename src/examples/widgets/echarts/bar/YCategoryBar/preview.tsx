import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize, useWhyDidYouUpdate } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import {
  convert2Ddata,
  formDataToSeriesData,
  formDataToTooltipData,
  formJsonToLegendData,
  formJsonToxAxisData,
  formJsonToyAxisData,
} from '@/examples/shared';

use([GridComponent, BarChart, LineChart, CanvasRenderer, LegendComponent, DatasetComponent, TooltipComponent]);
/** 横向柱状图 */
const YCategoryBar: React.FC<IWidgetProps> = ({ options = {}, data = [], events }) => {
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
      const datas = convert2Ddata(data);
      datas.source = datas.source.reverse();
      return datas;
    } catch (error) {
      return null;
    }
  }, [data]);

  const opt = useMemo(() => {
    const { legend = {}, series = [], tooltip = {}, xAxis = {}, yAxis = {}, grid = {} } = options;
    if (!series.length) return {};
    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.legend = formJsonToLegendData(legend);
    options.tooltip = formDataToTooltipData(tooltip, 'cross');
    options.series = formDataToSeriesData(options);
    return options;
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption({ ...opt, dataset }, true);
  }, [opt, dataset]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default YCategoryBar;
