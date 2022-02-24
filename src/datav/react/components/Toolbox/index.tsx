import { observer } from '@formily/react';
import { Checkbox, Switch } from 'antd';
import React from 'react';
import { PanelType } from '../../../shared';
import { useToolbar } from '../../hooks';
import './index.less';

/** 工具栏 */
export const Toolbox: React.FC = observer(() => {
  const toolbar = useToolbar();

  const changeReferLinePanel = () => {
    toolbar.setPanelState({ type: PanelType.referline, value: !toolbar.toolbox.referline });
  };

  const changeAlignLinePanel = () => {
    toolbar.setPanelState({ type: PanelType.alignline, value: !toolbar.toolbox.alignline });
  };
  const onChange = (val: any) => {};

  return (
    <div className={`toolbox-panel-wp ${toolbar.toolbox.show ? '' : 'collapsed'}`}>
      <div className="toolbox-panel">
        <div className="btn-box">
          <span>组件缩放</span>
          <Checkbox onChange={onChange} />
        </div>
        <div className="btn-box">
          <span>参考线</span>
          <Switch size="small" checked={toolbar.toolbox.referline} onChange={changeReferLinePanel} />
        </div>
        <div className="btn-box">
          <span>对齐线</span>
          <Switch size="small" checked={toolbar.toolbox.alignline} onChange={changeAlignLinePanel} />
        </div>
      </div>
    </div>
  );
});
