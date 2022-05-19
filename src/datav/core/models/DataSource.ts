import { isObj, replaceTextParams, toJson } from '../../shared';
import { action, define, observable, toJS } from '@formily/reactive';
import { ApiRequestMethod, ApiType, IDataType } from '../../shared';
import { IDataSourceSetting, IEventField } from '../../react/interface';
import { dsRequest } from '../../shared';
import { Engine } from './Engine';

type ApiData = Partial<Record<string, any>> | Partial<Record<string, any>>[];

export class DataSource {
  dataMap: Map<string, ApiData> = new Map();
  globalDataMap: Map<string, ApiData> = new Map();
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

  setGlobalData(dataId: string, data: ApiData) {
    this.globalDataMap.set(dataId, data);
  }

  getGlobalData(dataId: string) {
    return this.globalDataMap.get(dataId);
  }

  setData(comId: string, data: ApiData) {
    this.dataMap.set(comId, data);
  }

  getData(comId: string) {
    return this.dataMap.get(comId);
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
          throw Error(error.toString());
        }
        break;
      default:
        break;
    }
    return resData;
  }
}
