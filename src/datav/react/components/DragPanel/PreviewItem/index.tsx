import { IResourceDataChild, IResourceChildrenType } from '@/datav/react/types';
import React, { useMemo, useState } from 'react';
import { DragItem } from './DragItem';
import './index.less';

type PreviewItemProps = {
  data: IResourceDataChild;
};
const PreviewItem: React.FC<PreviewItemProps> = (props) => {
  const [activate, setActivate] = useState('全部');
  const { data = [] } = props;

  const childrenData: IResourceChildrenType[] = useMemo(() => {
    return data.filter((f) => f['children']) as IResourceChildrenType[];
  }, data);

  const activateList = useMemo(() => {
    if (childrenData.length > 1) {
      if (activate === '全部') {
        return childrenData.reduce((total, currentValue) => [...total, ...currentValue.children], []);
      } else {
        return childrenData.find((f) => f.name === activate).children;
      }
    } else {
      return data || [];
    }
  }, [activate]);

  return (
    <div className={`tree-item ${childrenData.length > 1 ? 'twolevel-warp' : ''}`}>
      {childrenData.length > 1 && (
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
        {activateList.map((m) => {
          return <DragItem key={m.name} {...m} />;
        })}
      </div>
    </div>
  );
};
export default PreviewItem;
