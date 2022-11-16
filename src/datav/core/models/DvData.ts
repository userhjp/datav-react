import { checkDataType, FieldStatus, getFieldMap, mapObject } from '@/datav/shared';
import { define, observable, action, autorun, toJS } from '@formily/reactive';
import { IDataSetting, IDataSourceSetting, IFieldSetting } from '../../react/interface';
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
  data: null | Array<any> | object = null;
  metadata: null | Array<any> | object;
  fieldMap: Record<string, string>;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
  fieldsStatus: Record<string, FieldStatus>;

  constructor(props: IDvData) {
    this.id = props.id;
    this.dataSource = props.dataSource;
    this.fieldsStatus = {};
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
      // fieldMap: observable.computed,
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
      this.metadata = this.filterData(toJS(res));
      this.data = this.mapData(this.metadata);
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
      data = this.execFilter(this.config.filterCode, data);
    }
    if (!checkDataType(this.config.dataType, data)) {
      data = { isError: true, message: '数据有误，类型应为：' + this.config.dataType, data: data || null };
    }
    return data;
  }

  execFilter(dataFilter: string, data: any) {
    let res = JSON.parse(JSON.stringify(data));
    const node = this.dataSource.engine.operation.findById(this.id);
    try {
      const filter = `if (!data) { return data; }  return filter(data);  function filter(res){  ${dataFilter}   }`;
      const func = new Function('data', filter);
      res = func(res);
      node.clearError();
    } catch (error) {
      const errorMsg = error.toString();
      node.setError({
        title: '过滤器执行异常',
        content: errorMsg,
      });
    }
    return res;
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
    if (Array.isArray(this.metadata)) {
      _data = this.metadata[0];
    } else if (typeof this.metadata === 'object') {
      _data = this.metadata;
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
