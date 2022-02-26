import { getFieldMap } from '@/datav/shared';
import { observe } from '@formily/reactive';
import { useEffect } from 'react';
import { IChangedEvent } from '../interface';
import { useDataSource } from './useDataSource';

/**
 * 组件事件Hook
 * @param event 事件配置
 * @param data 数据对象
 */
export const useDatavEvent = (event: IChangedEvent, data: Record<string, string>) => {
  const dataSource = useDataSource();

  const updateVariables = () => {
    if (!event.enable) return;
    const fieldMap = getFieldMap(event.fields);
    dataSource.setVariables(fieldMap, data);
  };

  useEffect(() => updateVariables(), [data]);

  useEffect(() => {
    const dispose = observe(event, updateVariables);
    return () => dispose();
  }, []);
};
