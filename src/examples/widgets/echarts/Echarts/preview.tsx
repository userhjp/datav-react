import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import * as echarts from 'echarts';
import {
  convert2Ddata,
  formDataToSeriesData,
  formDataToTooltipData,
  formJsonToLegendData,
  formJsonToxAxisData,
  formJsonToyAxisData,
} from '@/examples/shared';
import { useDebounceEffect, useSize } from 'ahooks';

/** Echarts 图表通用组件，接收所有配置文件，组件只负责渲染 */
const Echarts: React.FC<IWidgetProps> = ({ options = {}, data = [], events }) => {
  const elemtRef = useRef<HTMLDivElement>();
  const myChart = useRef<echarts.ECharts>();
  const size = useSize(elemtRef);

  useLayoutEffect(() => {
    myChart.current = echarts.init(elemtRef.current);
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

export default Echarts;
