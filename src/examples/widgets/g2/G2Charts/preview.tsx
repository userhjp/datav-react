import React, { useLayoutEffect, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { Chart, getEngine } from '@antv/g2';
import { useDebounceEffect, useSize } from 'ahooks';
import { formatDate, formatNumber } from '@/utils';
import { useDatavEvent } from '@/datav/react/hooks';

/** Echarts 图表通用组件，接收options配置文件，组件只负责渲染 */
const G2Charts: React.FC<IWidgetProps> = ({ options = {}, data = null }) => {
  const elemtRef = useRef<HTMLDivElement>();
  const myChart = useRef<Chart>();
  const size = useSize(elemtRef);
  const updateVariables = useDatavEvent(
    {
      enable: true,
      description: '事件',
      fields: null,
    },
    null,
    false
  );

  useLayoutEffect(() => {
    myChart.current = new Chart({
      container: elemtRef.current,
      autoFit: true,
      renderer: 'svg',
      padding: [50, 30, 60, 40],
    });
    return () => myChart.current.destroy();
  }, []);

  useDebounceEffect(
    () => {
      myChart.current.forceFit();
    },
    [size],
    { wait: 200 }
  );

  useLayoutEffect(() => {
    const { options: opt } = options;
    let echartOpt: any = {};
    try {
      const fun = `const fun = (data, extend) => {  ${opt}   }; return fun(data, extend);`;
      const func = new Function('data', 'extend', fun);
      myChart.current.clear();
      echartOpt = func(data, {
        chart: myChart.current,
        formatDate,
        formatNumber,
        updateVariables,
        getEngine,
      });
      if (echartOpt && !echartOpt.color) {
        // echartOpt.color = colors?.color;
      }
    } catch (error) {
      throw Error(error);
    }
  }, [options, data]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default G2Charts;
