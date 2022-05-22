import { checkDataType, execFilter, FieldStatus, getFieldMap, mapObject } from '@/datav/shared';
import { define, observable, action, autorun } from '@formily/reactive';
import { IDataSetting, IDataSourceSetting } from '../../react/interface';
import { DataSource } from './DataSource';

type IDvData = {
  id: string;
  dataSource: DataSource;
  dataSetting: IDataSetting;
};

export class DvData {
  dataSource: DataSource;

  id: string;
  time: NodeJS.Timeout;
  dispose: () => void;
  settingDispose: () => void;
  loading: boolean;
  data: null | Array<any> | object;

  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
  fieldMap: Record<string, string>;
  fieldsStatus: Record<string, FieldStatus>;

  constructor(props: IDvData) {
    this.id = props.id;
    this.dataSource = props.dataSource;
    this.makeObservable();
    this.settingDispose = autorun(() => {
      this.autoUpdate = props.dataSetting.autoUpdate;
      this.updateTime = props.dataSetting.updateTime;
      this.config = props.dataSetting.config;
      this.fieldMap = getFieldMap(props.dataSetting.fields || {});
      this.loadData();
    });
  }

  makeObservable() {
    define(this, {
      loading: observable.ref,
      data: observable.ref,
      fieldsStatus: observable,
      changeFieldsStatus: action,
    });
  }

  destroy() {
    window.clearTimeout(this.time);
    this.dispose();
    this.settingDispose();
  }

  async loadData() {
    if (this.dispose) this.dispose();
    this.dispose = autorun(async () => {
      clearTimeout(this.time);
      this.loading = true;
      this.changeFieldsStatus(FieldStatus.loading);
      const res = await this.dataSource.requestData(this.config);
      this.data = this.mapData(this.filterData(res));
      this.changeFieldsStatus();
      this.loading = false;
      if (this.autoUpdate && this.updateTime) {
        this.time = setTimeout(() => {
          this.loadData();
        }, this.updateTime * 1000);
      }
    });
  }

  filterData(data: any) {
    if (!data || data?.isError) return data;
    if (this.config.useFilter && this.config.filterCode) {
      data = execFilter(this.config.filterCode, data);
    }
    if (!checkDataType(this.config.dataType, data)) {
      data = { isError: true, message: '数据有误，类型应为：' + this.config.dataType, data: data || null };
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
    this.fieldsStatus = {};
    let _data = null;
    if (Array.isArray(this.data)) {
      _data = this.data[0];
    } else if (typeof this.data === 'object') {
      _data = this.data;
    }
    if (!_data) _data = {};
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
