import { batch, reaction } from '@formily/reactive';
import { message } from 'antd';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ComDataType, FieldStatus } from '@/datav/shared';
import { DataConfigType, DataSource, FieldConfig } from '@/datav/interface';
import { useDesigner } from './useDesigner';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val: any, key: string) => hasOwnProperty.call(val, key);

export const getFieldMap = (fields: FieldConfig) => {
  const fieldMap: Record<string, string> = Object.create(null);
  for (const [key, fc] of Object.entries(fields)) {
    fieldMap[key] = fc.map || key;
  }
  return fieldMap;
};

const checkDataType = (dataType: ComDataType, data: any) => {
  if (Array.isArray(data)) {
    return dataType === ComDataType.array;
  }
  return typeof data === dataType;
};

const execFilter = (dataFilter: string, data: any) => {
  let res = data;
  try {
    const filter = `if (!data) { return data; }  return filter(data);  function filter(res){  ${dataFilter}   }`;
    const func = new Function('data', filter);
    res = func(res);
  } catch (error) {
    message.error('过滤器执行错误');
  }
  return res;
};

const mapComData = (obj: Record<string, any>, fieldMap: Record<string, string>) => {
  const c_obj = Object.create(null);
  Object.entries(fieldMap).forEach(([key, map]) => (c_obj[key] = obj[map] || obj[key] || null));
  return c_obj;
};

/** 组件数据 */
export const useReqData = (comId: string, dataSource: DataSource) => {
  const [comData, setComData] = useState(null);
  const timer = useRef<NodeJS.Timer>();
  const fieldMap = useRef<Record<string, string>>({});
  const designer = useDesigner();

  const transferData = (data: Record<string, any> | Array<Record<string, any>>) => {
    if (Array.isArray(data)) {
      return data.map((m) => mapComData(m, fieldMap.current));
    } else {
      return mapComData(data, fieldMap.current);
    }
  };

  const changeFieldsStatus = useCallback((fields: FieldConfig, comData: any, status?: FieldStatus) => {
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

  const changeComData = useCallback((resData: Record<string, any>, fields: FieldConfig, config: DataConfigType) => {
    let comData = resData;
    if (!comData?.isError) {
      comData = execFilter(config.filterCode, comData);
    }
    if (!comData?.isError && !checkDataType(config.dataType, comData)) {
      comData = { isError: true, message: '数据有误，类型应为：' + config.dataType, data: `${comData || null}` };
    }
    designer.dataSource.setData(comId, comData);
    changeFieldsStatus(fields, comData);
    setComData(transferData(comData));
  }, []);

  const autoRefreshData = useCallback(async (autoUpdate: boolean, time: number, fields: FieldConfig, config: DataConfigType) => {
    clearInterval(timer.current);
    requestData(config, fields);
    if (autoUpdate && time > 0) {
      timer.current = setInterval(async () => {
        requestData(config, fields);
      }, time * 1000);
    }
  }, []);

  const requestData = useCallback(async (config: DataConfigType, fields: FieldConfig) => {
    let resData: any;
    try {
      resData = await designer.dataSource.requestData(config);
    } catch (error) {
      resData = { isError: true, message: `${error}` };
    }
    changeComData(resData, fields, config);
  }, []);

  useEffect(() => {
    const dispose = reaction(() => {
      const { fields, config, updateTime, autoUpdate } = dataSource;
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
