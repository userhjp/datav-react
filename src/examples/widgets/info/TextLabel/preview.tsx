import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import './styles.less';

const TextLabel: React.FC<IWidgetProps> = (props) => {
  const style = {
    ...props.options,
    ...(props.options?.backgroundStyle || {}),
  };
  const linkUrl = props.options?.link?.href;
  const goPath = () => {
    if (props.options?.link.isblank) {
      window.open(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  return (
    <div style={style} className={`widget-text-label ${linkUrl ? 'cursor_p' : ''}`} onClick={linkUrl ? goPath : null}>
      <span>{props.options?.content || props.data?.title}</span>
    </div>
  );
};

export default TextLabel;
