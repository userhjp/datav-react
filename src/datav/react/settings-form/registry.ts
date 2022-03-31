import loader from '@monaco-editor/loader';

const Registry = {
  cdn: '//cdn.jsdelivr.net/npm',
};

export const setNpmCDNRegistry = (registry: string) => {
  Registry.cdn = registry;
  loader.config({
    paths: {
      vs: `${registry}/monaco-editor@0.33.0/min/vs`,
    },
  });
};

export const getNpmCDNRegistry = () => String(Registry.cdn).replace(/\/$/, '');
