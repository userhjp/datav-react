import React, { useCallback, useMemo } from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import './styles.less';

const TextLabel: React.FC<IWidgetProps> = ({ options, data, attr }) => {
  const { config, labelConfig, statusList } = options;
  const layoutStyle: React.CSSProperties = useMemo(() => {
    return {
      display: 'block',
      wordWrap: 'break-word',
    } as React.CSSProperties;
  }, [config]);

  const itemStyle: React.CSSProperties = useMemo(() => {
    let height = 'auto';
    let width = 'auto';
    if (!config.autolayout) {
      height = `calc(${100 / config.layout.col}% - ${config.space.colSpace || 0}px)`;
      width = `calc(${100 / config.layout.row}% - ${config.space.rowSpace || 0}px)`;
    }
    const baseStyle: React.CSSProperties = {
      display: 'inline-block',
      padding: `${config?.padding?.vertical || 0}px ${config?.padding?.horizontal || 0}px`,
      borderRadius: labelConfig.filletRadius,
      backgroundColor: labelConfig.backgroundColor,
      marginRight: config.space.rowSpace,
      marginBottom: config.space.colSpace,
      verticalAlign: 'middle',
      textAlign: 'center',
      height,
      width,
      ...labelConfig.textStyle,
    };
    return {
      ...baseStyle,
    };
  }, [labelConfig, config]);

  const getItemStyle = useCallback(
    ({ type }): React.CSSProperties => {
      const style = (statusList || []).find((f) => f.labelName === type);
      if (!style) return {};
      return style;
    },
    [statusList]
  );

  return (
    <div style={layoutStyle} className="widget-text-label">
      {(data || []).map((m, i) => {
        return (
          <div style={{ ...itemStyle, ...getItemStyle(m) }} key={i}>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                lineHeight: 1,
              }}
            >
              {m.content}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TextLabel;
