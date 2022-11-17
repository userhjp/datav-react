import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { DatasetComponent, GridComponent, TooltipComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convert2Ddata, convertEChartColors, formDataToTooltipData, formJsonToxAxisData, formJsonToyAxisData } from '@/examples/shared';
import { ECBasicOption } from 'echarts/types/dist/shared';

use([GridComponent, BarChart, LineChart, SVGRenderer, DatasetComponent, TooltipComponent]);

const BaseBar: React.FC<IWidgetProps> = ({ options = {}, data = [], events }) => {
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
      return null;
    }
  }, [data]);

  const opt: ECBasicOption = useMemo(() => {
    const { tooltip = {}, xAxis = {}, yAxis = {}, barSeriesStyle = {} } = options;
    const series: any = {
      type: 'bar',
    };
    series.name = barSeriesStyle.name;
    series.showBackground = !!barSeriesStyle?.backgroundStyle?.show; // 背景
    series.backgroundStyle = barSeriesStyle?.backgroundStyle;
    series.label = barSeriesStyle?.label?.show ? barSeriesStyle.label : { show: false };
    series.barWidth = barSeriesStyle.barWidth || 'auto';
    series.color = convertEChartColors(barSeriesStyle.color);
    if (barSeriesStyle.borderRadius) {
      series.itemStyle = {};
      series.itemStyle.borderRadius = [
        barSeriesStyle.borderRadius?.leftTop || 0,
        barSeriesStyle.borderRadius?.rightTop || 0,
        barSeriesStyle.borderRadius?.rightbottom || 0,
        barSeriesStyle.borderRadius?.leftbottom || 0,
      ];
    }

    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.tooltip = formDataToTooltipData(tooltip, 'cross');
    options.series = [series];
    return options;
  }, [options]);

  useLayoutEffect(() => {
    try {
      myChart.current.setOption({ ...opt, dataset }, true);
    } catch (error) {
      console.log(error);
    }
  }, [opt, dataset]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BaseBar;
