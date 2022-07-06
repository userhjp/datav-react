import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { DatasetComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convert2Ddata, convertEChartColors, formDataToTooltipData, formJsonToxAxisData, formJsonToyAxisData } from '@/examples/shared';

use([GridComponent, SVGRenderer, DatasetComponent, TooltipComponent, LineChart]);

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
    const { tooltip = {}, xAxis = {}, yAxis = {}, lineSeriesStyle } = options;
    const series: any = {
      type: 'line',
      ...lineSeriesStyle,
    };
    series.name = lineSeriesStyle.name;
    series.label = lineSeriesStyle?.label?.show ? lineSeriesStyle?.label : { show: false };
    series.areaStyle = lineSeriesStyle.areaStyle.show
      ? { ...lineSeriesStyle.areaStyle, color: convertEChartColors(lineSeriesStyle.areaStyle.color) }
      : null;
    series.color = convertEChartColors(lineSeriesStyle.color);
    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.tooltip = formDataToTooltipData(tooltip, 'line');
    options.series = [series];
    return options;
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption({ ...opt, dataset }, true);
  }, [options, dataset]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default LineBer;
