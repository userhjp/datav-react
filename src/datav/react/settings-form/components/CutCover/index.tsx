import rcUpload from '../../rc-upload';
import { Divider, message, Modal, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import html2canvas from 'html2canvas';
import React, { useContext, useRef, useState } from 'react';
import { IconWidget } from '../../../components';
import { SettingsFormContext } from '../../context';
import { useToolbar } from '@/datav/react/hooks';
import './index.less';

type CutCoverProps = {
  value: string;
  onChange: (value: string) => void;
};

// 将base64转换为blob
// function dataURLtoBlob(dataurl) {
//   const arr = dataurl.split(',');
//   const mime = arr[0].match(/:(.*?);/)[1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new Blob([u8arr], { type: mime });
// }
// // 将blob转换为file
// function blobToFile(theBlob: Blob, fileName: string) {
//   theBlob['lastModifiedDate'] = new Date();
//   theBlob['name'] = fileName;
//   return theBlob;
// }

export const CutCover: React.FC<CutCoverProps> = ({ value, onChange }) => {
  const context = useContext(SettingsFormContext);
  const toolbar = useToolbar();
  const loading = useRef(false);
  const [showModal, setShowModal] = useState(false);

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
      return;
    }
    if (status === 'removed' || status === 'done') {
      const newFiles: any[] = filelist.filter((f) => !f.error && f.url).map((m) => m.url);
      if (onChange) onChange(newFiles[0] || '');
    }
  };

  const cutCover = () => {
    const elDiv: HTMLDivElement = document.createElement('div');
    const dom: any = document.querySelector('*[canvas-drawing=root]').cloneNode(true);
    if (!dom || loading.current) return;
    dom.style.transform = 'scale(1) translate(0px, 0px)';
    elDiv.appendChild(dom);
    const style: React.CSSProperties = {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: -1,
      opacity: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    };
    Object.entries(style).forEach(([key, val]) => {
      elDiv.style[key] = val;
    });
    loading.current = true;
    toolbar.addLoading();
    document.body.appendChild(elDiv);
    setTimeout(async () => {
      try {
        const res = await html2canvas(dom, {
          scale: 1.2,
          logging: false,
          useCORS: true,
          backgroundColor: null,
          scrollX: 0,
          scrollY: 0,
        });
        const base64Url = res.toDataURL('image/jpeg', 0.2);
        // const file = blobToFile(dataURLtoBlob(base64Url), 'thumbnail.jpeg');
        onChange(base64Url);
        message.success({
          content: '截取成功',
          className: 'dv-message-class',
        });
      } catch (error) {
        message.error({
          content: error.toString(),
          className: 'dv-message-class',
        });
      } finally {
        loading.current = false;
        toolbar.removeLoading();
        document.body.removeChild(elDiv);
      }
    }, 200);
  };

  return (
    <div className="cut-cover">
      <div className="btns">
        <div className="btn" onClick={cutCover}>
          截取封面
        </div>
        <Upload
          accept="image/*"
          className="btn"
          name="file"
          maxCount={1}
          showUploadList={false}
          action={context.uploadAction}
          customRequest={rcUpload}
          onChange={handleChange}
        >
          上传封面
        </Upload>
      </div>
      <div className="cover-con">
        {value && (
          <div className="image-show">
            <img src={value} />
            <div className="upload-cover">
              <div className="upload-btn">
                <span
                  onClick={(e) => {
                    setShowModal(true);
                  }}
                >
                  预览
                </span>
                <Divider type="vertical" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }} />
                <span onClick={() => onChange('')}>删除</span>
              </div>
            </div>
          </div>
        )}
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
