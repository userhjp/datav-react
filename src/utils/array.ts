export interface ArrayServiceTreeToArrOptions {
  /** 深度项名，默认：`'deep'` */
  deepMapName?: string;
  /** 扁平后数组的父数据项名，默认：`'parent'` */
  parentMapName?: string;
  /** 源数据子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 是否移除 `children` 节点，默认：`true` */
  clearChildren?: boolean;
  /** 转换成数组结构时回调 */
  cb?: (item: any, parent: any, deep: number) => void;
}

export interface ArrayServiceArrToTreeOptions {
  /** 编号项名，默认：`'id'` */
  idMapName?: string;
  /** 父编号项名，默认：`'parentId'` */
  parentIdMapName?: string;
  /** 子项名，默认：`'children'` */
  childrenMapName?: string;
  /** 当无子级时是否移除 'children: []' */
  clearChildren?: boolean;
  /** 转换成树数据时回调 */
  cb?: (item: any) => void;
}

export const c: any = {
  deepMapName: 'deep',
  parentMapName: 'parent',
  idMapName: 'id',
  parentIdMapName: 'parentId',
  childrenMapName: 'children',
};

export class ArrayUtils {
  /**
   * 将树结构转换成数组结构
   */
  static treeToArr(tree: any[], options?: ArrayServiceTreeToArrOptions): any[] {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const opt = {
      deepMapName: c.deepMapName,
      parentMapName: c.parentMapName,
      childrenMapName: c.childrenMapName,
      clearChildren: true,
      cb: null,
      ...options,
    } as ArrayServiceTreeToArrOptions;
    const result: any[] = [];
    const inFn = (list: any[], parent: any, deep = 0) => {
      for (const i of list) {
        i[opt.deepMapName] = deep;
        i[opt.parentMapName] = parent;
        if (opt.cb) {
          opt.cb(i, parent, deep);
        }
        result.push(i);
        const children = i[opt.childrenMapName];
        if (children != null && Array.isArray(children) && children.length > 0) {
          inFn(children, i, deep + 1);
        }
        if (opt.clearChildren) {
          delete i[opt.childrenMapName];
        }
      }
    };
    inFn(tree, 1);
    return result;
  }

  /**
   * 数组转换成树数据
   */
  static arrToTree(arr: any[], options?: ArrayServiceArrToTreeOptions): any[] {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const opt = {
      idMapName: c.idMapName,
      parentIdMapName: c.parentIdMapName,
      childrenMapName: c.childrenMapName,
      cb: null,
      clearChildren: true,
      ...options,
    } as ArrayServiceArrToTreeOptions;
    const tree: any[] = [];
    const childrenOf = {};
    for (const item of arr) {
      const id = item[opt.idMapName];
      const pid = item[opt.parentIdMapName];
      childrenOf[id] = childrenOf[id] || [];
      item[opt.childrenMapName] = childrenOf[id];
      if (opt.cb) {
        opt.cb(item);
      }
      if (pid) {
        childrenOf[pid] = childrenOf[pid] || [];
        childrenOf[pid].push(item);
      } else {
        // item['key'] = item['key'] ?? item[opt.idMapName]
        tree.push(item);
      }
    }
    if (opt.clearChildren) {
      this.visitTree(tree, (item: any, parent: any, deep: number) => {
        item.parent = parent;
        if (item[opt.childrenMapName]?.length < 1) {
          delete item[opt.childrenMapName];
        }
      });
    }
    return tree;
  }

  /**
   * 递归访问整个树
   */
  static visitTree(
    tree: any[],
    cb: (item: any, parent: any, deep: number) => void,
    options?: {
      /** 子项名，默认：`'children'` */
      childrenMapName?: string;
    }
  ): void {
    options = {
      childrenMapName: c.childrenMapName,
      ...options,
    };
    const inFn = (data: any[], parent: any, deep: number) => {
      for (const item of data) {
        cb(item, parent, deep);
        const childrenVal = item[options.childrenMapName];
        if (childrenVal && childrenVal.length > 0) {
          inFn(childrenVal, item, deep + 1);
        }
      }
    };
    inFn(tree, null, 1);
  }
}
