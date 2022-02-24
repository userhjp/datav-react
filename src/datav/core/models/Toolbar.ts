import { action, define, observable } from '@formily/reactive';
import { PanelType } from '../../shared';
const panelStateKey = 'panel-state';

function getPanelState(key: PanelType) {
  try {
    const val = localStorage.getItem(panelStateKey) || '';
    return JSON.parse(val)[key] === '1';
  } catch (error) {
    return key !== PanelType.layer;
  }
}

function setPanelState(key: PanelType, value: '0' | '1') {
  let map = {};

  try {
    const val = localStorage.getItem(panelStateKey) || '{}';
    map = JSON.parse(val);
    map[key] = value;
  } catch (error) {
    map[key] = value;
  }

  localStorage.setItem(panelStateKey, JSON.stringify(map));
}

export class Toolbar {
  loading = 0;

  /** 图层 */
  layer = {
    show: getPanelState(PanelType.layer),
  };

  /** 组件列表 */
  components = {
    show: getPanelState(PanelType.components),
  };

  /** 组件属性 */
  config = {
    show: getPanelState(PanelType.config),
  };

  /** 画布工具 */
  toolbox = {
    show: getPanelState(PanelType.toolbox),
    /** 参考线 */
    referline: getPanelState(PanelType.referline),
    /** 对齐线 */
    alignline: getPanelState(PanelType.alignline),
  };

  /** 多选 */
  multiple = {
    open: getPanelState(PanelType.multiple),
  };

  constructor() {
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      layer: observable,
      components: observable,
      config: observable,
      toolbox: observable,
      multiple: observable,

      loading: observable,
      addLoading: action,
      removeLoading: action,
      removeAllLoading: action,
    });
  }

  setPanelState(payload: { type: PanelType; value: boolean }) {
    switch (payload.type) {
      case PanelType.components:
        this.components.show = payload.value;
        break;
      case PanelType.config:
        this.config.show = payload.value;
        break;
      case PanelType.layer:
        this.layer.show = payload.value;
        break;
      case PanelType.toolbox:
        this.toolbox.show = payload.value;
        break;
      case PanelType.referline:
        this.toolbox.referline = payload.value;
        break;
      case PanelType.alignline:
        this.toolbox.alignline = payload.value;
        break;
      case PanelType.multiple:
        this.multiple.open = payload.value;
        break;
    }
    setPanelState(payload.type, payload.value ? '1' : '0');
  }

  addLoading() {
    this.loading = this.loading + 1;
  }

  removeLoading() {
    this.loading = Math.max(this.loading - 1, 0);
  }

  removeAllLoading() {
    this.loading = 0;
  }
}
