import rcUpload from '../../rc-upload';
import { Divider, message, Modal, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import html2canvas from 'html2canvas';
import React, { useRef, useState } from 'react';
import { IconWidget } from '../../../components';
import { useDvUpload, useScreen, useToolbar } from '@/datav/react/hooks';
import { observer } from '@formily/react';
import './index.less';

type CutCoverProps = {
  value: string;
  uploadAction?: string;
  onChange: (value: string) => void;
};

// 将base64转换为blob
function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// 将blob转换为file
function blobToFile(theBlob: Blob) {
  theBlob['lastModifiedDate'] = new Date();
  return theBlob;
}

export const CutCover: React.FC<CutCoverProps> = observer(({ value, onChange, uploadAction }) => {
  const screen = useScreen();
  const toolbar = useToolbar();
  const dvUpload = useDvUpload();
  const loading = useRef(false);
  const uploadRef = useRef<UploadFile>();
  const [showModal, setShowModal] = useState(false);

  const data = {
    id: screen.id || '',
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
      return;
    }
    if (status === 'done') {
      const newFiles: any[] = filelist.filter((f) => !f.error && f.url).map((m) => m.url);
      if (onChange) onChange(`${newFiles[0]}?t=${Date.now()}` || '');
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
        const base64Url = res.toDataURL('image/png', 0.8);
        const file = blobToFile(dataURLtoBlob(base64Url));
        rcUpload({
          data,
          filename: 'cover.png',
          file,
          action: uploadAction || dvUpload.uploadAction,
          method: 'POST',
          onSuccess: (res) => {
            onChange(`${res.url}?t=${Date.now()}`);
            message.success({
              content: '截取成功',
              className: 'dv-message-class',
            });
            loading.current = false;
            toolbar.removeLoading();
          },
          onError: (res) => {
            message.error({
              content: '图片上传失败',
              className: 'dv-message-class',
            });
            loading.current = false;
            toolbar.removeLoading();
          },
          onProgress: (res) => {},
        });
        // onChange(base64Url);
      } catch (error) {
        message.error({
          content: error.toString(),
          className: 'dv-message-class',
        });
      } finally {
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
          ref={uploadRef}
          accept="image/*"
          className="btn"
          name="file"
          maxCount={1}
          showUploadList={false}
          data={data}
          action={uploadAction || dvUpload.uploadAction}
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
        open={showModal}
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
});
