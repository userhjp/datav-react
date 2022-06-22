import { IWidgetData } from '@/datav/react/interface';
import { Path } from '@formily/path';

export function convert2Ddata(data: IWidgetData) {
  const c_obj = Object.create({});
  data.forEach((f) => {
    if (!f['x']) return;
    if (!c_obj[f['x']]) c_obj[f['x']] = { x: f['x'] };
    c_obj[f['x']][f['y'] || 'v'] = f['v'] || 0;
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
  const XlineStyle = Path.getIn(xAxis, 'splitLine.lineStyle');
  if (XlineStyle && XlineStyle.type === 'dashed') {
    XlineStyle.type = [XlineStyle.dashedLength, XlineStyle.dashedSpace];
    delete XlineStyle['dashedLength'];
    delete XlineStyle['dashedSpace'];
  }
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
export function formDataToTooltipData(tooltip: any, axisPointerType: 'cross' | 'shadow' | 'line'): { [key: string]: any } {
  tooltip.padding = [tooltip.horizontalPadding, tooltip.verticalPadding];
  tooltip.borderWidth = 0;
  if (tooltip?.show && tooltip?.axisPointer) {
    tooltip.trigger = tooltip.axisPointer?.show ? 'axis' : 'item';
    if (tooltip.axisPointer?.show) {
      tooltip.axisPointer.type = tooltip.axisPointer?.show ? axisPointerType : 'none';
      tooltip.axisPointer.label = {
        show: false,
      };
      const lineStyle = tooltip.axisPointer.lineStyle;
      if (lineStyle && lineStyle.type === 'dashed') {
        lineStyle.type = [lineStyle.dashedLength, lineStyle.dashedSpace];
        delete lineStyle['dashedLength'];
        delete lineStyle['dashedSpace'];
      }
      tooltip.axisPointer.crossStyle = tooltip.axisPointer.lineStyle;
    }
  }
  return tooltip;
}

/** Echarts Series 数据差异处理 */
export function formDataToSeriesData(options: { [key: string]: any }): any[] {
  const { lineSeriesStyle = {}, barSeriesStyle = {}, series = [], colors } = options;
  options.color = (colors || []).map((m) => convertEChartColors(m));
  // 'series'：按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色；
  // 'data'：按照数据项分配调色盘中的颜色，每个数据项都使用不同的颜色。
  // options.colorBy = 'series';
  options.series = series.map((f) => {
    if (!f) return;
    f.itemStyle = f.itemStyle || {};
    if (f?.itemStyle?.color) {
      f.itemStyle.color = convertEChartColors(f.itemStyle.color, f.itemStyle.gradientDirection);
    }
    f.name = f.itemStyle.name || null;

    switch (f.type) {
      case 'pictorialBar':
        f.symbolRepeat = barSeriesStyle.symbolRepeat;
        f.symbolRotate = barSeriesStyle.symbolRotate;
        f.symbolSize = [barSeriesStyle.symbolSize.width, barSeriesStyle.symbolSize.height];
        f.symbolMargin = barSeriesStyle.symbolMargin;
      case 'bar':
        f.barGap = barSeriesStyle.barGap;
        f.barCategoryGap = barSeriesStyle.barCategoryGap;
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
        break;
      case 'line':
        Object.assign(f, { ...lineSeriesStyle, symbolOffset: [lineSeriesStyle.symbolOffsetX, lineSeriesStyle.symbolOffsetY] });
        f.label = lineSeriesStyle?.label?.show ? lineSeriesStyle.label : { show: false };
        f.areaStyle = lineSeriesStyle?.areaStyle?.show ? { ...lineSeriesStyle?.areaStyle } : null;
        break;
      default:
        break;
    }
    return f;
  });
  return options.series;
}

/** 转换echart颜色渐变 */
export function convertEChartColors(colors: Array<string> | any, type: 'vertical' | 'horizontal' = 'vertical'): string | object {
  if (!colors) return '';
  if (typeof colors === 'string') return colors;
  if (colors.colorStops) return colors; // 这里大概判断下表示已经转换过
  const col = colors.filter((f) => !!f);
  if (col && col.length > 1) {
    const offset = 1 / (col.length - 1);
    return {
      type: 'linear',
      x: 0,
      y: type === 'vertical' ? 1 : 0,
      x2: type === 'horizontal' ? 1 : 0,
      y2: 0,
      colorStops: col.map((m, i) => {
        return { offset: i === col.length ? 1 : offset * i, color: m };
      }),
      global: false, // 缺省为 false
    };
  } else {
    return colors[0] || '';
  }
}
