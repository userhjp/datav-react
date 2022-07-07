import { observable, define, action } from '@formily/reactive';
import { isArr, isStr } from '../../shared';
import { Operation } from './Operation';

export interface ISelection {
  selected?: string[];
  operation: Operation;
}

export enum alignType {
  alignLeft,
  horizontally,
  alignRight,
  alignTop,
  verticalCenter,
  alignBottom,
}

export class Selection {
  operation: Operation;
  selected: string[] = [];

  constructor(operation: Operation) {
    this.operation = operation;
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      selected: observable.shallow,
      first: observable.computed,
      batchSelect: action,
      add: action,
      remove: action,
      clear: action,
      align: action,
    });
  }

  safeSelect(id: string) {
    if (isStr(id)) {
      if (this.selected.length === 1 && this.selected.includes(id)) {
        return;
      }
      this.selected = [id];
    }
  }

  mapIds(ids: any) {
    return isArr(ids) ? ids.map((node: any) => (isStr(node) ? node : node?.id)) : [];
  }

  align(type: alignType) {
    const nodes = this.selected.map((f) => this.operation.findById(f));
    if (nodes.length < 2) return;
    switch (type) {
      case alignType.alignLeft:
        const minxNum = Math.min(...nodes.map((m) => m.attr.x));
        nodes.forEach((f) => (f.attr.x = minxNum));
        break;
      case alignType.horizontally:
        const minNumx = Math.min(...nodes.map((m) => m.attr.x + m.attr.w / 2));
        const maxNumx = Math.max(...nodes.map((m) => m.attr.x + m.attr.w / 2));
        const centerX = (maxNumx + minNumx) / 2;
        nodes.forEach((f) => {
          const dval = f.attr.x + f.attr.w / 2 - centerX;
          if (dval < 0) {
            f.attr.x = f.attr.x + Math.abs(dval);
          } else if (dval > 0) {
            f.attr.x = f.attr.x - dval;
          }
        });
        break;
      case alignType.alignRight:
        const maxxMum = Math.max(...nodes.map((m) => m.attr.x + m.attr.w));
        nodes.forEach((f) => {
          const dvalue = maxxMum - (f.attr.x + f.attr.w);
          f.attr.x = f.attr.x + dvalue;
        });
        break;
      case alignType.alignTop:
        const minyNum = Math.min(...nodes.map((m) => m.attr.y));
        nodes.forEach((f) => (f.attr.y = minyNum));
        break;
      case alignType.verticalCenter:
        const minNumy = Math.min(...nodes.map((m) => m.attr.y + m.attr.h / 2));
        const maxNumy = Math.max(...nodes.map((m) => m.attr.y + m.attr.h / 2));
        const centerY = (maxNumy + minNumy) / 2;
        nodes.forEach((f) => {
          const dval = f.attr.y + f.attr.h / 2 - centerY;
          if (dval < 0) {
            f.attr.y = f.attr.y + Math.abs(dval);
          } else if (dval > 0) {
            f.attr.y = f.attr.y - dval;
          }
        });
        break;
      case alignType.alignBottom:
        const maxyMum = Math.max(...nodes.map((m) => m.attr.y + m.attr.h));
        nodes.forEach((f) => {
          const dvalue = maxyMum - (f.attr.y + f.attr.h);
          f.attr.y = f.attr.y + dvalue;
        });
        break;
      default:
        break;
    }
  }

  batchSelect(ids: string[]) {
    this.selected = this.mapIds(ids);
  }

  batchSafeSelect(ids: string[]) {
    if (!ids?.length) return;
    this.batchSelect(ids);
  }

  add(...ids: string[]) {
    this.mapIds(ids).forEach((id) => {
      if (isStr(id)) {
        if (!this.selected.includes(id)) {
          this.selected.push(id);
        }
      } else {
        this.add(id?.id);
      }
    });
  }

  remove(...ids: string[]) {
    this.mapIds(ids).forEach((id) => {
      if (isStr(id)) {
        this.selected = this.selected.filter((item) => item !== id);
      } else {
        this.remove(id?.id);
      }
    });
  }

  has(...ids: string[]) {
    return this.mapIds(ids).some((id) => {
      if (isStr(id)) {
        return this.selected.includes(id);
      } else {
        if (!id?.id) return false;
        return this.has(id?.id);
      }
    });
  }

  clear() {
    this.selected = [];
  }

  get first() {
    return this.selected && this.selected.length ? this.selected[0] : null;
  }

  get length() {
    return this.selected.length;
  }
}
