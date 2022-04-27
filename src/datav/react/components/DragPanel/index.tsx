import { observer } from '@formily/react';
import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { PanelType } from '../../../shared';
import { useToolbar } from '../../hooks';
import PreviewItem from './PreviewItem';
import { IconWidget } from '../IconWidget';
import { IWidgetMenuChildData, IWidgetMenu } from '../../types';
import { GlobalRegistry } from '@/datav/core/registry';
import './index.less';

const { TabPane } = Tabs;

const icons = {
  chart: <IconWidget infer="Chart" />,
  map: <IconWidget infer="Map" />,
  media: <IconWidget infer="Media" />,
  other: <IconWidget infer="Other" />,
  info: <IconWidget infer="RichText" />,
};

export const DragPanel: React.FC<{ widgetMenu: IWidgetMenu[] }> = observer(({ widgetMenu }) => {
  const toolbar = useToolbar();
  const [treeData, setTreeData] = useState([]);
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

  useEffect(() => {
    const widgets = GlobalRegistry.getDesignerWidgets();
    Object.entries(widgets).forEach(([compName, m]) => {
      const { DnConfig } = m;
      const paths: string[] = (DnConfig.taxonPath || '').split('.').slice(0, 3);
      if (paths.length < 2) return;
      const live1 = widgetMenu.find((f) => f.name === paths[0]);
      if (!live1) return;
      live1.children = live1.children || [];
      const componentName = (paths as any[]).pop();
      const opt = {
        name: componentName,
        cover: DnConfig.cover,
        type: compName,
        dnConfig: DnConfig,
      };
      if (paths.length === 1) {
        live1.children.push(opt);
      } else {
        const live2 = live1.children.find((f) => f.name === paths[1]) as IWidgetMenuChildData;
        if (live2) {
          live2.children.push(opt);
        } else {
          live1.children.push({
            name: paths[1],
            children: [opt],
          });
        }
      }
    });
    setTreeData(widgetMenu);
  }, []);

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
          {treeData.length > 0 &&
            treeData.map((m, i) => (
              <TabPane tab={<RenderTab icon={m.icon} name={m.name} />} key={i}>
                <PreviewItem data={m.children} />
              </TabPane>
            ))}
        </Tabs>
      </div>
    </div>
  );
});
