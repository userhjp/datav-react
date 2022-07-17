import { observable, define, action } from '@formily/reactive';
import { Engine } from './Engine';
import { IPageType } from '@/datav/react';

type ISnapshot = {
  createtime: number;
  id: string;
  pid: string;
  updatetime: number;
  config?: IPageType;
};

export interface ISnapshotProps {
  engine: Engine;
  snapshotList?: ISnapshot[];
}

export class Snapshot {
  snapshotList: ISnapshot[];
  engine: Engine;
  constructor(props?: ISnapshotProps) {
    this.engine = props?.engine;
    this.snapshotList = props?.snapshotList || [];
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      snapshotList: observable.ref,
      addSnapshot: action,
      removeSnapshot: action,
    });
  }

  setInitialValue(configs: ISnapshot[]) {
    this.snapshotList = configs || [];
  }

  addSnapshot(config: ISnapshot) {
    this.snapshotList.push(config);
  }

  removeSnapshot(index: number) {
    this.snapshotList.slice(index, index + 1);
  }
}
