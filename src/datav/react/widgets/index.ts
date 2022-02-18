import React from 'react';
import { WidgetConfig } from '@/datav/react/interface';

/** 自动引入所有组件 */
const WIDGETS: { [key: string]: any } = {};
const modulesFiles = require.context('./', true, /\.tsx$/, 'lazy');
modulesFiles.keys().forEach((fileName) => {
  const name = fileName.split('/');
  if (fileName.match('components')) return;
  const compName = name[name.length - 2];
  WIDGETS[compName] = React.lazy(() => modulesFiles(fileName));
});

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

export { WIDGETS, COMPONENT_CONFIG };
