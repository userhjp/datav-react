import React, { useState } from 'react';
import { Button, Divider, message, Modal, Tooltip, Upload } from 'antd';
import { IconWidget } from '../IconWidget/index';
import { copyText } from '@/datav/shared';
import { useDvUpload } from '../../hooks';
import { IDvFile } from '@/datav/core/models/Upload';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { observer } from '@formily/react';
import rcUpload from '../../settings-form/rc-upload';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';

/** 设计器上传附件管理 */
export const ImagePreview: React.FC = observer(() => {
  const dvUpload = useDvUpload();
  const [isModalVisible, setisModalVisible] = useState(false);

  const del = (item: IDvFile) => {
    Modal.confirm({
      wrapClassName: 'dv-modal-confirm',
      title: '确认删除该图片吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，请谨慎操作！',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => dvUpload.removeFile(item),
      onCancel: () => {},
    });
  };

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const filelist = info.fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    const { status } = info.file;
    if (status === 'error') {
      message.error({
        content: '上传失败，请稍后再试',
        className: 'dv-message-class',
      });
    }
    if (status === 'done') {
      const newFiles: any[] = filelist.filter((f) => !f.error && f.url);
      if (newFiles[0]?.response) dvUpload.addFile(newFiles[0].response);
    }
  };
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
        <div style={{ color: '#fff' }}>
          图库
          <Upload
            className="dv-upload-btn"
            showUploadList={false}
            accept="image/*"
            maxCount={1}
            action={dvUpload.uploadAction}
            onChange={handleChange}
            customRequest={rcUpload}
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </div>
        <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} />

        <div className="dv-image-preview-container scoll-prettify">
          {dvUpload.fileList.map((m) => {
            return (
              <div key={m.id} className="dv-image-preview-item">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <img src={m.url} alt="" />
                  <div className="upload-cover">
                    <div className="upload-btn">
                      <IconWidget
                        infer="CopyLink"
                        title="复制链接"
                        onClick={() => {
                          copyText(m.url);
                          message.success({
                            content: '已复制到剪贴板',
                            className: 'dv-message-class',
                          });
                        }}
                      />
                      &nbsp;
                      <IconWidget infer="Delete" title="删除" onClick={() => del(m)} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <Tooltip overlayClassName="design-tip" color="#2681ff" placement="bottom" title={'图库'}>
        <div className={`head-btn`} onClick={() => setisModalVisible(true)}>
          <IconWidget infer="Image" style={{ color: '#fff' }} />
        </div>
      </Tooltip>
    </div>
  );
});
