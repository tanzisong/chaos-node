import { PluginOption } from 'vite';

function stringXml(): PluginOption {
  return {
    name: 'vite-plugin-xml-string',
    transform(code, path) {
      if (/\.(xml)$/.test(path)) {
        return {
          code: `export default ${JSON.stringify(code)}`,
          map: null,
        };
      }
    },
  };
}

export { stringXml };
