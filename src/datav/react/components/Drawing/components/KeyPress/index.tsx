import { Tooltip } from 'antd';
import React from 'react';
import { IconWidget } from '../../../IconWidget';
import './index.less';

const KeyPress: React.FC = () => {
  const RenderTipInfo = () => {
    return (
      <div className="shortcut-wp">
        <div className="shortcut-item">
          <div className="shortcut-title">开关图层面板</div>
          <div className="shortcut-value">Ctrl/Cmd + ←</div>
        </div>
        <div className="shortcut-item">
          <div className="shortcut-title">切换组件面板</div>
          <div className="shortcut-value">Ctrl/Cmd + ↑</div>
        </div>
        <div className="shortcut-item">
          <div className="shortcut-title">切换右侧面板</div>
          <div className="shortcut-value">Ctrl/Cmd + →</div>
        </div>
        <div className="shortcut-item">
          <div className="shortcut-title">画布缩放到最佳位置</div>
          <div className="shortcut-value">Ctrl/Cmd + ↓</div>
        </div>
      </div>
    );
  };

  return (
    <div className="key-press">
      <Tooltip title={<RenderTipInfo />} mouseEnterDelay={0} color={'#303640'} placement="top">
        <IconWidget infer="ShortcutKey" style={{ fontSize: 20 }} />
      </Tooltip>
    </div>
  );
};

export default KeyPress;
