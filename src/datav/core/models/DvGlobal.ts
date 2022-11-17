import { IDataSourceSetting, IFieldSetting } from '@/datav/react/interface';
import { observable, define, action, batch } from '@formily/reactive';
import { DataSource } from './DataSource';
import { DvData } from './DvData';

type ISourceGlobal = {
  fields?: IFieldSetting;
  enable: boolean;
  title: string;
  id: string;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
};

/** 颜色类型，渐变大多数情况下图表两种颜色渐变足以，若有多颜色需求自定义组件实现 纯色 | 垂直渐变 | 水平渐变 */
export type IGlobalColor = Array<{ baseColor: string; gradualColor?: string; type: 'base' | 'horizontal' | 'vertical' | string }>;
export type IDvGlobal = {
  sourceArray: ISourceGlobal[];
  colors: Array<IGlobalColor>;
};
export class DvGlobal {
  dataSource: DataSource;
  sourceArray: ISourceGlobal[];
  colors: Array<IGlobalColor>;

  constructor(dataSource: DataSource) {
    this.colors = DvGlobal.defaultProps.colors;
    this.sourceArray = DvGlobal.defaultProps.sourceArray;
    this.dataSource = dataSource;
    this.makeObservable();
  }

  get enableDataSources() {
    return this.sourceArray.filter((f) => f.enable).map((m) => ({ label: m.title, value: m.id }));
  }

  get values() {
    return {
      sourceArray: this.sourceArray,
      colors: this.colors,
    };
  }

  makeObservable() {
    define(this, {
      colors: observable,
      sourceArray: observable,
      enableDataSources: observable.computed,
      setInitialValue: batch, // actions内部无法通过autorun追踪依赖
    });
  }

  setInitialValue(props: IDvGlobal) {
    this.colors = Object.assign(this.colors, props.colors);
    this.sourceArray = Object.assign(this.sourceArray, props.sourceArray);
    this.dataSource.globalDataMap.forEach((f) => f.destroy());
    this.dataSource.globalDataMap.clear();
    this.sourceArray.forEach((f) => {
      if (!f.enable) return;
      this.dataSource.setGlobalData(
        f.id,
        new DvData({
          id: f.id,
          dataSource: this.dataSource,
          dataSetting: {
            autoUpdate: f.autoUpdate,
            updateTime: f.updateTime,
            config: f.config,
            fields: f.fields,
          },
        })
      );
    });
  }

