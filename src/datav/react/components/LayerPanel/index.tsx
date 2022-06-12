import { Observer, observer } from '@formily/react';
import React, { useEffect, useRef } from 'react';
import { MoveSortType, PanelType } from '../../../shared';
import { ContextMenu } from '../ContextMenu';
import { Input } from 'antd';
import { useSelection, useOperation, useToolbar } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { WidgetNode } from '@/datav/core';
import './index.less';

export const LayerPanel: React.FC = observer(() => {
  const selection = useSelection();
  const operation = useOperation();
  const toolbar = useToolbar();
  const iptRef = useRef<any>();

  const RenderState = ({ value }: { value: WidgetNode }) => (
    <Observer>
      {() => {
        return (
          <>
            {value.attr.isHide && (
              <IconWidget
                infer="Eye"
                className="com-icon-hover"
                onClick={(e) => {
                  e.stopPropagation();
                  operation.hideCom(value.id, false);
                }}
              />
            )}
            {value.attr.isLock && !value.attr.isHide && (
              <IconWidget
                className="com-icon-hover"
                infer="lock"
                onClick={(e) => {
                  e.stopPropagation();
                  operation.lockCom(value.id, false);
                }}
              />
            )}
          </>
        );
      }}
    </Observer>
  );

  const changeLayerPanel = () => {
    toolbar.setPanelState({ type: PanelType.layer, value: !toolbar.layer.show });
  };

  useEffect(() => {
    if (iptRef.current && operation.editableId) {
      iptRef.current!.focus({
        cursor: 'end',
      });
    }
  }, [operation.editableId]);

  return (
    <div className={`layer-sidebar ${toolbar.layer.show ? '' : 'collapsed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-head">
          <div>图层</div>
          {toolbar.layer.show && <IconWidget infer="LeftArrow" className="toggle-icon" onClick={changeLayerPanel} />}
        </div>
        <div className={`btn-icon ${selection.length ? 'hovered' : ''}`}>
          <IconWidget title="上移一层" infer="MoveUp" onClick={() => operation.sortComp(MoveSortType.up, selection.first)} />
          <IconWidget title="下移一层" infer="MoveDown" onClick={() => operation.sortComp(MoveSortType.down, selection.first)} />
          <IconWidget title="置顶" infer="ZhiDing" onClick={() => operation.sortComp(MoveSortType.top, selection.first)} />
          <IconWidget title="置底" infer="ZhiDi" onClick={() => operation.sortComp(MoveSortType.bottom, selection.first)} />
        </div>
        <div className="com-list scoll-prettify">
          {operation.components.map((item, i) => (
            <ContextMenu key={item.id} currentId={item.id}>
              <div
                className={`com-item ${selection.has(item.id) ? 'selectd' : ''}`}
                {...{
                  [operation.engine.props.outlineNodeIdAttrName]: item.id,
                  [operation.engine.props.contentEditableAttrName]: item.id,
                }}
              >
                <IconWidget
                  className="com-icon"
                  infer="Title"
                  style={{ color: item.attr.isHide ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.85)' }}
                />
                {operation.editableId === item.id ? (
                  <Input
                    ref={iptRef}
                    className="rename-input"
                    placeholder="请输入"
                    defaultValue={item.info.name}
                    bordered={false}
                    onChange={(e) => {
                      item.info.name = e.target.value;
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onKeyUp={(e) => {
                      if (e.code === 'Enter') {
                        operation.cancelRename();
                      }
                    }}
                  />
                ) : (
                  <div style={{ display: 'flex', flex: 1 }}>
                    <span
                      style={{ flex: 1, color: item.attr.isHide ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.85)' }}
                      className="com-name"
                    >
                      {item.info?.name}
                    </span>
                    <div />
                    <RenderState value={item} />
                  </div>
                )}
              </div>
            </ContextMenu>
          ))}
        </div>
      </div>
    </div>
  );
});
