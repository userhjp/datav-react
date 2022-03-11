import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import * as echarts from 'echarts';
import { useDebounceEffect, useSize } from 'ahooks';
import { message } from 'antd';
import { colorsOpt } from '@/examples/schema/echarts/colorsSchema';

/** Echarts 图表通用组件，接收options配置文件，组件只负责渲染 */
const Echarts: React.FC<IWidgetProps> = ({ options = {}, data = null, events }) => {
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

  useLayoutEffect(() => {
    const { options: opt } = options;
    let echartOpt: any = {};
    try {
      const context: any = { echarts };
      const fun = `const fun = (resData) => {  ${opt}   }; return fun(resData);`;
      const func = new Function('resData', fun).call(context);
      echartOpt = func(data);
    } catch (error) {
      message.error('函数执行错误');
      console.log(error);
    }
    try {
      if (echartOpt && !echartOpt.color) {
        const colors = colorsOpt[0];
        echartOpt.color = colors?.color;
      }
      myChart.current.setOption(echartOpt, true);
    } catch (error) {}
  }, [options, data]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default Echarts;
