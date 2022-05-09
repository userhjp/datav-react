import { IWidgetMenuChild, IWidgetMenuChildData } from '../../../types';
import React, { useMemo, useState } from 'react';
import { DragItem } from './DragItem';
import { SettingsEmpty } from '../../../settings-form/components';
import './index.less';

type PreviewItemProps = {
  data: IWidgetMenuChild;
};
const PreviewItem: React.FC<PreviewItemProps> = (props) => {
  const [activate, setActivate] = useState('全部');
  const { data = [] } = props;
  const childrenData: IWidgetMenuChildData[] = useMemo(() => {
    return data.filter((f) => f['children']) as IWidgetMenuChildData[];
  }, data);

  const activateList = useMemo(() => {
    let menuData = [];
    if (childrenData.length > 0) {
      if (activate === '全部') {
        menuData = childrenData.reduce((total, currentValue) => [...total, ...currentValue.children], []);
      } else {
        menuData = childrenData.find((f) => f.name === activate).children;
      }
    } else {
      menuData = data || [];
    }
    menuData.sort((a, b) => a['sort'] - b['sort']);
    return menuData;
  }, [activate]);

  return (
    <div className={`tree-item ${childrenData.length > 0 ? 'twolevel-warp' : ''}`}>
      {childrenData.length > 0 && (
        <div className="classify-warp">
          <div key="all" className={`${activate === '全部' ? 'activate' : ''}`} onClick={() => setActivate('全部')}>
            全部
          </div>
          {childrenData.map((m, i) => (
            <div key={i} className={`${activate === m.name ? 'activate' : ''}`} onClick={() => setActivate(m.name)}>
              {m.name}
            </div>
          ))}
        </div>
      )}
      <div className="item-cont scoll-prettify">
        {activateList.length > 0 ? (
          activateList.map((m) => {
            return <DragItem key={m.name} {...m} />;
          })
        ) : (
          <SettingsEmpty title="暂无可用组件" />
        )}
      </div>
    </div>
  );
};
export default PreviewItem;
