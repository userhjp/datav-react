import { observable, define, action } from '@formily/reactive';
import { isArr, isStr } from '../../shared';
import { Operation } from './Operation';

export interface ISelection {
  selected?: string[];
  operation: Operation;
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
      selected: observable,
      select: action,
      batchSelect: action,
      add: action,
      remove: action,
      clear: action,
    });
  }

  select(id: string) {
    if (isStr(id)) {
      if (this.selected.length === 1 && this.selected.includes(id)) {
        return;
      }
      this.selected = [id];
    }
  }

  safeSelect(id: string) {
    if (!id) return;
    this.select(id);
  }

  mapIds(ids: any) {
    return isArr(ids) ? ids.map((node: any) => (isStr(node) ? node : node?.id)) : [];
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
