import { Path } from '@formily/path';
import { graphic } from 'echarts/core';
import { colorsOpt } from '../react/schema/echarts/colorsSchema';

export function convert2Ddata(data: Array<{ [key: string]: any }>) {
  const c_obj = Object.create({});
  data.forEach((f) => {
    if (!f['x']) return;
    if (!c_obj[f['x']]) c_obj[f['x']] = { x: f['x'] };
    c_obj[f['x']][f['y']] = f['v'] || 0;
  });
  const source = Object.values(c_obj);
  const dimensions = Object.keys(source[0] || {});
  return {
    dimensions,
    source,
  };
}

/** form表单数据与echart xAxis数据差异处理 */
export function formJsonToxAxisData(xAxis: any = {}) {
  if (!xAxis.show) {
    xAxis.type = 'category';
  }
  const XlineStyle = Path.getIn(xAxis, 'splitLine.lineStyle');
  if (XlineStyle && XlineStyle.type === 'dashed') {
    XlineStyle.type = [XlineStyle.dashedLength, XlineStyle.dashedSpace];
    delete XlineStyle['dashedLength'];
    delete XlineStyle['dashedSpace'];
  }

  const Xname = Path.getIn(xAxis, 'nameTextStyle.name');
  if (Xname) Path.setIn(xAxis, 'name', Xname || '');

  const XnameLocation = Path.getIn(xAxis, 'nameTextStyle.nameLocation');
  Path.setIn(xAxis, 'nameLocation', XnameLocation);
  return xAxis;
}

/** form表单数据与echart yAxis数据差异处理 */
export function formJsonToyAxisData(yAxis: any = {}) {
  const YlineStyle = Path.getIn(yAxis, 'splitLine.lineStyle');
  if (YlineStyle && YlineStyle.type === 'dashed') {
    YlineStyle.type = [YlineStyle.dashedLength, YlineStyle.dashedSpace];
    delete YlineStyle['dashedLength'];
    delete YlineStyle['dashedSpace'];
  }

  const yname = Path.getIn(yAxis, 'nameTextStyle.name');
  if (yname) Path.setIn(yAxis, 'name', yname || '');

  const ynameLocation = Path.getIn(yAxis, 'nameTextStyle.nameLocation');
  Path.setIn(yAxis, 'nameLocation', ynameLocation);
  if (yAxis.max === 'auto') yAxis.max = null;
  if (yAxis.min === 'auto') yAxis.min = null;
  return yAxis;
}

/** form表单数据与echart legend数据差异处理 */
export function formJsonToLegendData(legend: any = {}) {
  if (legend?.show && legend.position) {
    const [legendTop, legendLeft] = legend.position.split('-');
    legend.top = legendTop;
    legend.left = legendLeft;
  }
  return legend;
}

/** Echarts tooltip 数据差异处理 */
export function formDataToTooltipData(tooltip: any, axisPointerType: 'cross' | 'shadow' | 'line') {
  if (tooltip?.show && tooltip?.axisPointer) {
    tooltip.padding = [tooltip.horizontalPadding, tooltip.verticalPadding];
    tooltip.trigger = tooltip.axisPointer?.show ? 'axis' : 'item';
    tooltip.axisPointer.type = tooltip.axisPointer?.show ? axisPointerType : 'none';
    tooltip.axisPointer.label = {
      show: false,
    };
    if (tooltip.axisPointer?.show) {
      const lineStyle = tooltip.axisPointer.lineStyle;
      if (lineStyle && lineStyle.type === 'dashed') {
        lineStyle.type = [lineStyle.dashedLength, lineStyle.dashedSpace];
        delete lineStyle['dashedLength'];
        delete lineStyle['dashedSpace'];
      }
      tooltip.axisPointer.crossStyle = tooltip.axisPointer.lineStyle;
    }
    tooltip.borderWidth = 0;
  }
  return tooltip;
}

/** Echarts Series 数据差异处理 */
export function formDataToSeriesData(options: { [key: string]: any }) {
  const { lineSeriesStyle = {}, barSeriesStyle = {}, series = [], areaStyle = {} } = options;

  const colors = colorsOpt.find((f) => f.value === options.grid.colors);
  options.color = colors?.color;

  options.series = series.map((f) => {
    if (!f) return;
    f.itemStyle = f.itemStyle || {};
    if (f?.itemStyle?.startColor && f?.itemStyle?.toColor) {
      f.itemStyle.color = new graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: f.itemStyle.startColor },
        { offset: 1, color: f.itemStyle.toColor },
      ]);
    }

    switch (f.type) {
      case 'bar':
        f.showBackground = !!barSeriesStyle?.backgroundStyle?.show; // 背景
        f.backgroundStyle = barSeriesStyle?.backgroundStyle;
        f.label = barSeriesStyle?.label?.show ? barSeriesStyle.label : { show: false };
        f.barWidth = barSeriesStyle.barWidth || 'auto';
        if (f.itemStyle) {
          f.itemStyle.borderRadius = [
            barSeriesStyle.borderRadius?.leftTop || 0,
            barSeriesStyle.borderRadius?.rightTop || 0,
            barSeriesStyle.borderRadius?.rightbottom || 0,
            barSeriesStyle.borderRadius?.leftbottom || 0,
          ];
        }
        // f.barGap = `${barSeriesStyle.barGap || 30}%`;
        f.barCategoryGap = `${barSeriesStyle.barCategoryGap || 20}%`;
        break;
      case 'line':
        f.label = lineSeriesStyle?.label?.show ? lineSeriesStyle.label : { show: false };
        f.areaStyle = areaStyle.show ? { ...areaStyle } : null;
        Object.assign(f, { ...lineSeriesStyle, symbolOffset: [lineSeriesStyle.symbolOffsetX, lineSeriesStyle.symbolOffsetY] });
        break;
      default:
        break;
    }
    return f;
  });
  return options.series;
}
