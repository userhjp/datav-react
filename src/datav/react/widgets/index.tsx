import { observer } from '@formily/react';
import { toJS } from '@formily/reactive';
import React, { Suspense } from 'react';
import { WidgetLoading } from '../components';
import { useReqData } from '@/datav/react/hooks';
import { ComType, WidgetConfig } from '@/datav/interface';
import { cancelIdle, requestIdle } from '@/datav/shared';
import './index.less';

const GlobalState = {
  idleRequest: null,
};

/** 自动引入所有组件 */
const widgets: { [key: string]: any } = {};
const modulesFiles = require.context('./', true, /\.tsx$/, 'lazy');
modulesFiles.keys().forEach((fileName) => {
  const name = fileName.split('/');
  if (fileName === './index.tsx' || fileName.match('components')) return;
  const compName = name[name.length - 2];
  widgets[compName] = React.lazy(async () => {
    // await waitTime(1000); // 模拟懒加载延时
    return modulesFiles(fileName);
  });
});

const Widget: React.FC<{ comp: ComType }> = observer(
  ({ comp }) => {
    if (!comp.info || !comp.info.type) return <div />;
    const Component = widgets[comp.info.type];
    if (!Component) return <div />;
    const data = useReqData(comp.id, comp.data);
    const options = toJS(comp.options);

    if (!options) return <WidgetLoading />;
    return (
      <Suspense fallback={<WidgetLoading />}>
        <Component options={options} data={data} />
      </Suspense>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  }
);

/**
 * 自动引入组件Config文件，约定跟组件同目录下的config.ts 并且以默认导出方式导出配置文件
 * 文件名统一规范`config.ts`
 */
const COMPONENT_CONFIG: { [key: string]: WidgetConfig } = {};
const configFiles = require.context('./', true, /config\.ts$/);
configFiles.keys().forEach((fileName) => {
  const config = configFiles(fileName);
  const spPath = fileName.replace(/^\.\/(.*)\.\w+$/, '$1').split('/');
  const name = spPath[spPath.length - 2];
  const compJSON = config[name] || config.default;
  if (compJSON) {
    const schemaName = `${name}`.toLowerCase();
    COMPONENT_CONFIG[schemaName] = compJSON;
  }
});

const getComConfig = (type: string) => {
  return COMPONENT_CONFIG[(type || '').toLowerCase()];
};

export { Widget, getComConfig };
