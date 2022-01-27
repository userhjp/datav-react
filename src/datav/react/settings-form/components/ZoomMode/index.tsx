import { ZoomMode } from '@/datav/shared';
import { Radio, Space, Tooltip } from 'antd';
import React from 'react';
import { IconWidget } from '@/datav/react/components';
import './index.less';

type ZoomModeProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ZoomModeRadio: React.FC<ZoomModeProps> = ({ onChange, value }) => {
  return (
    <Radio.Group className="zoom-mode" size="small" onChange={(e) => onChange(e.target.value)} value={value}>
      <Space>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'全屏铺满'}>
          <Radio.Button value={ZoomMode.auto}>
            <IconWidget infer="FullScreenZoom" />
          </Radio.Button>
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'等比缩放宽度铺满'}>
          <Radio.Button value={ZoomMode.width}>
            <IconWidget infer="FullWidthZoom" />
          </Radio.Button>
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'等比缩放高度铺满'}>
          <Radio.Button value={ZoomMode.height}>
            <IconWidget infer="FullHeightZoom" />
          </Radio.Button>
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'等比缩放高度铺满(可滚动)'}>
          <Radio.Button value={ZoomMode.full}>
            <IconWidget infer="FullCover" />
          </Radio.Button>
        </Tooltip>
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'不缩放'}>
          <Radio.Button value={ZoomMode.disabled}>
            <IconWidget infer="NoZoom" />
          </Radio.Button>
        </Tooltip>
      </Space>
    </Radio.Group>
  );
};
