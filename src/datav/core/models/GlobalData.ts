import { define, observable, reaction } from '@formily/reactive';
import { IDataSourceSetting } from '../../react/interface';
import { DataSource } from './DataSource';

type IGloalData = {
  dataSource: DataSource;
  id: string;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
};

export class GlobalData {
  time: NodeJS.Timeout;
  dispose: () => void;
  id: string;
  dataSource: DataSource;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
  data: any;

  constructor(globalData: IGloalData) {
    this.id = globalData.id;
    this.dataSource = globalData.dataSource;
    this.autoUpdate = globalData.autoUpdate;
    this.updateTime = globalData.updateTime;
    this.config = globalData.config;
    this.makeObservable();
    this.loadGlobalData();
  }

  makeObservable() {
    define(this, {
      data: observable,
    });
  }

  destroy() {
    clearTimeout(this.time);
    this.dispose();
  }

  async loadGlobalData() {
    try {
      if (this.dispose) this.dispose();
      this.dispose = reaction(async () => {
        clearTimeout(this.time);
        this.data = await this.dataSource.requestData(this.config);
        if (this.autoUpdate && this.updateTime) {
          this.time = setTimeout(() => {
            this.loadGlobalData();
          }, this.updateTime * 1000);
        }
      });
    } catch (error) {}
  }
}
