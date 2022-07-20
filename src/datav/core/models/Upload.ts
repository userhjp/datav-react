import { observable, define, action } from '@formily/reactive';
import { Engine } from './Engine';

export type IDvFile = {
  id: string;
  url: string;
  path: number;
};

export interface IDvUploadProps {
  fileList?: IDvFile[];
}

export class DvUpload {
  fileList: IDvFile[];
  engine: Engine;
  constructor(fileList?: IDvFile[]) {
    this.fileList = fileList || [];
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
    this.fileList = [...this.fileList, item];
  }

  async removeFile(item: IDvFile) {
    this.engine.toolbar.addLoading();
    const handle = await this.engine.props.removeFile(item);
    this.engine.toolbar.removeLoading();
    if (handle === false) return;
    this.fileList = this.fileList.filter((f) => f.id !== item.id);
  }
}
