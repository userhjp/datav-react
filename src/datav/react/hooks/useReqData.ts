import { batch, reaction } from '@formily/reactive';
import { useState, useEffect, useCallback, useRef } from 'react';
import { checkDataType, execFilter, FieldStatus, getFieldMap, mapObject } from '../../shared';
import { IDataSourceSetting, IDataSetting, IFieldSetting } from '../interface';
import { useDataSource } from './useDataSource';

const hasOwn = (val: any, key: string) => Object.prototype.hasOwnProperty.call(val, key);

/** 组件数据 */
export const useReqData = (comId: string, dataSetting: IDataSetting) => {
  const [comData, setComData] = useState(null);
  const timer = useRef<NodeJS.Timer>();
  const fieldMap = useRef<Record<string, string>>({});
  const dataSource = useDataSource();

  const transferData = (data: Record<string, any> | Array<Record<string, any>>) => {
    if (Array.isArray(data)) {
      return data.map((m) => mapObject(m, fieldMap.current));
    } else {
      return mapObject(data, fieldMap.current);
    }
  };

  const changeFieldsStatus = useCallback((fields: IFieldSetting, comData: any, status?: FieldStatus) => {
    let _data = null;
    if (Array.isArray(comData)) {
      _data = comData[0];
    } else if (typeof comData === 'object') {
      _data = comData;
    }

    batch(() => {
      Object.entries(fields).forEach(([key, fc]) => {
        if (status === FieldStatus.loading) {
          fields[key].status = FieldStatus.loading;
        } else if (_data && hasOwn(_data, fc.map || key)) {
          fields[key].status = FieldStatus.success;
        } else {
          fields[key].status = FieldStatus.failed;
        }
      });
    });
  }, []);

  const changeComData = useCallback((resData: Record<string, any>, fields: IFieldSetting, config: IDataSourceSetting) => {
    let comData = resData;
    if (!comData?.isError) {
      comData = execFilter(config.filterCode, comData);
    }
    if (!comData?.isError && !checkDataType(config.dataType, comData)) {
      comData = { isError: true, message: '数据有误，类型应为：' + config.dataType, data: `${comData || null}` };
    }
    dataSource.setData(comId, comData);
    changeFieldsStatus(fields, comData);
    setComData(transferData(comData));
  }, []);

  const autoRefreshData = useCallback(async (autoUpdate: boolean, time: number, fields: IFieldSetting, config: IDataSourceSetting) => {
    clearInterval(timer.current);
    requestData(config, fields);
    if (autoUpdate && time > 0) {
      timer.current = setInterval(async () => {
        requestData(config, fields);
      }, time * 1000);
    }
  }, []);

  const requestData = useCallback(async (config: IDataSourceSetting, fields: IFieldSetting) => {
    let resData: any;
    try {
      resData = await dataSource.requestData(config);
    } catch (error) {
      resData = { isError: true, message: `${error}` };
    }
    changeComData(resData, fields, config);
  }, []);

  useEffect(() => {
    const dispose = reaction(() => {
      const { fields, config, updateTime, autoUpdate } = dataSetting;
      fieldMap.current = getFieldMap(fields);
      changeFieldsStatus(fields, comData, FieldStatus.loading);
      autoRefreshData(autoUpdate, updateTime, fields, config);
    });
    return () => {
      dispose();
      clearInterval(timer.current);
    };
  }, []);

  return comData;
};
