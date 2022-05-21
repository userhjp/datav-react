import { isObj, replaceTextParams, toJson } from '../../shared';
import { action, define, observable, toJS } from '@formily/reactive';
import { ApiRequestMethod, ApiType, IDataType } from '../../shared';
import { IDataSourceSetting, IEventField } from '../../react/interface';
import { dsRequest } from '../../shared';
import { Engine } from './Engine';
import { GlobalData } from './GlobalData';
import { DvData } from './DvData';

type ApiData = Partial<Record<string, any>> | Partial<Record<string, any>>[];

export class DataSource {
  dataMap: Map<string, DvData> = new Map();
  globalDataMap: Map<string, GlobalData> = new Map();
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

  setVariables(fields: Array<IEventField>, data: Record<string, any>) {
    if (data && isObj(data) && fields?.length) {
      fields.forEach((f) => {
        const alias = f.map || f.key;
        if (alias && f.key) {
          this.variables[alias] = data[f.key] === undefined ? '' : data[f.key];
        }
      });
    }
    console.log(this.variables);
  }

  setGlobalData(dataId: string, data: GlobalData) {
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
  }

  getData(comId: string) {
    return this.dataMap.get(comId) || null;
  }

  async requestData(config: IDataSourceSetting) {
    let resData: any;
    switch (config.apiType) {
      case ApiType.static:
        resData = toJS(config.data);
        break;
      case ApiType.global:
        resData = this.getGlobalData(config.globalDataId);
        break;
      case ApiType.api:
        if (!config.apiUrl) {
          return (resData = { data: config.dataType === IDataType.object ? {} : [] });
        }
        if (!/^[a-zA-z]+:\/\/[^\s]*$/.test(config.apiUrl)) {
          throw Error('url必须包含协议字段，如http:');
        }
        try {
          const conf = {
            headers: toJson(config.apiHeaders, {}),
          };
          /**
           * 由于在 useReqData useEffect中使用了reaction 这里会自动收集 apiUrl使用到variables的字段的依赖，当依赖字段变化后会重新调用请求方法
           */
          const url = replaceTextParams(config.apiUrl, this.variables);
          if (config.apiMethod === ApiRequestMethod.GET) {
            resData = await dsRequest.get(url, conf);
          } else {
            resData = await dsRequest.post(url, toJson(config.apiBody, {}), conf);
          }
        } catch (error) {
          throw Error(error?.toString() || '服务器异常，请稍后再试');
        }
        break;
      default:
        break;
    }
    return resData;
  }
}
