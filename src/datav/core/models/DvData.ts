import { checkDataType, execFilter, FieldStatus, getFieldMap, mapObject } from '@/datav/shared';
import { define, observable, reaction, action } from '@formily/reactive';
import { IDataSourceSetting, IFieldSetting } from '../../react/interface';
import { DataSource } from './DataSource';

type IDvData = {
  id: string;
  dataSource: DataSource;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
  fields?: IFieldSetting;
};

export class DvData {
  id: string;
  time: NodeJS.Timeout;
  dispose: () => void;
  loading: boolean;
  data: any;

  dataSource: DataSource;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
  fieldMap: Record<string, string>;
  fieldsStatus: Record<string, FieldStatus>;

  constructor(globalData: IDvData) {
    this.id = globalData.id;
    this.dataSource = globalData.dataSource;
    this.autoUpdate = globalData.autoUpdate;
    this.updateTime = globalData.updateTime;
    this.config = globalData.config;
    this.fieldMap = getFieldMap(globalData.fields || {});
    this.fieldsStatus = {};
    this.makeObservable();
    this.loadData();
  }

  makeObservable() {
    define(this, {
      loading: observable.ref,
      data: observable,
      changeFieldsStatus: action,
    });
  }

  destroy() {
    window.clearTimeout(this.time);
    this.dispose();
  }

  async loadData() {
    try {
      if (this.dispose) this.dispose();
      this.dispose = reaction(async () => {
        clearTimeout(this.time);
        this.loading = true;
        this.changeFieldsStatus(FieldStatus.loading);
        const res = await this.dataSource.requestData(this.config);
        this.data = this.mapData(this.processingData(res));
        this.changeFieldsStatus();
        this.loading = false;
        if (this.autoUpdate && this.updateTime) {
          this.time = setTimeout(() => {
            this.loadData();
          }, this.updateTime * 1000);
        }
      });
    } catch (error) {}
  }

  processingData(data: any) {
    if (!data || data?.isError) return data;
    if (this.config.useFilter && this.config.filterCode) {
      data = execFilter(this.config.filterCode, data);
    }
    if (!checkDataType(this.config.dataType, data)) {
      data = { isError: true, message: '数据有误，类型应为：' + this.config.dataType, data };
    }
    return data;
  }

  mapData(data: any) {
    if (!data || data?.isError) return data;
    if (Array.isArray(data)) {
      return data.map((m) => mapObject(m, this.fieldMap));
    } else {
      return mapObject(data, this.fieldMap);
    }
  }

  changeFieldsStatus(status?: FieldStatus) {
    let _data = null;
    if (Array.isArray(this.data)) {
      _data = this.data[0];
    } else if (typeof this.data === 'object') {
      _data = this.data;
    }
    Object.entries(this.fieldMap).forEach(([key, fc]) => {
      if (status === FieldStatus.loading) {
        this.fieldsStatus[key] = FieldStatus.loading;
      } else if (_data && Object.prototype.hasOwnProperty.call(_data, fc || key)) {
        this.fieldsStatus[key] = FieldStatus.success;
      } else {
        this.fieldsStatus[key] = FieldStatus.failed;
      }
    });
  }
}
