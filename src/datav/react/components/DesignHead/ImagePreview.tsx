import React, { useState } from 'react';
import { Divider, message, Modal, Tooltip } from 'antd';
import { IconWidget } from '../IconWidget/index';
import { copyText } from '@/datav/shared';
import { useDvUpload } from '../../hooks';

/** 设计器上传附件管理 */
export const ImagePreview: React.FC = () => {
  const upload = useDvUpload();
  const [isModalVisible, setisModalVisible] = useState(false);
  return (
    <div>
      <Modal
        closeIcon={<IconWidget infer="Close" style={{ color: '#fff' }} />}
        visible={isModalVisible}
        bodyStyle={{ padding: 12, background: '#2a2e33' }}
        footer={null}
        width={1000}
        onCancel={() => setisModalVisible(false)}
      >
        <div style={{ color: '#fff' }}>上传资源</div>
        <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} />
        <div className="dv-image-preview-container">
          {upload.fileList.map((m) => {
            return (
              <div key={m.id} className="dv-image-preview-item">
                <div
                  style={{ width: '100%', height: '100%', position: 'relative' }}
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
                  <img src={m.url} alt="" />
                  <div className="upload-cover">
                    <div className="upload-btn">
                      <Divider type="vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} />
                      <span>更改</span>
                      <Divider type="vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} />
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        删除
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'上传图片管理'}>
        <div className={`head-btn`} onClick={() => setisModalVisible(true)}>
          <IconWidget infer="Image" style={{ color: '#fff' }} />
        </div>
      </Tooltip>
    </div>
  );
};
