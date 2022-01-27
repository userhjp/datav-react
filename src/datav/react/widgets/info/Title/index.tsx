import React from 'react';
import { ComType } from '@/datav/interface';
import './index.less';

const Title: React.FC<ComType> = (props) => {
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
    <div style={style} className={`widget-title-comp ${linkUrl ? 'cursor_p' : ''}`} onClick={linkUrl ? goPath : null}>
      <span>{props.data?.title}</span>
    </div>
  );
};

export default Title;
