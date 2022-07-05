import React, { forwardRef, useRef, useState } from 'react';
import { useSize, useDebounceEffect } from 'ahooks';
import './styles.less';
import { formatDate } from '@/utils';

const defaultConfig = {
  rowNum: 5,
  oddRowBGC: '#003B51',
  evenRowBGC: '#0A2732',
  waitTime: 2000,
  columnWidth: [],
  index: false,
  pageRoll: 'single',
  hoverPause: true,
};

function co(gen) {
  let destroyed = false;

  // 处理 return 之后 resume 的问题
  let stop = false;

  let val = null;

  if (typeof gen === 'function') gen = gen();

  if (!gen || typeof gen.next !== 'function') return () => ({});

  Promise.resolve().then(() => {
    destroyed || next(gen.next());
  });

  return {
    end() {
      destroyed = true;
      Promise.resolve().then(() => {
        gen.return();
        gen = null;
      });
    },
    pause() {
      if (!destroyed) {
        stop = true;
      }
    },
    resume() {
      const oldVal = val;
      if (!destroyed && stop) {
        stop = false;
        Promise.resolve(val).then(function () {
          if (!destroyed && !stop && oldVal === val) {
            next(gen.next());
          }
        });
      }
    },
  };

  function next(ret) {
    if (ret.done) return ret.value;
    val = ret.value;
    return Promise.resolve(ret.value).then(() => {
      !destroyed && !stop && next(gen.next());
    });
  }
}

function calcHeaderData({ column, indexHeader, header }) {
  if (!column || !column.length) return [];

  const headerList = header?.show ? column?.map((m) => m?.title || '') : [];
  if (indexHeader?.show && header?.show) headerList.unshift(indexHeader.title || '');
  return headerList;
}

function calcRows({ data, indexHeader, rowNum, column, textStyle }) {
  data = data.map((row) => {
    return column.map((col) => {
      let str = '';
      if (col.type === 'dateTime' && row[col?.mapKey]) {
        str = formatDate(row[col?.mapKey], col.format);
      }
      str = row[col?.mapKey] || '-';
      if (col.formatter) {
        const fun = new Function('value', `const fun = (value) => {  ${col.formatter}   }; return fun(value);`);
        str = fun(str);
      }
      return str;
    });
  });

  if (indexHeader?.show) {
    data = data.map((row, i) => {
      const indexTag = `<span class="index" style="background-color: ${indexHeader.backgroundColor || ''};color: ${
        indexHeader.color
      };padding: 0 3px">${i + 1}</span>`;
      row.unshift(indexTag);
      return row;
    });
  }

  data = data.map((ceils, i) => ({ ceils, rowIndex: i }));
  const rowLength = data.length;
  if (rowLength > rowNum && rowLength < 2 * rowNum) {
    data = [...data, ...data];
  }
  return data.map((d, i) => ({ ...d, scroll: i }));
}

function calcAligns(mergedConfig) {
  const aligns: string[] = (mergedConfig.column || []).map((m) => m.textAlign || 'left');
  if (mergedConfig.indexHeader?.show) {
    aligns.unshift(mergedConfig.indexHeader.textAlign || 'left');
  }
  return aligns;
}

