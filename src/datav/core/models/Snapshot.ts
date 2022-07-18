import { observable, define, action } from '@formily/reactive';
import { Engine } from './Engine';
import { IPageType } from '@/datav/react';

export type ISnapshot = {
  id: string;
  pid: string;
  createtime: number;
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
      loadSnapshot: action,
    });
  }

  setInitialValue(configs: ISnapshot[]) {
    this.snapshotList = configs || [];
  }

  addSnapshot(config: ISnapshot) {
    this.snapshotList = [...this.snapshotList, config];
  }

  async removeSnapshot(item: ISnapshot) {
    this.engine.toolbar.addLoading();
    const handle = await this.engine.props.removeSnapshot(item);
    this.engine.toolbar.removeLoading();
    if (handle === false) return;
    this.snapshotList = this.snapshotList.filter((f) => f.id !== item.id);
  }

  async recoverySnapshot(item: ISnapshot) {
    const config = await this.loadSnapshot(item);
    if (config) {
      this.engine.setInitialValue(item.config);
    }
  }

  async loadSnapshot(item: ISnapshot) {
    if (item.config) return item.config;
    this.engine.toolbar.addLoading();
    const res = await this.engine.props.loadSnapshot?.(item);
    const config = (res && res.config) || item.config;
    if (res && res.config) item.config = res.config;
    this.engine.toolbar.removeLoading();
    return config;
  }
}
