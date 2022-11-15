import React, { useState } from 'react';
import { IDataSourceSetting } from '@/datav/react/interface';
import { Tooltip } from 'antd';
import { MonacoEditor } from '../../../../components';
import { IconWidget } from '@/datav/react/components';
import { DataSource } from '@/datav/core';
import { observer } from '@formily/react';
import './index.less';

export const DataPreview: React.FC<{ config: IDataSourceSetting; dataSource: DataSource }> = observer(({ config, dataSource }) => {
  const [viewData, setViewData] = useState();
  const loadData = async (visible: boolean) => {
    if (visible) {
      const resData = await dataSource.requestData(config);
      setViewData(resData);
    }
  };

  return (
    <Tooltip
      placement="left"
      trigger="click"
      onOpenChange={loadData}
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
