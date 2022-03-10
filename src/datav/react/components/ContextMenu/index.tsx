import { Observer } from '@formily/react';
import { Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';
import { MoveSortType } from '../../../shared';
import { useOperation } from '../../hooks';
import { IconWidget } from '../IconWidget';
import './index.less';

export const ContextMenu: React.FC<{ currentId: string }> = ({ currentId, children }) => {
  const operation = useOperation();
  const com = operation.findById(currentId);

  const moveUp = () => operation.sortComp(MoveSortType.up);
  const moveDown = () => operation.sortComp(MoveSortType.down);
  const moveTop = () => operation.sortComp(MoveSortType.top);
  const moveBottom = () => operation.sortComp(MoveSortType.bottom);
  const copyComp = () => operation.copyCompSchema(currentId);
  const removeComp = () => operation.removeCompSchema(currentId);
  const rename = () => operation.rename(currentId);
  const lockCom = (lockCom: boolean) => operation.lockCom(currentId, lockCom);
  const hideCom = (hideCom: boolean) => operation.hideCom(currentId, hideCom);

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
        <Menu.Item key="5" onClick={() => lockCom(!com.attr.isLock)}>
          <Observer>
            {() => {
              return (
                <>
                  <IconWidget infer="ZhiDing" />
                  &nbsp; {com.attr.isLock ? '解锁' : '锁定'}
                </>
              );
            }}
          </Observer>
        </Menu.Item>
        <Menu.Item key="6" onClick={() => hideCom(!com.attr.isHide)}>
          <Observer>
            <IconWidget infer="EyeClose" />
            &nbsp; 隐藏
          </Observer>
        </Menu.Item>
        <Menu.Divider style={{ backgroundColor: '#3a4659', margin: 0 }} />
        <Menu.Item key="7" onClick={rename}>
          <IconWidget infer="Edit" />
          &nbsp; 重命名
        </Menu.Item>
        <Menu.Item key="8" onClick={copyComp}>
          <IconWidget infer="Copy" />
          &nbsp; 复制
        </Menu.Item>
        <Menu.Item key="9" onClick={removeComp}>
          <IconWidget infer="Delete" />
          &nbsp; 删除
        </Menu.Item>
        {/* <Menu.Item key="8" onClick={() => {}}>
          <IconWidget infer="Export" />
          &nbsp; 导出
        </Menu.Item> */}
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
