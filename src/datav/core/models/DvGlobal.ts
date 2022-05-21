import { IDataSourceSetting } from '@/datav/react/interface';
import { observable, define, action } from '@formily/reactive';
import { DataSource } from './DataSource';
import { GlobalData } from './GlobalData';

type ISourceGlobal = {
  enable: boolean;
  title: string;
  id: string;
  autoUpdate: boolean;
  updateTime: number;
  config: IDataSourceSetting;
};
export type IDvGlobal = {
  sourceArray: ISourceGlobal[];
  colors: string[][];
};
export class DvGlobal {
  dataSource: DataSource;
  props: IDvGlobal = {
    sourceArray: [],
    colors: [],
  };

  constructor(dataSource: DataSource) {
    this.props = {
      ...DvGlobal.defaultProps,
    };
    this.dataSource = dataSource;
    this.makeObservable();
  }

  get colors() {
    return this.props.colors || [];
  }

  get sourceArray() {
    return this.props.sourceArray || [];
  }

  get enableDataSources() {
    return this.sourceArray.filter((f) => f.enable).map((m) => ({ label: m.title, value: m.id }));
  }

  makeObservable() {
    define(this, {
      props: observable,
      colors: observable.computed,
      sourceArray: observable.computed,
      enableDataSources: observable.computed,
      setProps: action,
    });
  }

  setProps(props: IDvGlobal) {
    this.props.colors = Object.assign(this.colors, props.colors);
    this.props.sourceArray = Object.assign(this.sourceArray, props.sourceArray);
    this.updateSource();
  }

  updateSource() {
    this.dataSource.globalDataMap.forEach((f) => f.destroy());
    this.dataSource.globalDataMap.clear();
    this.sourceArray.forEach((f) => {
      if (!f.enable) return;
      this.dataSource.setGlobalData(
        f.id,
        new GlobalData({
          dataSource: this.dataSource,
          ...f,
        })
      );
    });
  }

  static defaultProps: IDvGlobal = {
    colors: [
      ['#0a73ff', '#79daff', '#bdfdff', '#57cdff', '#a3f6ff', '#4caff9'],
      ['#38cafb', '#4caff9', '#4adeca', '#2aa7ee', '#0270f2', '#488cf7'],
      ['#516b91', '#59c4e6', '#edafda', '#93b7e3', '#a5e7f0', '#cbb0e3'],
      ['#c12e34', '#e6b600', '#0098d9', '#2b821d', '#005eaa', '#339ca8'],
      ['#3fb1e3', '#6be6c1', '#626c91', '#a0a7e6', '#c4ebad', '#96dee8'],

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
