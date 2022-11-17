import { Observer } from '@formily/react';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useRef } from 'react';
import { MoveSortType } from '../../../shared';
import { useOperation } from '../../hooks';
import { IconWidget } from '../IconWidget';
import './index.less';

export const ContextMenu: React.FC<{ currentId: string; children: React.ReactNode }> = ({ currentId, children }) => {
  const operation = useOperation();
  const com = operation.findById(currentId);
  const currentMouseRef = useRef({ x: 0, y: 0 });

  const moveUp = () => operation.sortComp(MoveSortType.up, currentId);
  const moveDown = () => operation.sortComp(MoveSortType.down, currentId);
  const moveTop = () => operation.sortComp(MoveSortType.top, currentId);
  const moveBottom = () => operation.sortComp(MoveSortType.bottom, currentId);
  const copyComp = () => operation.copyCompSchema(currentId);
  const removeComp = () => operation.removeCompSchema(currentId);
  const rename = () => operation.rename(currentId);
  const lockCom = (lockCom: boolean) => operation.lockCom(currentId, lockCom);
  const hideCom = (hideCom: boolean) => operation.hideCom(currentId, hideCom);

  const menuList: ItemType[] = [
    {
      key: '1',
      label: (
        <span>
          <IconWidget infer="ZhiDing" />
          &nbsp; 置顶
        </span>
      ),
      onClick: moveTop,
    },
    {
      key: '2',
      label: (
        <span>
          <IconWidget infer="ZhiDi" />
          &nbsp; 置底
        </span>
      ),
      onClick: moveBottom,
    },
    {
      key: '3',
      label: (
        <span>
          <IconWidget infer="MoveUp" />
          &nbsp; 上移一层
        </span>
      ),
      onClick: moveUp,
    },
    {
      key: '4',
      label: (
        <span key="4">
          <IconWidget infer="MoveDown" />
          &nbsp; 下移一层
        </span>
      ),
      onClick: moveDown,
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <Observer>
          {() => (
            <span>
              <IconWidget infer="lock" />
              &nbsp; {com.isLock ? '解锁' : '锁定'}
            </span>
          )}
        </Observer>
      ),
      onClick: () => lockCom(!com.isLock),
    },
    {
      key: '6',
      label: (
        <Observer>
          {() => (
            <span>
              <IconWidget infer={com.isHide ? 'Eye' : 'EyeClose'} />
              &nbsp; {com.isHide ? '显示' : '隐藏'}
            </span>
          )}
        </Observer>
      ),
      onClick: () => hideCom(!com.isHide),
    },
    {
      type: 'divider',
    },
    {
      key: '7',
      label: (
        <span>
          <IconWidget infer="Edit" />
          &nbsp; 重命名
        </span>
      ),
      onClick: rename,
    },
    {
      key: '8',
      label: (
        <span>
          <IconWidget infer="Copy" />
          &nbsp; 复制
        </span>
      ),
      onClick: copyComp,
    },
    {
      type: 'divider',
    },
    {
      key: '9',
      label: (
        <span>
          <IconWidget infer="Clone" />
          &nbsp; 复制到剪贴板
        </span>
      ),
      onClick: () => {
        operation.copeClipboard(com.id);
      },
    },
    {
      key: '111',
      label: (
        <span>
          <IconWidget infer="Paste" />
          &nbsp; 粘贴剪贴板组件
        </span>
      ),
      onClick: async (e) => {
        operation.pasteClipboard(currentMouseRef.current.x, currentMouseRef.current.y);
      },
    },
    {
      key: '10',
      label: (
        <span>
          <IconWidget infer="Delete" />
          &nbsp; 删除
        </span>
      ),
      onClick: removeComp,
    },
  ];

  return (
    <Dropdown
      destroyPopupOnHide
      menu={{ items: menuList }}
      trigger={['contextMenu']}
      overlayClassName="context-menu-weidget"
      onOpenChange={(e) => {
        if (e) {
          currentMouseRef.current = {
            x: operation.engine.cursor.position.clientX,
            y: operation.engine.cursor.position.clientY,
          };
        }
      }}
    >
      {children}
    </Dropdown>
  );
};
