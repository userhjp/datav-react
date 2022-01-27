import { replaceTextParams, toJson } from '@/datav/shared';
import { action, define, observable, toJS } from '@formily/reactive';
import { ApiRequestMethod, ApiType, ComDataType } from '@/datav/shared';
import { DataConfigType } from '@/datav/interface';
import { dsRequest } from '@/datav/shared';
import { Engine } from './Engine';

export const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type ApiData = Partial<Record<string, any>> | Partial<Record<string, any>>[];

export class DataSource {
  dataMap: Map<string, ApiData> = new Map();
  variables: Record<string, any>;
  engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      dataMap: observable,
      setData: action,
    });
  }

  setData(comId: string, data: ApiData) {
    this.dataMap.set(comId, data);
  }

  getData(comId: string) {
    return this.dataMap.get(comId);
  }

  async requestData(config: DataConfigType) {
    let resData: any;
    if (config.apiType === ApiType.static) {
      resData = { data: toJS(config.data) };
    } else if (config.apiType === ApiType.api) {
      if (!config.apiUrl) {
        return (resData = { data: config.dataType === ComDataType.object ? {} : [] });
      }
      if (!/^[a-zA-z]+:\/\/[^\s]*$/.test(config.apiUrl)) {
        throw Error('url必须包含协议字段，如http:');
      }
      await waitTime(1000);
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
        throw Error('请求数据异常');
      }
    }
    return resData;
  }
}
