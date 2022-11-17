import React from 'react';
import { IWidgetProps } from '@/datav/react/interface';
import './styles.less';

const Title: React.FC<IWidgetProps> = ({ options, data }) => {
  const { backgroundStyle, link, ...opt } = options;
  const { show, ...bgStyle } = backgroundStyle;
  const style = {
    ...opt,
    ...(show ? bgStyle : {}),
  };
  const linkUrl = link?.href;
  const goPath = () => {
    if (options?.link.isblank) {
      window.open(linkUrl);
    } else {
      window.location.href = linkUrl;
    }
  };

  return (
    <div style={style} className={`widget-title-comp ${linkUrl ? 'cursor_p' : ''}`} onClick={linkUrl ? goPath : null}>
      <span>{options?.content || data?.title}</span>
    </div>
  );
};

export default Title;
