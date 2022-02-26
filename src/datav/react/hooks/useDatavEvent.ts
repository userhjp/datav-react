import { getFieldMap, mapObject } from '@/datav/shared';
import { autorun, isObservable, markObservable, observable, observe } from '@formily/reactive';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { IChangedEvent } from '../interface';
import { useDataSource } from './useDataSource';

/**
 * 组件事件Hook
 * @param event 事件配置
 * @param data 事件数据对象
 */
export const useDatavEvent = (event: IChangedEvent, data: Record<string, any>) => {
  const dataSource = useDataSource();
  // const obs = useRef(observable({ value: {} }));

  const updateFileds = () => {
    if (!event.enable) return;
    const fieldMap = getFieldMap(event.fields);
    dataSource.setVariables(fieldMap, data);
    console.log(dataSource.variables);
  };

  useEffect(() => updateFileds(), [data]);

  useEffect(() => {
    const dispose = observe(event, updateFileds);
    return () => dispose();
  }, []);
};
