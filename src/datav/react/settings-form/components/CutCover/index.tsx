import rcUpload from '../../rc-upload';
import { message, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import html2canvas from 'html2canvas';
import React, { useContext, useRef, useState } from 'react';
import { IconWidget } from '@/datav/react/components';
import { SettingsFormContext } from '../../context';
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
  };

  const cutCover = () => {
    const dom: HTMLDivElement = document.querySelector('*[canvas-drawing=root]');
    if (!dom || loading.current) return;
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
        // const file = blobToFile(dataURLtoBlob(base64Url), 'thumbnail.jpeg');
        onChange(base64Url);
        message.success('截取成功');
      } catch (error) {
        message.error(error.toString());
      } finally {
        loading.current = false;
      }
    }, 500);
  };

  const delImg = () => {
    onChange('');
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
        {value && (
          <>
            <img src={value} alt="" />
            <div className="del-cover" onClick={delImg}>
              <IconWidget infer="Delete" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
