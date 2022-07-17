import { formatDate } from '@/utils';
import { observer } from '@formily/react';
import { Dropdown, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useRef } from 'react';
import { useSnapshot } from '../../hooks';
import { IconWidget } from '../IconWidget';

export const Snapshot: React.FC = observer(() => {
  const snapshot = useSnapshot();
  const domRef = useRef<HTMLDivElement>();

  const menuList: ItemType[] = snapshot.snapshotList.map(({ id, createtime }) => {
    return {
      key: id,
      label: (
        <div style={{ fontSize: 12 }} className="dv-snapshot-item">
          <div>
            快照 {formatDate(createtime, 'MM-dd HH:mm:ss')} <a onClick={() => {}}>&nbsp;加载</a>
          </div>
        </div>
      ),
    };
  });

  const noData: ItemType[] = [
    {
      key: 'nodata',
      label: <div style={{ padding: 0, fontSize: 12 }}>暂无快照</div>,
    },
  ];
  return (
    <div ref={domRef} className="dv-error-container">
      <Dropdown overlay={<Menu items={menuList.length ? menuList : noData} />} getPopupContainer={() => domRef.current}>
        <div className="head-btn" style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {}}>
          <IconWidget infer="Expand" style={{ color: '#fff', fontSize: 10, paddingBottom: 2 }} />
        </div>
      </Dropdown>
    </div>
  );
});
