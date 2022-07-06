import { WidgetNode } from '@/datav/core';
import { Observer } from '@formily/react';
import { Dropdown, Menu, message } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { copyText, generateUUID, MoveSortType } from '../../../shared';
import { useOperation } from '../../hooks';
import { IconWidget } from '../IconWidget';
import './index.less';

export const ContextMenu: React.FC<{ currentId: string }> = ({ currentId, children }) => {
  const operation = useOperation();
  const com = operation.findById(currentId);

  const moveUp = () => operation.sortComp(MoveSortType.up, currentId);
  const moveDown = () => operation.sortComp(MoveSortType.down, currentId);
  const moveTop = () => operation.sortComp(MoveSortType.top, currentId);
  const moveBottom = () => operation.sortComp(MoveSortType.bottom, currentId);
  const copyComp = () => operation.copyCompSchema(currentId);
  const removeComp = () => operation.removeCompSchema(currentId);
  const rename = () => operation.rename(currentId);
  const lockCom = (lockCom: boolean) => operation.lockCom(currentId, lockCom);
  const hideCom = (hideCom: boolean) => operation.hideCom(currentId, hideCom);
  const copyClipboard = () => {
    copyText(JSON.stringify(com));
    message.success({
      content: '已复制配置到剪贴板',
      className: 'dv-message-class',
    });
  };

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
      key: '9',
      label: (
        <span>
          <IconWidget infer="Clone" />
          &nbsp; 复制到剪贴板
        </span>
      ),
      onClick: copyClipboard,
    },
    {
      key: '111',
      label: (
        <span>
          <IconWidget infer="Clone" />
          &nbsp; 粘贴剪贴板组件
        </span>
      ),
      onClick: async (e) => {
        const dataStr = await navigator.clipboard.readText();
        try {
          const config: WidgetNode = JSON.parse(dataStr);
          config.attr.x = 0;
          config.attr.y = 0;
          config.id = generateUUID();
          operation.addNode(config);
        } catch (error) {
          message.error({
            content: '粘贴失败, 不是组件或配置有误',
            className: 'dv-message-class',
          });
        }
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
    <Dropdown destroyPopupOnHide overlay={<Menu items={menuList} />} trigger={['contextMenu']} overlayClassName="context-menu-weidget">
      {children}
    </Dropdown>
  );
};
