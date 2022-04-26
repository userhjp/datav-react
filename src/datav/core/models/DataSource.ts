import { isObj, replaceTextParams, toJson } from '../../shared';
import { action, define, observable, toJS } from '@formily/reactive';
import { ApiRequestMethod, ApiType, IDataType } from '../../shared';
import { IDataSourceSetting } from '../../react/interface';
import { dsRequest } from '../../shared';
import { Engine } from './Engine';

type ApiData = Partial<Record<string, any>> | Partial<Record<string, any>>[];

export class DataSource {
  dataMap: Map<string, ApiData> = new Map();
  variables: Record<string, string> = {};
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      dataMap: observable,
      variables: observable.shallow,
      setData: action,
    });
  }

  setVariables(fields: Record<string, string>, data: Record<string, any>) {
    if (data && isObj(data)) {
      for (const key in fields) {
        const alias = fields[key] || key;
        this.variables[alias] = data[key] === undefined ? '' : data[key];
      }
    }
    console.log(this.variables);
  }

  setData(comId: string, data: ApiData) {
    this.dataMap.set(comId, data);
  }

  getData(comId: string) {
    return this.dataMap.get(comId);
  }

  async requestData(config: IDataSourceSetting) {
    let resData: any;
    if (config.apiType === ApiType.static) {
      resData = { data: toJS(config.data) };
    } else if (config.apiType === ApiType.api) {
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
        throw Error('请求数据异常');
      }
    }
    return resData;
  }
}
