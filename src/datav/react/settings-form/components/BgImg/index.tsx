import rcUpload from '../../rc-upload';
import { Input } from '@formily/antd';
import { Upload, message, Modal, Divider } from 'antd';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';
import React, { useContext, useEffect, useState } from 'react';
import { IconWidget } from '../../../components';
import './index.less';
import { SettingsFormContext } from '../../context';

const { Dragger } = Upload;

type BgImgProps = {
  value: string;
  onChange: (val: string) => void;
};

export const BgImg: React.FC<BgImgProps> = (props) => {
  const { onChange, value } = props;
  const context = useContext(SettingsFormContext);
  const [fileList, setFileList] = useState([]);

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
      message.error('上传失败，请稍后再试');
    }
    if (status === 'removed' || status === 'done') {
      const newFiles: any[] = filelist.filter((f) => !f.error && f.url).map((m) => m.url);
      if (onChange) onChange(newFiles[0] || '');
    }
    setFileList(filelist);
  };

  const valueChange = (url: string) => {
    onChange(url);
    if (url) {
      const filename = url.substring(url.lastIndexOf('/') + 1).toLowerCase();
      const fullUrl = !url.startsWith('https://') && !url.startsWith('http://') ? context.uploadAction + url : url;
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

  /** 删除图片 */
  const deleteImage = () => {
    onChange('');
  };

  return (
    <div className="bg-img" onClick={(e) => e.stopPropagation()}>
      <Input {...props} onChange={(e) => valueChange(e.target.value)} />
      <div>
        <Dragger
          accept="image/*"
          action={context.uploadAction}
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
              <img src={value} className="image-value" />
              <div className="upload-cover">
                <div className="upload-del-btn">
                  <span>更改</span>
                  <Divider type="vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} />
                  <span
                    onClick={(e) => {
                      deleteImage();
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
    </div>
  );
};
