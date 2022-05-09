import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import { useDatavEvent } from '@/datav/react/hooks';
import styles from './styles.less';

const Button: React.FC<IWidgetProps> = ({ options, events, data }) => {
  const { style, borderStyle, link } = options;
  const updateVariables = useDatavEvent(events.changed, null, false);

  const comStyle = {
    ...style,
    ...borderStyle,
  };

  const onClick = () => {
    updateVariables(data);
    const linkUrl = link?.href;
    if (!linkUrl) return;
    if (link.isblank) {
      window.open(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  return (
    <div
      className={styles.widgetsButton}
      style={comStyle}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <span>{options.text}</span>
    </div>
  );
};

export default Button;
