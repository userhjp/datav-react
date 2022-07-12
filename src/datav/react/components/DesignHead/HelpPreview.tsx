import React, { useState } from 'react';
import { Divider, Modal, Tooltip } from 'antd';
import { IconWidget } from '../IconWidget/index';
import './styles.less';

/** 帮助弹层 */
export const HelpPreview: React.FC = () => {
  const [isModalVisible, setisModalVisible] = useState(false);
  return (
    <div>
      <Modal
        closeIcon={<IconWidget infer="Close" style={{ color: '#fff' }} />}
        visible={isModalVisible}
        bodyStyle={{ padding: 12, background: '#2a2e33' }}
        footer={null}
        width={800}
        onCancel={() => setisModalVisible(false)}
      >
        <div style={{ color: '#fff' }}>设计器使用帮助</div>
        <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} />
        <div className="help-container">
          <div className="help-title">工具按钮</div>
          <ul>
            <li>图层：当前画布所有组件列表。</li>
            <li>组件列表：组件物料列表，拖拽组件到画布添加组件。</li>
            <li>右侧面板：组件配置面板，对组件属性，数据，交互等配置。</li>
            <li>工具箱：设计器参考线 对齐线 等开关。</li>
            <li>多选：需要时开启，默认关闭，框选完成后自动关闭(避免影响到组件正常拖拽)。</li>
          </ul>
          <div className="help-title">常用操作</div>
          <ul>
            <li>右键菜单：组件点击右键弹出操作菜单对组件进行操作。</li>
            <li>画布操作：按住 Space(空格键) 拖拽画布，按住 Ctrl键滚动鼠标调整画布缩放。</li>
            <li>组件位置：点击组件进行拖拽或选中组件后使用 ↑ → ↓ ← 按键进行微调移动，支持多选同时拖拽或移动。</li>
            <li>组件多选：按住 Ctrl 点击组件，或者使用框选工具进行多选。</li>
            <li>组件删除：使用 Delete 键或者右键菜单点击删除（删除当前所有选中组件）。</li>
            <li>组件复制：右键菜单点击复制按钮，复制当前所有选中组件</li>
            <li>
              <div className="dv-list-item">
                <div className="dv-list-item-label">复制到剪贴板：</div>
                <div className="dv-list-item-value">
                  选中组件后使用快捷键 Ctrl + C 或者 右键菜单点击复制到剪贴板。
                  <br />
                  注意：考虑到剪贴板内容量限制，每次只能拷贝单个组件到剪贴板。
                </div>
              </div>
            </li>
            <li>粘贴剪贴板组件：使用Ctrl + V 或 右键组件菜单粘贴剪贴板组件粘贴，支持跨页面粘贴。</li>
            <li>重命名组件：双击图层列表组件名称，或者右键菜单重命名按钮。</li>
            <li>锁定组件：右键菜单锁定按钮，锁定后组件无法进行选中和拖拽操作，点击解锁按钮或图层面板的解锁图标解锁。</li>
            <li>隐藏组件：右键菜单隐藏按钮，在图层面板点击显示图标显示组件。</li>
          </ul>
        </div>
      </Modal>
      <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'帮助'}>
        <div className={`head-btn`} onClick={() => setisModalVisible(true)}>
          <IconWidget infer="Help" style={{ color: '#fff' }} />
        </div>
      </Tooltip>
    </div>
  );
};
