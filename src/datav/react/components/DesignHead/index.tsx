import { observer } from '@formily/react';
import { Badge, Dropdown, Menu, Space, Tooltip } from 'antd';
import React, { useRef } from 'react';
import { PanelType } from '../../../shared';
import { useCursor, useOperation, useDesigner, useToolbar, useSelection, useScreen } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { CursorType, Engine } from '../../../core';
import { PublishClickEvent, SnapshotClickEvent, PreviewClickEvent } from '../../../core/events';
import { IconPreview } from './IconPreview';
import { HelpPreview } from './HelpPreview';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { Expression } from './Expression';
import { Snapshot } from './Snapshot';
import './index.less';

export const useButtonEffect = (engine: Engine) => {
  engine.subscribeTo(PublishClickEvent, (event) => {
    if (!engine.props.onPublish) return;
    const handle = engine.props.onPublish(event.data);
    if (handle instanceof Promise) {
      engine.toolbar.addLoading();
      handle.finally(() => {
        engine.toolbar.removeLoading();
      });
    }
  });

  engine.subscribeTo(SnapshotClickEvent, (event) => {
    if (!engine.props.onSnapshot) return;
    const handle = engine.props.onSnapshot(event.data);
    if (handle instanceof Promise) {
      engine.toolbar.addLoading();
      handle.finally(() => {
        engine.toolbar.removeLoading();
      });
    }
  });

  engine.subscribeTo(PreviewClickEvent, (event) => {
    if (!engine.props.onPreview) return;
    const handle = engine.props.onPreview(event.data);
    if (handle instanceof Promise) {
      engine.toolbar.addLoading();
      handle.finally(() => {
        engine.toolbar.removeLoading();
      });
    }
  });
};

export const DesignHead: React.FC = observer(() => {
  const toolbar = useToolbar();
  const cursor = useCursor();
  const operation = useOperation();
  const screen = useScreen();
  useDesigner((engine) => {
    useButtonEffect(engine);
  });

  return (
    <>
      <div className="design-head">
        <div>
          <Space size={4} className="head-btn-group">
            <div className="head-title" onClick={() => {}}>
              <a style={{ color: '#fff' }}>可视化设计器</a>
            </div>

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'图层'}>
              <div
                className={`head-btn ${toolbar.layer.show ? 'selected' : ''}`}
                onClick={() => toolbar.setPanelState({ type: PanelType.layer, value: !toolbar.layer.show })}
              >
                <IconWidget infer="LayerSidebar" style={{ color: '#fff' }} />
              </div>
            </Tooltip>

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'组件列表'}>
              <div
                className={`head-btn ${toolbar.components.show ? 'selected' : ''}`}
                onClick={() => toolbar.setPanelState({ type: PanelType.components, value: !toolbar.components.show })}
              >
                <IconWidget className={`${toolbar.components.show ? '' : 'rotate'}`} infer="ComponentSidebar" style={{ color: '#fff' }} />
              </div>
            </Tooltip>

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'右侧面板'}>
              <div
                className={`head-btn ${toolbar.config.show ? 'selected' : ''}`}
                onClick={() => toolbar.setPanelState({ type: PanelType.config, value: !toolbar.config.show })}
              >
                <IconWidget infer="RightSidebar" style={{ color: '#fff' }} />
              </div>
            </Tooltip>

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'工具箱'}>
              <div
                className={`head-btn ${toolbar.toolbox.show ? 'selected' : ''}`}
                onClick={() => toolbar.setPanelState({ type: PanelType.toolbox, value: !toolbar.toolbox.show })}
              >
                <IconWidget infer="ToolBar" style={{ color: '#fff' }} />
              </div>
            </Tooltip>

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'多选'}>
              <div
                className={`head-btn ${cursor.type === CursorType.Selection ? 'selected' : ''}`}
                onClick={() => {
                  if (cursor.type === CursorType.Selection) {
                    cursor.setType(CursorType.Normal);
                  } else {
                    cursor.setType(CursorType.Selection);
                  }
                }}
              >
                <IconWidget infer="Selection" style={{ color: '#fff' }} />
              </div>
            </Tooltip>
            <IconPreview />
          </Space>
        </div>
        <div
          style={{ color: '#c7c6c6', fontSize: 13, cursor: 'pointer', textAlign: 'center' }}
          onClick={() => {
            // navigate('/datav')
          }}
        >
          <IconWidget infer="Desktop" style={{ color: '#fff' }} />
          &nbsp; {screen.title || '工作空间'}
        </div>
        <div>
          <Space size={4} className="head-btn-group">
            <div style={{ display: 'flex' }}>
              <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'生成快照'}>
                <div className="head-btn" onClick={() => operation.onOperationBtn('snapshot')}>
                  <IconWidget infer="Snapshot" />
                </div>
              </Tooltip>
              <Snapshot />
            </div>

            <Expression />

            <HelpPreview />

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'发布'}>
              <div className="head-btn" onClick={() => operation.onOperationBtn('publish')}>
                <IconWidget infer="Publish" style={{ color: '#fff' }} />
              </div>
            </Tooltip>

            <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'预览'}>
              <div className="head-btn" onClick={() => operation.onOperationBtn('preview')}>
                <IconWidget infer="Preview" style={{ color: '#fff' }} />
              </div>
            </Tooltip>
            <DvError />
          </Space>
        </div>
      </div>
      <div className={`head-loading ${toolbar.loading ? 'loading' : ''}`} />
    </>
  );
});

const DvError: React.FC = observer(() => {
  const domRef = useRef<HTMLDivElement>();
  const operation = useOperation();
  const selection = useSelection();
  const menuList: ItemType[] = operation.errors.map(({ id, errorInfo }) => {
    return {
      key: id,
      label: (
        <div className="dv-error-item">
          <a onClick={() => selection.safeSelect(id)}>ID：{id}</a>
          <div>异常类型：{errorInfo.title}</div>
          <div>异常信息：{errorInfo.content}</div>
        </div>
      ),
    };
  });
  return (
    <div ref={domRef} className="dv-error-container">
      {menuList.length < 1 ? (
        <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottomRight" title={'无组件异常'}>
          <div className="head-btn">
            <IconWidget infer="Warning" style={{ color: '#fff' }} />
          </div>
        </Tooltip>
      ) : (
        <Dropdown overlay={<Menu items={menuList} />} getPopupContainer={() => domRef.current}>
          <div className="head-btn" onClick={() => {}}>
            <Badge dot>
              <IconWidget infer="Warning" style={{ color: '#fff', fontSize: 15 }} />
            </Badge>
          </div>
        </Dropdown>
      )}
    </div>
  );
});
