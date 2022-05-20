import { action, define, observable } from '@formily/reactive';
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
      loadGlobalData: action,
    });
  }

  async loadGlobalData() {
    try {
      this.data = await this.dataSource.requestData(this.config);
      if (this.autoUpdate && this.updateTime) {
        setTimeout(() => {
          this.loadGlobalData();
        }, this.updateTime * 1000);
      }
    } catch (error) {}
  }
}
