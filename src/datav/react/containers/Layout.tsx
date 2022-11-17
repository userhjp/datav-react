import React, { Fragment, useRef, useLayoutEffect } from 'react';
import { DesignerLayoutContext } from '../context';
import { IDesignerLayoutProps } from '../types';
import { useLayout } from '../hooks/useLayout';
import cls from 'classnames';

export const Layout: React.FC<IDesignerLayoutProps & { children: React.ReactNode }> = (props) => {
  const layout = useLayout();
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (ref.current) {
      Object.entries(props.variables || {}).forEach(([key, value]) => {
        ref.current.style.setProperty(`--${key}`, value);
      });
    }
  }, []);
  if (layout) {
    return <Fragment>{props.children}</Fragment>;
  }
  return (
    <div
      ref={ref}
      className={cls({
        [`${props.prefixCls}app`]: true,
        [`${props.prefixCls}${props.theme}`]: props.theme,
      })}
    >
      <DesignerLayoutContext.Provider
        value={{
          theme: props.theme,
          prefixCls: props.prefixCls,
          menu: props.menu,
        }}
      >
        {props.children}
      </DesignerLayoutContext.Provider>
    </div>
  );
};

Layout.defaultProps = {
  theme: 'light',
  prefixCls: 'dv-',
};
