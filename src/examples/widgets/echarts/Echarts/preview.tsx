import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import * as echarts from 'echarts';
import { useDebounceEffect, useSize } from 'ahooks';
import { execFilter } from '@/datav/shared';
import { message } from 'antd';

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

  useLayoutEffect(() => {
    const { options: opt } = options;
    try {
      const filter = `if (!data) { return data; }  return filter(data);  function filter(res){  ${opt}   }`;
      const func = new Function('data', filter);
      const res = func(data);
      myChart.current.setOption(res, true);
    } catch (error) {
      message.error('函数执行错误');
    }
  }, [options]);

  return <div ref={elemtRef} style={{ width: '100%', height: '100%' }} />;
};

export default Echarts;
