import { Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';
import { MoveSortType } from '@/datav/shared';
import { useSelection, useOperation } from '@/datav/react/hooks';
import { IconWidget } from '../IconWidget';
import './index.less';

export const ContextMenu: React.FC<{ currentId: string }> = ({ currentId, children }) => {
  const selection = useSelection();
  const operation = useOperation();

  const moveUp = () => operation.sortComp(MoveSortType.up);
  const moveDown = () => operation.sortComp(MoveSortType.down);
  const moveTop = () => operation.sortComp(MoveSortType.top);
  const moveBottom = () => operation.sortComp(MoveSortType.bottom);
  const copyComp = () => operation.copyCompSchema(currentId || selection.first);
  const removeComp = () => operation.removeCompSchema(currentId || selection.first);
  const rename = () => operation.rename(currentId || selection.first);

  const menu = useMemo(
    () => (
      <Menu style={{ minWidth: 100, padding: 0 }} onMouseDown={(e) => e.stopPropagation()}>
        <Menu.Item key="1" onClick={moveTop}>
          <IconWidget infer="ZhiDing" />
          &nbsp; 置顶
        </Menu.Item>
        <Menu.Item key="2" onClick={moveBottom}>
          <IconWidget infer="ZhiDi" />
          &nbsp; 置底
        </Menu.Item>
        <Menu.Item key="3" onClick={moveUp}>
          <IconWidget infer="MoveUp" />
          &nbsp; 上移一层
        </Menu.Item>
        <Menu.Item key="4" onClick={moveDown}>
          <IconWidget infer="MoveDown" />
          &nbsp; 下移一层
        </Menu.Item>
        <Menu.Divider style={{ backgroundColor: '#3a4659', margin: 0 }} />
        <Menu.Item key="5" onClick={rename}>
          <IconWidget infer="Edit" />
          &nbsp; 重命名
        </Menu.Item>
        <Menu.Item key="6" onClick={copyComp}>
          <IconWidget infer="Copy" />
          &nbsp; 复制
        </Menu.Item>
        <Menu.Item key="7" onClick={removeComp}>
          <IconWidget infer="Delete" />
          &nbsp; 删除
        </Menu.Item>
        <Menu.Item key="8" onClick={() => {}}>
          <IconWidget infer="Export" />
          &nbsp; 导出
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <Dropdown overlay={menu} trigger={['contextMenu']} overlayClassName="context-menu-weidget">
      {children}
    </Dropdown>
  );
};
