import { Engine } from './Engine';
import { action, define, observable } from '@formily/reactive';
import { generateUUID, ZoomMode } from '../../shared';
import { IScreenProps, ScreenType } from '../../react/interface';

export interface IScreen {
  props?: IScreenProps;
  engine: Engine;
}
export class Screen {
  id: string;
  title: string;
  engine: Engine;

  scale = 1;
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImg: string;
  cutCover: string;
  grid: number;
  zoomMode: ZoomMode;
  type: ScreenType;
  constructor(screen: IScreen) {
    const props = { ...Screen.defaultProps, ...screen?.props };
    this.id = generateUUID();
    this.type = props.type;
    this.width = props.width;
    this.height = props.height;
    this.backgroundColor = props.backgroundColor;
    this.backgroundImg = props.backgroundImg;
    this.zoomMode = props.zoomMode;
    this.cutCover = props.cutCover;
    this.engine = screen.engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      id: observable.ref,
      title: observable.ref,
      scale: observable.ref,
      width: observable.ref,
      height: observable.ref,
      backgroundColor: observable.ref,
      backgroundImg: observable.ref,
      grid: observable.ref,
      zoomMode: observable.ref,
      cutCover: observable.ref,
      setScale: action,
      setSize: action,
      setInitialValue: action,
      // setFlip: action,
    });
  }

  get values() {
    return {
      backgroundColor: this.backgroundColor,
      backgroundImg: this.backgroundImg,
      cutCover: this.cutCover,
      grid: this.grid,
      height: this.height,
      width: this.width,
      zoomMode: this.zoomMode,
    };
  }

  setScale(scale: number) {
    if (scale < 0.18) {
      this.scale = 0.18;
    } else if (scale > 2) {
      this.scale = 2;
    } else {
      this.scale = scale;
    }
  }

  setSize(width?: number, height?: number) {
    if (width) {
      this.width = width;
    }
    if (height) {
      this.height = height;
    }
  }

  setInitialValue(props: IScreenProps) {
    const assignProps = { ...Screen.defaultProps, ...props };
    this.backgroundColor = assignProps.backgroundColor;
    this.backgroundImg = assignProps.backgroundImg;
    this.grid = assignProps.grid;
    this.height = assignProps.height;
    this.width = assignProps.width;
    this.zoomMode = assignProps.zoomMode;
    this.cutCover = assignProps.cutCover;
  }

  static defaultProps: IScreenProps = {
    type: ScreenType.PC,
    width: 1920,
    height: 1080,
    backgroundColor: '#0e2a42',
    backgroundImg: '',
    cutCover: '',
    grid: 8,
    zoomMode: ZoomMode.auto,
  };
}
