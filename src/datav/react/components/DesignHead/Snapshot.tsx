import { ISnapshot } from '@/datav/core/models/Snapshot';
import { formatDate } from '@/utils';
import { observer } from '@formily/react';
import { Dropdown, Menu, Modal } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { useSnapshot } from '../../hooks';
import { IconWidget } from '../IconWidget';
import './styles.less';

export const Snapshot: React.FC = observer(() => {
  const snapshot = useSnapshot();
  const domRef = useRef<HTMLDivElement>();

  const del = (item: ISnapshot) => {
    Modal.confirm({
      wrapClassName: 'dv-modal-confirm',
      title: '确认删除该快照记录吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，请谨慎操作！',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => snapshot.removeSnapshot(item),
      onCancel: () => {},
    });
  };

  const recovery = (item: ISnapshot) => {
    Modal.confirm({
      wrapClassName: 'dv-modal-confirm',
      title: '确认恢复到该快照？',
      icon: <ExclamationCircleOutlined />,
      content: '覆盖当前大屏配置，请谨慎操作！',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => snapshot.recoverySnapshot(item),
      onCancel: () => {},
    });
  };

  const menuList: ItemType[] = snapshot.snapshotList.map((item) => {
    return {
      key: item.id,
      label: (
        <div style={{ fontSize: 12 }} className="dv-snapshot-item">
          <div>
            创建 {formatDate(item.createtime, 'MM-dd HH:mm:ss')} &nbsp;&nbsp;
            <IconWidget infer="Return" title="还原" onClick={() => recovery(item)} />
            &nbsp;&nbsp;
            <IconWidget infer="Delete" title="删除" onClick={() => del(item)} />
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
    <div ref={domRef} className="dv-snapshot-container">
      <Dropdown overlay={<Menu items={menuList.length ? menuList : noData} />} getPopupContainer={() => domRef.current}>
        <div className="head-btn" style={{ width: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {}}>
          <IconWidget infer="Expand" style={{ color: '#fff', fontSize: 10, paddingBottom: 2 }} />
        </div>
      </Dropdown>
    </div>
  );
});
