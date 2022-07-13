import React, { useLayoutEffect, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import * as echarts from 'echarts';
import { useDebounceEffect, useSize } from 'ahooks';
import { formatDate, formatNumber } from '@/utils';
import { useVariables } from '@/datav/react/hooks';
/** Echarts 图表通用组件，接收options配置文件，组件只负责渲染 */
const Echarts: React.FC<IWidgetProps> = ({ options = {}, data = null }) => {
  const elemtRef = useRef<HTMLDivElement>();
  const myChart = useRef<echarts.ECharts>();
  const size = useSize(elemtRef);
  const variables = useVariables();

  useLayoutEffect(() => {
    myChart.current = echarts.init(elemtRef.current, null, { renderer: 'svg' });
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
    const { options: opt } = options;
    let echartOpt: any = {};
    try {
      const fun = `const fun = (data, extend) => {  ${opt}   }; return fun(data, extend);`;
      const func = new Function('data', 'extend', fun);
      echartOpt = func(data, {
        myChart: myChart.current,
        echarts,
        formatDate,
        formatNumber,
        ...variables,
      });
      if (echartOpt && !echartOpt.color) {
        // echartOpt.color = colors?.color;
      }
      myChart.current.setOption(echartOpt, true);
    } catch (error) {
      throw Error(error);
    }
  }, [options, data]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default Echarts;
