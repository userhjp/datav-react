import { observer } from '@formily/react';
import { Tabs } from 'antd';
import React, { useMemo } from 'react';
import { PanelType } from '@/datav/shared';
import { useToolbar } from '@/datav/react/hooks';
import PreviewItem from './PreviewItem';
import { typeData } from './data';
import { IconWidget } from '../IconWidget';
import './index.less';

const { TabPane } = Tabs;

const icons = {
  chart: <IconWidget infer="Chart" />,
  map: <IconWidget infer="Map" />,
  media: <IconWidget infer="Media" />,
  other: <IconWidget infer="Other" />,
  info: <IconWidget infer="RichText" />,
};

export const DragPanel: React.FC = observer(() => {
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
          {typeData.map((m) => (
            <TabPane tab={<RenderTab icon={m.icon} name={m.name} />} key={m.id}>
              <PreviewItem data={m.children} />
            </TabPane>
          ))}
        </Tabs>
      </div>
      {/* <div className="toggle">
        <DoubleLeftOutlined className="toggle-icon" onClick={() => setCollapsed(!collapsed)} />
      </div> */}
    </div>
  );
});
