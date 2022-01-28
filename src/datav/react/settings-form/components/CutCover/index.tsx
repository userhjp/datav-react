import rcUpload from '../../rc-upload';
import { message, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import html2canvas from 'html2canvas';
import React, { useContext, useRef, useState } from 'react';
import { IconWidget } from '@/datav/react/components';
import './index.less';
import { SettingsFormContext } from '../../context';

type CutCoverProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CutCover: React.FC<CutCoverProps> = ({ value, onChange }) => {
  const [fileList, setFileList] = useState([]);
  const [base64Url, setBase64Url] = useState('');
  const context = useContext(SettingsFormContext);
  const loading = useRef(false);

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
      return;
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

  const cutCover = async () => {
    const dom = document.getElementById('canvas-coms');
    if (!dom || loading.current) {
      return;
    }

    const { transform } = dom.style;
    dom.style.transform = 'scale(1) translate(0px, 0px)';
    loading.current = true;
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

        dom.style.transform = transform;
        const base64Url = res.toDataURL('image/jpeg', 0.8);
        setBase64Url(base64Url);
        message.success('截取成功');
        // await uploadCover(dataURLtoBlob(res.toDataURL('image/jpeg', 0.8)));
      } catch (error) {
        message.error(error.toString());
      } finally {
        loading.current = false;
      }
    }, 500);
  };

  const delImg = () => {
    setBase64Url('');
  };

  return (
    <div className="item-cutcover">
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
        {(base64Url || fileList[0]) && (
          <>
            <img src={base64Url || fileList[0]} alt="" />
            <div className="del-cover" onClick={delImg}>
              <IconWidget infer="Delete" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