/** 轮播列表 */
const ScrollBoard = forwardRef<any, any>(({ onClick, options = {}, data, onMouseOver }, ref) => {
  const domRef = useRef(null);
  const size = useSize(domRef);

  const [state, setState] = useState({
    mergedConfig: null,
    header: [],
    rows: [],
    widths: [],
    heights: [],
    aligns: [],
  });

  const { mergedConfig, rows, widths, heights, aligns, header } = state;

  const stateRef = useRef({
    ...state,
    rowsData: [],
    avgHeight: 0,
    animationIndex: 0,
  });

  Object.assign(stateRef.current, state);
  const task = useRef({} as any);

  function calcData() {
    const mergedConfig = { ...defaultConfig, ...options, data: data?.list || [] };
    const header = calcHeaderData(mergedConfig);

    const rows = calcRows(mergedConfig);

    const widths = calcWidths(mergedConfig);

    const heights = calcHeights(mergedConfig);

    const aligns = calcAligns(mergedConfig);

    const config = {
      mergedConfig,
      header,
      rows,
      widths,
      aligns,
      heights,
    };

    Object.assign(stateRef.current, config, {
      rowsData: rows,
      animationIndex: 0,
    });

    setState((state) => ({ ...state, ...config }));
  }

  function calcWidths({ column, indexHeader }) {
    if (!size) return [];
    let defaultWidthNum = 0;
    const colnumList = column ? [...column] : [];
    colnumList.forEach((f) => {
      if (f?.columnWidth && typeof f?.columnWidth !== 'number') {
        f.columnWidth = 0;
      }
    });
    if (indexHeader?.show) colnumList.unshift({ columnWidth: indexHeader.columnWidth });
    // 已设置宽度
    const usedWidth = colnumList.reduce((all: number, w: { columnWidth: number }) => {
      if (w?.columnWidth) {
        return all + w.columnWidth || 0;
      } else {
        defaultWidthNum++;
        return all;
      }
    }, 0);
    const defaultWidth = (size?.width - usedWidth) / defaultWidthNum;
    const columnWidth = colnumList.map((m) => {
      return m?.columnWidth || defaultWidth;
    });
    return columnWidth;
  }

  function calcHeights({ header, rowNum, data, column }) {
    let allHeight = size?.height || 0;
    if (column.length) allHeight -= header.height || 0;

    const avgHeight = allHeight / rowNum;

    Object.assign(stateRef.current, { avgHeight });

    return new Array(data.length).fill(avgHeight);
  }

  function* animation(start = false) {
    const {
      avgHeight,
      mergedConfig: { waitTime, pageRoll, rowNum },
      rowsData,
    } = stateRef.current;
    let { animationIndex } = stateRef.current;

    const rowLength = rowsData.length;
    if (start) yield new Promise((resolve) => setTimeout(resolve, waitTime));

    const animationNum = pageRoll ? rowNum : 1;
    let rows = rowsData.slice(animationIndex);
    rows.push(...rowsData.slice(0, animationIndex));
    rows = rows.slice(0, pageRoll ? rowNum * 2 : rowNum + 1);

    const heights = new Array(rowLength).fill(avgHeight);
    setState((state) => ({ ...state, rows, heights }));

    yield new Promise((resolve) => setTimeout(resolve, 300));
    animationIndex += animationNum;

    const back = animationIndex - rowLength;
    if (back >= 0) animationIndex = back;

    const newHeights = [...heights];
    newHeights.splice(0, animationNum, ...new Array(animationNum).fill(0));

    Object.assign(stateRef.current, { animationIndex });
    setState((state) => ({ ...state, heights: newHeights }));
  }

  function emitEvent(handle, ri, ci, row, ceil) {
    const { ceils, rowIndex } = row;

    handle && handle({ row: ceils, ceil, rowIndex, columnIndex: ci });
  }

  function handleHover(enter, ri?, ci?, row?, ceil?) {
    if (enter) emitEvent(onMouseOver, ri, ci, row, ceil);

    if (!mergedConfig.hoverPause) return;

    const { pause, resume } = task.current;

    enter && pause && resume
      ? pause()
      : (function () {
          if (resume) resume();
        })();
  }

  const getBackgroundColor = (rowIndex) => mergedConfig[rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC'];

  useDebounceEffect(
    () => {
      if (!size || !options) return;
      calcData();
      function* loop() {
        while (true) {
          yield* animation(true);
          const { waitTime } = stateRef.current.mergedConfig;
          yield new Promise((resolve) => setTimeout(resolve, waitTime - 300));
        }
      }

      const {
        mergedConfig: { rowNum },
        rows: rowsData,
      } = stateRef.current;

      const rowLength = rowsData.length;

      if (rowNum >= rowLength) return;

      task.current = co(loop);

      return task.current.end;
    },
    [options, data, size],
    {
      wait: 300,
    }
  );
  return (
    <div className="dv-scroll-board" ref={domRef}>
      {!!header.length && !!mergedConfig && (
        <div className="header" style={{ backgroundColor: `${mergedConfig.header.backgroundColor}` }}>
          {header.map((headerItem, i) => (
            <div
              className="header-item"
              key={`${headerItem}-${i}`}
              style={{
                height: `${mergedConfig.header?.height}px`,
                lineHeight: `${mergedConfig.header?.height}px`,
                width: `${widths[i]}px`,
                textAlign: aligns[i],
                ...(mergedConfig.header.textStyle || {}),
              }}
              dangerouslySetInnerHTML={{ __html: headerItem }}
            />
          ))}
        </div>
      )}

      {!!mergedConfig && (
        <div
          className="rows"
          style={{
            height: `${size?.height - (mergedConfig.header?.show ? mergedConfig.header?.height || 0 : 0)}px`,
            ...(mergedConfig.textStyle || {}),
          }}
        >
          {rows.map((row, ri) => (
            <div
              className="row-item"
              key={`${row.toString()}-${row.scroll}`}
              style={{
                height: `${heights[ri]}px`,
                lineHeight: `${heights[ri]}px`,
                backgroundColor: `${getBackgroundColor(row.rowIndex)}`,
              }}
            >
              {row.ceils.map((ceil, ci) => {
                return (
                  <div
                    className="ceil"
                    key={`${ceil}-${ri}-${ci}`}
                    style={{ width: `${widths[ci]}px`, textAlign: aligns[ci] }}
                    dangerouslySetInnerHTML={{ __html: ceil }}
                    onClick={() => emitEvent(onClick, ri, ci, row, ceil)}
                    onMouseEnter={() => handleHover(true, ri, ci, row, ceil)}
                    onMouseLeave={() => handleHover(false)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ScrollBoard;
