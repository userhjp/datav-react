import { DvData } from '@/datav/core/models/DvData';
import { useEffect, useRef } from 'react';
import { IDataSetting } from '../interface';
import { useDataSource } from './useDataSource';

/** 组件数据 */
export const useReqData = (comId: string, dataSetting: IDataSetting) => {
  const dataSource = useDataSource();
  const dataRef = useRef(
    new DvData({
      dataSource,
      id: comId,
      ...dataSetting,
    })
  );

  useEffect(() => {
    dataSource.setData(comId, dataRef.current);
    return () => dataSource.removeData(comId);
  }, []);

  return dataRef.current.data;
};
