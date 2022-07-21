import { observable, define, action } from '@formily/reactive';
import { Engine } from './Engine';

export type IDvFile = {
  id: string;
  url: string;
  path: number;
};

export interface IDvUploadProps {
  fileList?: IDvFile[];
  engine: Engine;
  uploadAction?: string;
}

export class DvUpload {
  uploadAction: string;
  fileList: IDvFile[];
  engine: Engine;
  constructor(props: IDvUploadProps) {
    this.fileList = props.fileList || [];
    this.engine = props.engine;
    this.uploadAction = props.uploadAction || '';
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      fileList: observable.ref,
      removeFile: action,
      addFile: action,
    });
  }

  setFileList(list: IDvFile[]) {
    this.fileList = list || [];
  }

  addFile(item: IDvFile) {
    this.fileList = [item, ...this.fileList];
  }

  upload() {}

  async removeFile(item: IDvFile) {
    this.engine.toolbar.addLoading();
    const handle = await this.engine.props?.removeFile(item);
    this.engine.toolbar.removeLoading();
    if (handle === false) return;
    this.fileList = this.fileList.filter((f) => f.id !== item.id);
  }
}
