import { notification } from 'antd';
import { IFieldSetting } from '../react/interface';
import { IDataType } from './enums';

export const getFieldMap = (fields: IFieldSetting) => {
  const fieldMap: Record<string, string> = Object.create(null);
  for (const [key, fc] of Object.entries(fields)) {
    fieldMap[key] = fc.map || key;
  }
  return fieldMap;
};

export const checkDataType = (dataType: IDataType, data: any) => {
  if (!dataType || dataType === IDataType.any) return true;
  if (Array.isArray(data)) {
    return dataType === IDataType.array;
  }
  return typeof data === dataType;
};

export const mapObject = (obj: Record<string, any>, fieldMap: Record<string, string>, isOriginal = true) => {
  if (!fieldMap || !Object.keys(fieldMap).length) return obj;
  const c_obj = Object.create({ ...obj });
  Object.entries(fieldMap).forEach(([key, map]) => (c_obj[key] = obj[map] ?? obj[key] ?? null));
  return c_obj;
};
