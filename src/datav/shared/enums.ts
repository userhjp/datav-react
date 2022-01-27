/** 组件层级动作枚举 */
export enum MoveSortType {
  up,
  down,
  top,
  bottom,
}

/** 布局类型 */
export enum PanelType {
  layer = 'layer',
  components = 'components',
  config = 'config',
  toolbox = 'toolbox',
  referline = 'referline',
  alignline = 'alignline',
  multiple = 'multiple',
}

/** 页面缩放方式 */
export enum ZoomMode {
  /**
   * 全屏铺满
   */
  auto,
  /**
   * 等比缩放宽度铺满
   */
  width,
  /**
   * 等比缩放高度铺满
   */
  height,
  /**
   * 等比缩放高度铺满并且可以左右移动
   */
  full,
  /**
   * 不缩放
   */
  disabled,
}

export enum FieldStatus {
  loading = 'loading',
  success = 'success',
  failed = 'failed',
}

/** 组件数据类型 */
export enum ComDataType {
  array = 'array',
  object = 'object',
}

export enum ApiRequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum ApiType {
  static = 'static',
  api = 'api',
}
