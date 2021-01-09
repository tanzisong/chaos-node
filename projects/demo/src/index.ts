import { App } from 'vue';
// import CoreIndex from '@chaos/core';

function install(app: App) {
  // const Index = new CoreIndex();
  // app.config.globalProperties.$Index = Index;
  // // fixme 不知道为什么需要这么写...
  // Object.defineProperty(app.config.globalProperties, '$Index', {
  //   get: () => Index,
  // });
  // todo 这里可以挂载全局的组件 app.component(name, Component)
}

export { install };
