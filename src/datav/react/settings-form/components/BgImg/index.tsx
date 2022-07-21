import rcUpload from '../../rc-upload';
import { Input } from '@formily/antd';
import { Upload, message, Divider, Modal } from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import { IconWidget } from '../../../components';
import './index.less';
import { useDvUpload } from '@/datav/react/hooks';

const { Dragger } = Upload;

type BgImgProps = {
  value: string;
  onChange: (val: string) => void;
};

export const BgImg: React.FC<BgImgProps> = (props) => {
  const { onChange, value } = props;
  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const dvUpload = useDvUpload();

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
      onChange?.(newFiles[0]?.url || '');
      if (newFiles[0]?.response) dvUpload.addFile(newFiles[0].response);
    }
    setFileList(filelist);
  };

  const valueChange = (url: string) => {
    onChange(url);
    if (url) {
      const filename = url.substring(url.lastIndexOf('/') + 1).toLowerCase();
      const fullUrl = !url.startsWith('https://') && !url.startsWith('http://') ? dvUpload.uploadAction + url : url;
      setFileList([
        {
          uid: 1,
          name: filename,
          status: 'done',
          url,
          fullUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
  };

  return (
    <div className="bg-img" onClick={(e) => e.stopPropagation()}>
      <Input {...props} onChange={(e) => valueChange(e.target.value)} />
      <div>
        <Dragger
          accept="image/*"
          action={dvUpload.uploadAction}
          fileList={fileList}
          defaultFileList={fileList}
          maxCount={1}
          onChange={handleChange}
          showUploadList={false}
          listType={'picture-card'}
          customRequest={rcUpload}
        >
          {value ? (
            <div className="image-show">
              <img src={value} />
              <div className="upload-cover">
                <div className="upload-btn">
                  <span
                    onClick={(e) => {
                      setShowModal(true);
                      e.stopPropagation();
                    }}
                  >
                    预览
                  </span>
                  <Divider type="vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} />
                  <span>更改</span>
                  <Divider type="vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} />
                  <span
                    onClick={(e) => {
                      onChange('');
                      e.stopPropagation();
                    }}
                  >
                    删除
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="noimg-cover">
              <p className="upload-drag-icon">
                <IconWidget
                  infer="Inbox"
                  style={{
                    fontSize: 28,
                    color: '#999',
                  }}
                />
              </p>
              <p className="upload-text">点击或拖拽文件到这里上传</p>
            </div>
          )}
        </Dragger>
      </div>
      <Modal
        closeIcon={<IconWidget infer="Close" style={{ color: '#fff' }} />}
        visible={showModal}
        bodyStyle={{ padding: 12, background: '#2a2e33' }}
        footer={null}
        width={800}
        onCancel={() => setShowModal(false)}
      >
        <div style={{ color: '#fff' }}>图片预览</div>
        <Divider style={{ margin: '12px 0', borderColor: 'rgb(68 72 76)' }} />
        <div className="preview-img">
          <img src={value} className="image-value" />
        </div>
      </Modal>
    </div>
  );
};
