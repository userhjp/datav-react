import { observer } from '@formily/react';
import { Tabs } from 'antd';
import React from 'react';
import { PanelType } from '../../../shared';
import { useToolbar } from '../../hooks';
import PreviewItem from './PreviewItem';
import { IconWidget } from '../IconWidget';
import { IResourceData } from '../../types';
import './index.less';

const { TabPane } = Tabs;

const icons = {
  chart: <IconWidget infer="Chart" />,
  map: <IconWidget infer="Map" />,
  media: <IconWidget infer="Media" />,
  other: <IconWidget infer="Other" />,
  info: <IconWidget infer="RichText" />,
};

export const DragPanel: React.FC<{ resourceData: IResourceData[] }> = observer(({ resourceData }) => {
  const toolbar = useToolbar();
  const changeConfigPanel = () => {
    toolbar.setPanelState({ type: PanelType.components, value: !toolbar.components.show });
  };

  const RenderTab = (m: { icon: string; name: string }) => {
    return (
      <div className="tab-btn">
        {icons[m.icon]}
        <div>{m.name}</div>
      </div>
    );
  };

  return (
    <div className={`left-sidebar ${toolbar.components.show ? '' : 'collapsed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-head">
          <div>{toolbar.components.show ? '全部组件' : '组件'}</div>
          {toolbar.components.show && <IconWidget infer="LeftArrow" className="toggle-icon" onClick={changeConfigPanel} />}
        </div>
        <Tabs
          className="left-sidebar-tabs"
          tabPosition="left"
          size="small"
          onChange={() => {
            if (!toolbar.components.show) changeConfigPanel();
          }}
        >
          {resourceData.map((m, i) => (
            <TabPane tab={<RenderTab icon={m.icon} name={m.name} />} key={i}>
              <PreviewItem data={m.children} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
});