  static defaultProps: IDvGlobal = {
    colors: [
      [
        { baseColor: '#0a73ff', gradualColor: '#0a73ff', type: 'base' },
        { baseColor: '#79daff', gradualColor: '#79daff', type: 'base' },
        { baseColor: '#bdfdff', gradualColor: '#bdfdff', type: 'base' },
        { baseColor: '#57cdff', gradualColor: '#57cdff', type: 'base' },
        { baseColor: '#a3f6ff', gradualColor: '#a3f6ff', type: 'base' },
        { baseColor: '#4caff9', gradualColor: '#4caff9', type: 'base' },
      ],
      [
        { baseColor: '#38cafb', gradualColor: '#38cafb', type: 'base' },
        { baseColor: '#4caff9', gradualColor: '#4caff9', type: 'base' },
        { baseColor: '#4adeca', gradualColor: '#4adeca', type: 'base' },
        { baseColor: '#2aa7ee', gradualColor: '#2aa7ee', type: 'base' },
        { baseColor: '#0270f2', gradualColor: '#0270f2', type: 'base' },
        { baseColor: '#488cf7', gradualColor: '#488cf7', type: 'base' },
      ],
      [
        { baseColor: '#516b91', gradualColor: '#516b91', type: 'base' },
        { baseColor: '#59c4e6', gradualColor: '#59c4e6', type: 'base' },
        { baseColor: '#edafda', gradualColor: '#edafda', type: 'base' },
        { baseColor: '#93b7e3', gradualColor: '#93b7e3', type: 'base' },
        { baseColor: '#a5e7f0', gradualColor: '#a5e7f0', type: 'base' },
        { baseColor: '#cbb0e3', gradualColor: '#cbb0e3', type: 'base' },
      ],
      [
        { baseColor: '#c12e34', gradualColor: '#c12e34', type: 'base' },
        { baseColor: '#e6b600', gradualColor: '#e6b600', type: 'base' },
        { baseColor: '#0098d9', gradualColor: '#0098d9', type: 'base' },
        { baseColor: '#2b821d', gradualColor: '#2b821d', type: 'base' },
        { baseColor: '#005eaa', gradualColor: '#005eaa', type: 'base' },
        { baseColor: '#339ca8', gradualColor: '#339ca8', type: 'base' },
      ],
      [
        { baseColor: '#3fb1e3', gradualColor: '#3fb1e3', type: 'base' },
        { baseColor: '#6be6c1', gradualColor: '#6be6c1', type: 'base' },
        { baseColor: '#626c91', gradualColor: '#626c91', type: 'base' },
        { baseColor: '#a0a7e6', gradualColor: '#a0a7e6', type: 'base' },
        { baseColor: '#c4ebad', gradualColor: '#c4ebad', type: 'base' },
        { baseColor: '#96dee8', gradualColor: '#96dee8', type: 'base' },
      ],
      [
        { baseColor: '#3b59f8', gradualColor: '#47a2fb', type: 'vertical' },
        { baseColor: '#4ad395', gradualColor: '#51e267', type: 'vertical' },
        { baseColor: '#f5aa2c', gradualColor: '#fa6537', type: 'vertical' },
        { baseColor: '#f585eb', gradualColor: '#7b7afe', type: 'vertical' },
        { baseColor: '#2fa1dc', gradualColor: '#54ddf9', type: 'vertical' },
        { baseColor: '#28d0fc', gradualColor: '#6c7ffa', type: 'vertical' },
      ],

      // ['#FFFFCC', '#DEFCCD', '#BDF9CE', '#9DF6CF', '#7CF2D0', '#5BEFD1'],
      // ['#34FFF5', '#31E0F2', '#2DC0EE', '#2AA1EB', '#2782E7', '#2362E4'],
      // ['#FFDC84', '#FFC47C', '#FEAB75', '#FE936D', '#FE7B65', '#FD625E'],
      // ['#6DD400', '#5BDA27', '#49E04E', '#37E675', '#24EB9C', '#12F1C3'],
      // ['#D74AFF', '#C64EFF', '#B552FF', '#A456FF', '#925AFF', '#815EFF'],
      // ['#44D7B6', '#63C69F', '#82B689', '#A2A572', '#C1945B', '#E08445'],
      // ['#FF5738', '#EF8D7A', '#DFC4BD', '#CFFAFF', '#8AD6FF', '#45B2FF'],
      // ['#7845FF', '#A579FB', '#D2ADF7', '#FFE1F3', '#FFAAC5', '#FF7497'],
      // ['#FF683D', '#FF907A', '#FFB9B6', '#FFE1F3', '#AAD1DB', '#55C0C4'],
      // ['#5B0BFF', '#9252FB', '#C89AF7', '#FFE1F3', '#FFAAED', '#FF74E7'],
      // ['#FF704C', '#FF9684', '#FFBBBB', '#FFE1F3', '#FFCCA2', '#FFB651'],
      // ['#4DB156', '#88C18A', '#C4D1BF', '#FFE1F3', '#BEC5F7', '#7EAAFB'],

      // ['#12939A', '#DDB27C', '#88572C', '#FF991F', '#F15C17', '#223F9A'],
      // ['#8CD4C6', '#FEFFB3', '#BFBADB', '#FA8073', '#80B1D2', '#FCB460'],
      // ['#A2CFE6', '#1F77B6', '#B3DF8A', '#2DA32B', '#FC9A99', '#F7393B'],
      // ['#8EDBAD', '#12D862', '#6AA7FF', '#0058D7', '#ED95FF', '#B72AD4'],
      // ['#B3E2CD', '#66C2A5', '#FDCDAC', '#D88C6F', '#CBD5E8', '#8DA0CB'],
      // ['#D15B5B', '#41994A', '#5F5DA5', '#BC6C89', '#D77E55', '#468085'],
    ],
    sourceArray: [],
  };
}
