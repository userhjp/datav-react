import { isObj } from '@/datav/shared';
import { autorun, observe } from '@formily/reactive';
import { useCallback, useEffect, useRef } from 'react';
import { IChangedEvent } from '../interface';
import { useDataSource } from './useDataSource';
/**
 * 组件事件Hook
 * @param event 事件配置
 * @param data 数据对象
 * @param monitor 是否监听依赖数据更新 默认 true
 */
export const useDatavEvent = (event: IChangedEvent, data: Record<string, any>, monitor = true) => {
  const dataSource = useDataSource();

  const updateVariables = (currentData?: Record<string, any>) => {
    const newData = currentData ?? data;
    if (!event.enable || !newData || !isObj(newData)) return;
    let obj = {};
    if (event.fields?.length) {
      event.fields.forEach((f) => {
        const alias = f.map || f.key;
        if (alias && f.key) {
          obj[alias] = newData[f.key] === undefined ? '' : newData[f.key];
        }
      });
    } else {
      obj = newData;
    }
    dataSource.setVariables(obj);
  };

  useEffect(() => monitor && updateVariables(), [data, event.fields]);

  useEffect(() => {
    const dispose = monitor && observe(event, () => updateVariables());
    return () => monitor && dispose();
  }, []);

  return updateVariables;
};

/** DV全局变量更新、监听 */
export const useVariables = () => {
  const dataSource = useDataSource();
  const dispose = useRef<() => void>();

  /**
   * 更新全局变量
   * @param data 合并对象
   * @returns void
   */
  const update = (data: Record<string, any>) => {
    if (!data || !isObj(data)) return;
    dataSource.setVariables(data);
  };

  /**
   * 监听全局变量变化
   * @param key 监听变量名 string || string[]
   * @param callback 监听变量变化后回调
   * @returns void
   */
  const watch = useCallback<(key: string[] | string, callback: (obj: object) => void) => void>((key, callback) => {
    dispose.current && dispose.current();
    dispose.current = autorun(() => {
      const obj = {};
      const keys = Array.isArray(key) ? key : [key];
      keys.forEach((f) => {
        obj[f] = dataSource.variables[f];
      });
      callback(obj);
    });
  }, []);

  useEffect(() => {
    return () => dispose.current && dispose.current();
  }, []);

  return { update, watch, variables: dataSource.variables };
};
