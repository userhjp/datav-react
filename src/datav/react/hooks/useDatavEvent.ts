import { getFieldMap } from '@/datav/shared';
import { observe } from '@formily/reactive';
import { useEffect } from 'react';
import { IChangedEvent } from '../interface';
import { useDataSource } from './useDataSource';

/**
 * 组件事件Hook
 * @param event 事件配置
 * @param data 数据对象
 * @param monitor 是否自动监听依赖数据更新
 */
export const useDatavEvent = (event: IChangedEvent, data: Record<string, any>, monitor = true) => {
  const dataSource = useDataSource();

  const updateVariables = (currentData?: Record<string, any>) => {
    if (!event.enable) return;
    const fieldMap = getFieldMap(event.fields);
    dataSource.setVariables(fieldMap, currentData ?? data);
  };

  useEffect(() => monitor && updateVariables(), [data]);

  useEffect(() => {
    const dispose = monitor && observe(event, () => updateVariables());
    return () => monitor && dispose();
  }, []);

  return updateVariables;
};
