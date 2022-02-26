import { observable, define, action } from '@formily/reactive';
import { Operation } from './Operation';
import { HoverNodeEvent } from '../events';
import { IWidgetSetting } from '../../react/interface';

export interface IHoverProps {
  operation: Operation;
}

export class Hover {
  node: IWidgetSetting = null;
  operation: Operation;
  constructor(props?: IHoverProps) {
    this.operation = props?.operation;
    this.makeObservable();
  }

  setHover(node?: IWidgetSetting) {
    if (node) {
      this.node = node;
    } else {
      this.node = null;
    }
    this.trigger();
  }

  clear() {
    this.node = null;
  }

  trigger() {
    if (this.operation) {
      return this.operation.dispatch(
        new HoverNodeEvent({
          target: this.operation.components,
          source: this.node,
        })
      );
    }
  }

  makeObservable() {
    define(this, {
      node: observable.ref,
      setHover: action,
      clear: action,
    });
  }
}
