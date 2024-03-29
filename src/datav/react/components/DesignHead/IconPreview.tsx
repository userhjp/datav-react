import React, { useState } from 'react';
import * as icons from '../../icons';
import { Divider, message, Modal, Tooltip } from 'antd';
import { IconWidget } from '../IconWidget/index';
import { copyText } from '@/datav/shared';
const iconList = Object.keys(icons);

/** 开发时查看icon使用 */
export const IconPreview: React.FC = () => {
  const [isModalVisible, setisModalVisible] = useState(false);
  return (
    <div>
      <Modal
        closeIcon={<IconWidget infer="Close" style={{ color: '#fff' }} />}
        open={isModalVisible}
        bodyStyle={{ padding: 12, background: '#2a2e33' }}
        footer={null}
        width={800}
        onCancel={() => setisModalVisible(false)}
      >
        <div style={{ color: '#fff' }}>ICON（点击图标复制）</div>
        <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} />
        <div>
          {iconList.map((m) => {
            return (
              <a
                key={m}
                onClick={() => {
                  try {
                    copyText(`<IconWidget infer="${m}" />`);
                    message.success({
                      content: '已复制到剪贴板',
                      className: 'dv-message-class',
                    });
                  } catch (error) {
                    alert('复制失败');
                  }
                }}
              >
                <IconWidget infer={m} style={{ color: '#fff', fontSize: '20px', margin: '10px' }} />
              </a>
            );
          })}
        </div>
      </Modal>
      <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'查看ICON'}>
        <div className={`head-btn`} style={{ lineHeight: '20px' }} onClick={() => setisModalVisible(true)}>
          dev
        </div>
      </Tooltip>
    </div>
  );
};
