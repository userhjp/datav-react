import React, { useState } from 'react';
import { IDataSourceSetting } from '@/datav/react/interface';
import { Tooltip } from 'antd';
import { MonacoEditor } from '../../../components';
import { IconWidget } from '@/datav/react/components';
import { DataSource } from '@/datav/core';
import './index.less';
import { observer } from '@formily/react';

export const DataPreview: React.FC<{ config: IDataSourceSetting; dataSource: DataSource }> = observer(({ config, dataSource }) => {
  const [viewData, setViewData] = useState();
  const loadData = async (visible: boolean) => {
    let resData: any;
    if (visible) {
      try {
        resData = await dataSource.requestData(config);
      } catch (error) {
        resData = { isError: true, message: `${error}` };
      }
      setViewData(resData);
    }
  };

  return (
    <Tooltip
      placement="left"
      trigger="click"
      onVisibleChange={loadData}
      overlayClassName="dv-data-preview"
      title={() => {
        return (
          <MonacoEditor
            {...{
              language: 'json',
              value: viewData,
              readOnly: true,
              autoFormat: true,
              height: 180,
              fullScreenTitle: '数据响应结果',
              className: 'filter-editor',
            }}
          />
        );
      }}
    >
      <div className="ds-response-btn">
        <IconWidget infer="Search" />
        &nbsp;预览数据源返回结果
      </div>
    </Tooltip>
  );
});
