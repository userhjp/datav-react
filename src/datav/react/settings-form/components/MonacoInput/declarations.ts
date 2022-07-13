import { MonacoInput } from './index';
import { getNpmCDNRegistry } from '../../registry';

export interface IDependency {
  name: string;
  path: string;
}

const loadDependencies = async (deps: IDependency[]) => {
  return Promise.all(
    deps.map(async ({ name, path }) => ({
      name,
      path,
      library: await fetch(`${getNpmCDNRegistry()}/${name}/${path}`).then((res) => res.text()),
    }))
  );
};

export const initDeclaration = async () => {
  return MonacoInput.loader.init().then(async (monaco) => {
    const deps = await loadDependencies([{ name: 'echarts', path: 'types/dist/echarts.d.ts' }]);
    deps?.forEach(({ name, library }) => {
      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        `declare module extend.${name} { ${library} }`,
        `file:///node_modules/${name}/index.d.ts`
      );
    });
    monaco.languages.typescript.javascriptDefaults.addExtraLib(
      `
      declare var extend: {
        chart: any;
        echarts: echarts;
        DataSet: any;
        formatDate: (dateTime: Date | number, fmt: string) => string;
        updateVariables: any;
        formatNumber: any;
      };
    `,
      `file:///node_modules/charts_global.d.ts`
    );
  });
};
