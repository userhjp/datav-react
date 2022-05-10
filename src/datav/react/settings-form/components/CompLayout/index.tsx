import { alignType } from '@/datav/core';
import { useSelection } from '@/datav/react/hooks';
import { Button, Space, Tooltip } from 'antd';
import React from 'react';
import { IconWidget } from '../../../components';
import './index.less';

type CompLayoutProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CompLayout: React.FC<CompLayoutProps> = () => {
  const selection = useSelection();
  return (
    <div className="comp-layout">
      <Space>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'左对齐'}>
          <Button
            type="primary"
            size="small"
            icon={<IconWidget infer="alignLeft" />}
            onClick={() => selection.align(alignType.alignLeft)}
          />
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'水平居中对齐'}>
          <Button
            type="primary"
            size="small"
            icon={<IconWidget infer="horizontally" />}
            onClick={() => selection.align(alignType.horizontally)}
          />
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'右对齐'}>
          <Button
            type="primary"
            size="small"
            icon={<IconWidget infer="alignRight" />}
            onClick={() => selection.align(alignType.alignRight)}
          />
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'顶对齐'}>
          <Button type="primary" size="small" icon={<IconWidget infer="alignTop" />} onClick={() => selection.align(alignType.alignTop)} />
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'垂直居中对齐'}>
          <Button
            type="primary"
            size="small"
            icon={<IconWidget infer="verticalCenter" />}
            onClick={() => selection.align(alignType.verticalCenter)}
          />
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'底对齐'}>
          <Button
            type="primary"
            size="small"
            icon={<IconWidget infer="alignBottom" />}
            onClick={() => selection.align(alignType.alignBottom)}
          />
        </Tooltip>
      </Space>
    </div>
  );
};
