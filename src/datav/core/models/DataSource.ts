import { isObj, replaceTextParams, toJson } from '../../shared';
import { action, define, observable, toJS } from '@formily/reactive';
import { ApiRequestMethod, ApiType, IDataType } from '../../shared';
import { IDataSourceSetting, IEventField } from '../../react/interface';
import { dsRequest } from '../../shared';
import { Engine } from './Engine';
import { DvData } from './DvData';

export class DataSource {
  dataMap: Map<string, DvData> = new Map();
  globalDataMap: Map<string, DvData> = new Map();
  variables: Record<string, string> = {};
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      dataMap: observable,
      globalDataMap: observable,
      variables: observable.shallow,
      setData: action,
      setGlobalData: action,
      setVariables: action,
    });
  }

  setVariables(data: Record<string, any>) {
    Object.entries(data).forEach(([key, val]) => {
      this.variables[key] = val;
    });
    console.log(this.variables);
  }

  setGlobalData(dataId: string, data: DvData) {
    this.globalDataMap.set(dataId, data);
  }

  getGlobalData(dataId: string) {
    return this.globalDataMap.get(dataId)?.data || null;
  }

  setData(comId: string, data: DvData) {
    this.dataMap.set(comId, data);
  }

  removeData(id: string) {
    const dvData = this.dataMap.get(id);
    if (dvData) dvData.destroy();
    this.dataMap.delete(id);
  }

  getData(comId: string) {
    return this.dataMap.get(comId) || null;
  }

  async requestData(config: IDataSourceSetting) {
    let resData: any;
    switch (config.apiType) {
      case ApiType.static:
        resData = config.data;
        break;
      case ApiType.global:
        resData = toJS(this.getGlobalData(config.globalDataId));
        break;
      case ApiType.api:
        if (!config.apiUrl) {
          return (resData = { data: config.dataType === IDataType.object ? {} : [] });
        }
        if (!/^[a-zA-z]+:\/\/[^\s]*$/.test(config.apiUrl)) {
          resData = { isError: true, message: 'url必须包含协议字段，如http:' };
        }
        try {
          const conf = {
            headers: toJson(config.apiHeaders, {}),
          };
          const url = replaceTextParams(config.apiUrl, this.variables);
          if (config.apiMethod === ApiRequestMethod.GET) {
            resData = await dsRequest.get(url, conf);
          } else {
            resData = await dsRequest.post(url, toJson(config.apiBody, {}), conf);
          }
        } catch (error) {
          resData = { isError: true, message: error?.message || '服务器异常，请稍后再试' };
        }
        break;
      default:
        break;
    }
    return resData;
  }
}
