import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { GridComponent, TitleComponent, PolarComponent, SingleAxisComponent } from 'echarts/components';
import { ScatterChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useDebounceEffect, useSize } from 'ahooks';
import { use, ECharts, init } from 'echarts/core';
import { convert2Ddata, formJsonToxAxisData, formJsonToyAxisData } from '@/examples/shared';

use([CanvasRenderer, ScatterChart, GridComponent, TitleComponent, PolarComponent, SingleAxisComponent]);
/** 气泡图 */
const BubbleChart: React.FC<IWidgetProps> = ({ options = {}, data = [] }) => {
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

  const opt = useMemo(() => {
    const { xAxis = {}, yAxis = {}, polarSeriesStyle } = options;
    const series: any = {
      type: 'scatter',
      ...polarSeriesStyle,
    };
    series.name = polarSeriesStyle.name;
    series.label = polarSeriesStyle?.label?.show ? polarSeriesStyle?.label : { show: false };
    series.color = convertEChartColors(polarSeriesStyle.color);
    options.xAxis = formJsonToxAxisData(xAxis);
    options.yAxis = formJsonToyAxisData(yAxis);
    options.series = [
      {
        ...series,
        symbolSize: new Function('data', `const fun = (data) => {  ${series.symbolSize}   }; return fun(data);`),
      },
    ];
    return options;
  }, [options]);

  useLayoutEffect(() => {
    myChart.current.setOption({ ...opt, dataset }, true);
  }, [options, dataset]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default BubbleChart;

/** 转换echart颜色渐变 */
function convertEChartColors(colors: Array<string> | any): string | object {
  if (!colors) return '';
  if (typeof colors === 'string') return colors;
  if (colors.colorStops) return colors; // 这里大概判断下表示已经转换过
  const col = colors.filter((f) => !!f);
  if (col && col.length > 1) {
    const offset = 1 / (col.length - 1);
    return {
      type: 'radial',
      x: 0.5,
      y: 0.5,
      r: 0.5,
      colorStops: col.map((m, i) => {
        return { offset: i === col.length ? 1 : offset * i, color: m };
      }),
      global: false, // 缺省为 false
    };
  } else {
    return colors[0] || '';
  }
}
