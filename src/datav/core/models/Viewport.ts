import { calcBoundingRect, cancelIdle, IPoint, isPointInRect, requestIdle } from '../../shared';
import { action, define, observable } from '@formily/reactive';
import { Engine } from './Engine';
import { WidgetNode } from './WidgetNode';

export interface IViewportProps {
  engine: Engine;
  viewportElement: HTMLElement;
  nodeIdAttrName: string;
  contentWindow: Window;
}

export interface IViewportData {
  scrollX?: number;
  scrollY?: number;
  width?: number;
  height?: number;
  scrollWidth?: number;
  scrollHeight?: number;
}

/**
 * 视口模型
 */
export class Viewport {
  engine: Engine;

  viewportElement: HTMLElement;

  contentWindow: Window;

  dragStartSnapshot: IViewportData;

  scrollX = 0;

  scrollY = 0;

  width = 0;

  height = 0;

  scrollWidth = 0;

  scrollHeight = 0;

  attachRequest: number;

  nodeIdAttrName: string;

  constructor(props: IViewportProps) {
    this.engine = props.engine;
    this.viewportElement = props.viewportElement;
    this.nodeIdAttrName = props.nodeIdAttrName;
    this.contentWindow = props.contentWindow;
    this.makeObservable();
  }

  get isScrollLeft() {
    return this.scrollX === 0;
  }

  get isScrollTop() {
    return this.scrollY === 0;
  }

  get isScrollRight() {
    return this.width + this.scrollX >= this.viewportElement?.scrollWidth;
  }

  get isScrollBottom() {
    return this.height + this.scrollY >= this.viewportElement?.scrollHeight;
  }

  get viewportRoot() {
    return this.viewportElement;
  }

  get scrollContainer() {
    return this.viewportElement;
  }

  get rect() {
    return this.viewportElement ? this.getElementRect(this.viewportElement) : null;
  }

  get innerRect() {
    const rect = this.rect;
    return new DOMRect(0, 0, rect?.width, rect?.height);
  }

  get offsetX() {
    const rect = this.rect;
    if (!rect) return 0;
    return rect.x;
  }

  get offsetY() {
    const rect = this.rect;
    if (!rect) return 0;
    return rect.y;
  }

  get scale() {
    if (!this.viewportElement) return 1;
    return this.engine.screen.scale;
  }

  get grid() {
    return this.engine.screen.props.grid;
  }

  get dragScrollXDelta() {
    return this.scrollX - this.dragStartSnapshot.scrollX;
  }

  get dragScrollYDelta() {
    return this.scrollY - this.dragStartSnapshot.scrollY;
  }

  autoScale = () => {
    if (!this.viewportElement) return;
    const w = (this.viewportElement.clientWidth - 110) / this.engine.screen.props.width;
    const h = (this.viewportElement.clientHeight - 110) / this.engine.screen.props.height;
    const num = Math.min(w, h);
    const scale = Number(num.toFixed(2));
    this.engine.screen.setScale(scale);
  };

  takeDragStartSnapshot() {
    this.dragStartSnapshot = this.getCurrentData();
  }

  digestViewport() {
    Object.assign(this, this.getCurrentData());
  }

  getCurrentData() {
    const data: IViewportData = {};
    data.scrollX = this.viewportElement?.scrollLeft || 0;
    data.scrollY = this.viewportElement?.scrollTop || 0;
    data.width = this.viewportElement?.clientWidth || 0;
    data.height = this.viewportElement?.clientHeight || 0;
    data.scrollWidth = this.viewportElement?.scrollWidth || 0;
    data.scrollHeight = this.viewportElement?.scrollHeight || 0;
    return data;
  }

  elementFromPoint(point: IPoint) {
    return window.document.elementFromPoint(point.x, point.y);
  }

  matchViewport(target: HTMLElement | Element | Window | Document | EventTarget) {
    return target === this.viewportElement;
  }

  attachEvents() {
    const engine = this.engine;
    cancelIdle(this.attachRequest);
    this.attachRequest = requestIdle(() => {
      if (!engine) return;
      this.engine.attachEvents(this.viewportElement, window);
    });
  }

  detachEvents() {
    this.engine.detachEvents(this.viewportElement);
  }

  onMount(element: HTMLElement, contentWindow: Window) {
    this.viewportElement = element;
    this.contentWindow = contentWindow;
    this.attachEvents();
    this.digestViewport();
    this.autoScale();
  }

  onUnmount() {
    this.detachEvents();
  }

  isPointInViewport(point: IPoint, sensitive?: boolean) {
    if (!this.rect) return false;
    if (!this.containsElement(document.elementFromPoint(point.x, point.y))) return false;
    return isPointInRect(point, this.rect, sensitive);
  }

  isPointInViewportArea(point: IPoint, sensitive?: boolean) {
    if (!this.rect) return false;
    return isPointInRect(point, this.rect, sensitive);
  }

  isOffsetPointInViewport(point: IPoint, sensitive?: boolean) {
    if (!this.innerRect) return false;
    if (!this.containsElement(document.elementFromPoint(point.x, point.y))) return false;
    return isPointInRect(point, this.innerRect, sensitive);
  }

  makeObservable() {
    define(this, {
      scrollX: observable.ref,
      scrollY: observable.ref,
      scrollWidth: observable.ref,
      scrollHeight: observable.ref,
      width: observable.ref,
      height: observable.ref,
      viewportElement: observable.ref,
      digestViewport: action,
    });
  }

  findElementById(id: string) {
    return this.viewportElement.querySelector(`*[${this.nodeIdAttrName}='${id}']`);
  }

  containsElement(element: HTMLElement | Element | EventTarget) {
    const root: Element = this.viewportElement;
    if (root === element) return true;
    return root?.contains(element as any);
  }

  getOffsetPoint(topPoint: IPoint) {
    const data = this.getCurrentData();
    return {
      x: topPoint.x - this.offsetX + data.scrollX,
      y: topPoint.y - this.offsetY + data.scrollY,
    };
  }

  getElementRect(element: HTMLElement | Element) {
    const rect = element.getBoundingClientRect();
    const offsetWidth = element['offsetWidth'] ? element['offsetWidth'] : rect.width;
    const offsetHeight = element['offsetHeight'] ? element['offsetHeight'] : rect.height;
    return new DOMRect(rect.x, rect.y, this.scale !== 1 ? offsetWidth : rect.width, this.scale !== 1 ? offsetHeight : rect.height);
  }

  /**
   * 相对于主屏幕
   * @param id
   */
  getElementRectById(id: string) {
    const element = this.findElementById(id);
    const rect = calcBoundingRect([this.getElementRect(element)]);
    if (rect) {
      return new DOMRect(rect.x, rect.y, rect.width, rect.height);
    } else {
      return null;
    }
  }

  /**
   * 相对于视口
   * @param id
   */
  getElementOffsetRectById(id: string) {
    const elements = this.findElementById(id);
    if (!elements) return null;
    const rect = elements.getBoundingClientRect();
    const domrect = new DOMRect(rect.x - this.offsetX + this.scrollX, rect.y - this.offsetY + this.scrollY, rect.width, rect.height);
    const elementRect = calcBoundingRect([domrect]);
    return elementRect;
  }

  getValidNodeRect(node: WidgetNode): DOMRect {
    if (!node) return null;
    const rect = this.getElementRectById(node.id);
    return calcBoundingRect([this.innerRect, rect]);
  }

  getValidNodeOffsetRect(node: WidgetNode): DOMRect {
    if (!node) return null;
    const rect = this.getElementOffsetRectById(node.id);
    return rect;
  }
}
