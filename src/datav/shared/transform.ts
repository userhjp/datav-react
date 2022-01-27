/**
 * 方位
 */
export type Direction = 'lt' | 't' | 'rt' | 'r' | 'rb' | 'b' | 'lb' | 'l';

/**
 * 双向指示
 */
export type BidirectionalCursor = 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize';

export type ResizeMode = 'normal' | 'stretch';

// 八个方位点对应的初始角度
const initialDirectionAngle: {
  direction: Direction;
  angle: number;
}[] = [
  { direction: 'lt', angle: 0 },
  { direction: 't', angle: 45 },
  { direction: 'rt', angle: 90 },
  { direction: 'r', angle: 135 },
  { direction: 'rb', angle: 180 },
  { direction: 'b', angle: 225 },
  { direction: 'lb', angle: 270 },
  { direction: 'l', angle: 315 },
];

// 每个范围的角度对应的光标
const angleToCursor: {
  start: number;
  end: number;
  cursor: BidirectionalCursor;
}[] = [
  { start: 338, end: 23, cursor: 'nwse-resize' },
  { start: 23, end: 68, cursor: 'ns-resize' },
  { start: 68, end: 113, cursor: 'nesw-resize' },
  { start: 113, end: 158, cursor: 'ew-resize' },
  { start: 158, end: 203, cursor: 'nwse-resize' },
  { start: 203, end: 248, cursor: 'ns-resize' },
  { start: 248, end: 293, cursor: 'nesw-resize' },
  { start: 293, end: 338, cursor: 'ew-resize' },
];

export const getCursors = (startAngle = 0) => {
  const rotate = (startAngle + 360) % 360; // 防止角度有负数，所以 + 360
  const result: Record<string, BidirectionalCursor> = {};
  let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
  initialDirectionAngle.forEach((point) => {
    const angle = (point.angle + rotate) % 360;
    const len = angleToCursor.length;
    const i = 0;
    while (i < len) {
      lastMatchIndex = (lastMatchIndex + 1) % len;
      const angleLimit = angleToCursor[lastMatchIndex];
      if (angle < 23 || angle >= 338) {
        result[point.direction] = 'nwse-resize';
        break;
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point.direction] = angleLimit.cursor;
        break;
      }
    }
  });

  return result as Record<Direction, BidirectionalCursor>;
};
