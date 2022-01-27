import React, { useMemo, useState } from 'react';
import { DragItem } from './DragItem';
import './index.less';

type ItemData = {
  id: string;
  name: string;
  type?: string;
  cover?: string;
  children?: ItemData[];
  [key: string]: any;
};

type PreviewItemProps = {
  data: ItemData[];
};
const PreviewItem: React.FC<PreviewItemProps> = (props) => {
  const [activate, setActivate] = useState('');
  const { data = [] } = props;

  const typeList = useMemo(() => {
    const hashObj = {};
    const typeList = [];
    data.forEach((f) => {
      if (!hashObj[f.id] && f.children) typeList.push(f);
    });
    typeList.unshift({
      id: '',
      name: '全部',
      type: '',
    });
    return typeList;
  }, data);

  const activateList = useMemo(() => {
    if (typeList.length > 1) {
      if (activate) {
        return data.find((f) => f.id === activate)?.children;
      } else {
        return data.reduce((total, currentValue) => [...total, ...currentValue.children], []);
      }
    } else {
      return data || [];
    }
  }, [activate]);

  return (
    <div className={`tree-item ${typeList.length > 1 ? 'twolevel-warp' : ''}`}>
      {typeList.length > 1 && (
        <div className="classify-warp">
          {typeList.map((m) => (
            <div key={m.id} className={`${activate === m.id ? 'activate' : ''}`} onClick={() => setActivate(m.id)}>
              {m.name}
            </div>
          ))}
        </div>
      )}
      <div className="item-cont scoll-prettify">
        {activateList.map((m) => {
          return <DragItem key={m.id} {...m} />;
        })}
      </div>
    </div>
  );
};
export default PreviewItem;
