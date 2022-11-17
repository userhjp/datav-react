import { Engine } from './Engine';
import { action, define, observable } from '@formily/reactive';
import { ZoomMode } from '../../shared';
import { IScreenProps } from '../../react/interface';

// export enum ScreenType {
//   PC = 'PC',
//   Responsive = 'Responsive',
//   Mobile = 'Mobile',
// }

export interface IScreen {
  props?: IScreenProps;
  engine: Engine;
}
export class Screen {
  id: string;
  title: string;
  props: IScreenProps;
  engine: Engine;
  scale = 1;
  // type: ScreenType;
  // flip = false;
  constructor(screen: IScreen) {
    // this.type = engine.props.defaultScreenType;
    this.props = { ...Screen.defaultProps, ...screen?.props };
    this.engine = screen.engine;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      id: observable.ref,
      title: observable.ref,
      scale: observable.ref,
      props: observable,
      setScale: action,
      setSize: action,
      setProps: action,
      // setFlip: action,
    });
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
      this.props.width = width;
    }
    if (height) {
      this.props.height = height;
    }
  }

  setProps(props: IScreenProps) {
    this.props.backgroundColor = props.backgroundColor;
    this.props.backgroundImg = props.backgroundImg;
    this.props.grid = props.grid;
    this.props.height = props.height;
    this.props.width = props.width;
    this.props.zoomMode = props.zoomMode;
  }

  // setFlip(flip: boolean) {
  //   this.flip = flip;
  // }

  static defaultProps: IScreenProps = {
    width: 1920,
    height: 1080,
    // scale: 1,
    backgroundColor: '#0e2a42',
    backgroundImg: '',
    grid: 8,
    zoomMode: ZoomMode.auto,
  };
}
